using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using BettingParser.Abstractions;
using BettingParser.Exceptions;
using BettingParser.Extensions;
using BettingParser.Helpers;
using BettingParser.Models;
using HtmlAgilityPack;
using Newtonsoft.Json;

namespace BettingParser.Services
{
    public class ParseService : IParseService
    {
        private readonly INetClientFactory _clientFactory;

        public ParseService(INetClientFactory clientFactory)
        {
            _clientFactory = clientFactory ?? throw new ArgumentNullException(nameof(clientFactory));
        }

        public async Task<Forecast> GetForecastScores(string url)
        {
            var source = await GetForecastScore(url);

            var doc = GetHtmlDocument(source);
            var title = doc?.DocumentNode?.SelectSingleNode(@"//*[@id=""dle-content""]/div[1]/div/div");

            var @event = title?.ChildNodes[1]?.InnerText?.Trim();
            if (string.IsNullOrWhiteSpace(@event))
                throw new ParserException(nameof(@event));

            var championships = title?.ChildNodes[3]?.ChildNodes[1]?.InnerText?.Trim();
            if (string.IsNullOrWhiteSpace(championships))
                throw new ParserException(nameof(championships));

            var bookmakerName = doc?.DocumentNode
                ?.SelectSingleNode(@"//*[@id=""dle-content""]/div[1]/div/div/ul/li[1]/a/img")
                .GetAttributeValue("title", null);
            if (string.IsNullOrWhiteSpace(bookmakerName))
                throw new ParserException(nameof(bookmakerName));
            
            var scores = title?.ChildNodes[11]?.ChildNodes[1]?.ChildNodes[3]?.ChildNodes[1];
            if (scores == null)
                throw new ParserException(nameof(scores));
            
            var scoreLeft = scores?.ChildNodes[1]?.InnerText?.Trim();
            if (string.IsNullOrWhiteSpace(scoreLeft))
                throw new ParserException(nameof(scoreLeft));
            
            var scoreRight = scores?.ChildNodes[3]?.InnerText?.Trim();
            if (string.IsNullOrWhiteSpace(scoreRight))
                throw new ParserException(nameof(scoreRight));
            
            var xpath1 = @"//*[@id=""dle-content""]/div[1]/div/div/div[3]/div[2]/div[1]/div";
            var predict = doc.DocumentNode.SelectSingleNode(xpath1);
            if (predict == null)
                throw new ParserException(nameof(predict));
            
            var type = predict?.ChildNodes[1]?.ChildNodes[1]?.ChildNodes[3]?.InnerText?.Trim();
            if (string.IsNullOrWhiteSpace(type))
                throw new ParserException(nameof(type));
            
            var coefficient = predict?.ChildNodes[1]?.ChildNodes[3]?.ChildNodes[3]?.InnerText?.Trim() ?? "";
            if (string.IsNullOrWhiteSpace(coefficient))
                throw new ParserException(nameof(coefficient));
            
            var bet = predict?.ChildNodes[1]?.ChildNodes[5]?.ChildNodes[3]?.InnerText?.Trim() ?? "";
            if (string.IsNullOrWhiteSpace(bet))
                throw new ParserException(nameof(bet));
            
            var eventStart = predict?.ChildNodes[5]?.ChildNodes[1]?.ChildNodes[1]?.InnerText?.Trim();
            if (string.IsNullOrWhiteSpace(eventStart))
                throw new ParserException(nameof(eventStart));
            
            var forecastText = predict?.ChildNodes[10]?.InnerText?.Trim();
            if (string.IsNullOrWhiteSpace(forecastText))
                throw new ParserException(nameof(forecastText));
            
            var income = predict?.ChildNodes[3]?.ChildNodes[5]?.ChildNodes[5]?.InnerText?.Trim();
            if (string.IsNullOrWhiteSpace(income))
                throw new ParserException(nameof(income));
            
            var (championship, sportName) = GetChampionshipData(championships);
            var eventStartFormatted = GetEventData(eventStart);
            var status = GetIncomeStatus(income);

            return new Forecast
            {
                ParserForecastId = url,
                EventData = new EventData
                {
                    ChampionshipData = new ChampionshipData
                    {
                        Championship = championship,
                        SportName = sportName
                    },
                    EventStart = eventStartFormatted,
                    Event = @event,
                    Score = GetScore(scoreLeft, scoreRight)
                },
                ForecastText = forecastText,
                BetData = new BetData
                {
                    Bet = int.Parse(bet),
                    Coefficient = double.Parse(coefficient),
                    Status = status,
                    Type = type
                },
                BookmakerName = bookmakerName,
            };
        }

        private static Status? GetIncomeStatus(string innerText)
        {
            if (innerText.Contains("+")) return Status.Win;
            if (innerText.Contains("-")) return Status.Lose;

            return null;
        }

        private string GetEventData(string data)
        {
            return data[1..^1];
        }

        private string GetScore(string left, string right)
        {
            return $"{left} - {right}";
        }

        public async Task<string> GetForecastScore(string url)
        {
            try
            {
                var response = await Retry.Do(async () =>
                {
                    var client = _clientFactory.Create();
                    var get = new HttpRequestMessage(HttpMethod.Get, url);
                    var response = await client.SendAsync(get);

                    if (response.Headers.ConnectionClose.HasValue && response.Headers.ConnectionClose.Value)
                        throw new Exception("cookie expired");

                    return response;
                }, TimeSpan.FromSeconds(10));

                var stream = await response.Content.ReadAsStreamAsync();
                Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);
                using var reader = new StreamReader(stream, Encoding.GetEncoding("windows-1251"));
                return await reader.ReadToEndAsync();
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public async Task<UserForecast> GetLastForecasts(long userId)
        {
            var source = await GetUserAsync(userId);

            var doc = GetHtmlDocument(source);
            var trs = doc.DocumentNode.SelectNodes(@"//*[@id=""usertable""]/tbody/tr");
            var balance = doc?.DocumentNode
                ?.SelectSingleNode(
                    @"/html/body/div[1]/div[1]/section/div/article/div/div[2]/div[2]/div[1]/div/div[1]/dl[1]/dd/span")
                ?.InnerText?.Trim();
            if (string.IsNullOrWhiteSpace(balance))
                throw new ParserException(nameof(balance));

            var trs = doc?.DocumentNode?.SelectNodes(@"//*[@id=""usertable""]/tbody/tr");

            return new UserForecast
            {
                UserId = userId,
                Balance = getBalance(balance),
                Forecasts = await GetLastForecast(trs)
            };
        }

        private double getBalance(string data)
        {
            return double.Parse(data.SplitWithTrimming(' ').First());
        }

        private async Task<IEnumerable<Forecast>> GetLastForecast(HtmlNodeCollection trs)
        {
            if (trs == null) return new List<Forecast>();

            var result = new List<Forecast>();
            for (var i = 0; i < trs.Count; i += 2)
            {
                try
                {
                    // БК
                    var bookmakerName = trs[i]?.ChildNodes[1]?.ChildNodes[1]?.GetAttributeValue("title", null);
                    if (string.IsNullOrWhiteSpace(bookmakerName))
                        throw new ParserException(nameof(bookmakerName));

                    // Дата
                    var eventStart = trs[i]?.ChildNodes[3]?.InnerText?.Trim();
                    if (string.IsNullOrWhiteSpace(eventStart))
                        throw new ParserException(nameof(eventStart));

                    // матч (название)
                    var @event = trs[i]?.ChildNodes[5]?.ChildNodes[1]?.InnerText?.Trim();
                    if (string.IsNullOrWhiteSpace(@event))
                        throw new ParserException(nameof(@event));

                    // Пропускаем Экспресс
                    if (@event == "Экспресс")
                    {
                        continue;
                    }

                    // под матчем
                    var championships = trs[i]?.ChildNodes[5]?.ChildNodes[3]?.InnerText?.Trim();
                    if (string.IsNullOrWhiteSpace(championships))
                        throw new ParserException(nameof(championships));

                    // ид описания
                    var forecastTextId = trs[i]?.ChildNodes[5]?.Attributes[1]?.Value?.Trim();
                    if (string.IsNullOrWhiteSpace(forecastTextId))
                        throw new ParserException(nameof(forecastTextId));

                    // ссылка на матч
                    var parserForecastUrl = trs[i]?.SelectSingleNode(@"//*[@id=""usertable""]/tbody/tr[1]/td[3]/span/a")
                        ?.Attributes[1]
                        ?.Value
                        ?.Trim();
                    if (string.IsNullOrWhiteSpace(parserForecastUrl))
                        throw new ParserException(nameof(parserForecastUrl));

                    // прогноз
                    var forecast = trs[i]?.ChildNodes[7]?.InnerText?.Trim();
                    if (string.IsNullOrWhiteSpace(forecast))
                        throw new ParserException(nameof(forecast));

                    // доход
                    var income = trs[i].ChildNodes[9];
                    if (income == null)
                        throw new ParserException(nameof(income));

                    var eventStartFormatted = GetEventStart(eventStart);
                    var forecastTextFormatted = await GetForecastTextAsync(long.Parse(forecastTextId));
                    var (championship, sportName) = GetChampionshipData(championships);
                    var (coefficient, type) = GetForecast(forecast);
                    var inner = income.InnerText.Trim();
                    var attributes = income.Attributes[0].Value.Trim();
                    var status = GetIncomeStatus(inner, attributes);

                    result.Add(new Forecast
                    {
                        ParserForecastId = parserForecastUrl,
                        EventData = new EventData
                        {
                            ChampionshipData = new ChampionshipData
                            {
                                Championship = championship,
                                SportName = sportName
                            },
                            EventStart = eventStartFormatted,
                            Event = @event,
                        },
                        ForecastText = forecastTextFormatted,
                        BetData = new BetData
                        {
                            Coefficient = double.Parse(coefficient),
                            Status = status,
                            Type = type
                        },
                        BookmakerName = bookmakerName,
                    });
                }
                catch (Exception e)
                {
                    throw;
                }
            }

            return result;
        }

        public async Task<string> GetUserAsync(long userId)
        {
            try
            {
                var response = await Retry.Do(async () =>
                {
                    var client = _clientFactory.Create();
                    var get = new HttpRequestMessage(HttpMethod.Get, $"/engine/gouser.php?userid={userId}");
                    var response = await client.SendAsync(get);

                    if (response.Headers.ConnectionClose.HasValue && response.Headers.ConnectionClose.Value)
                        throw new Exception("cookie expired");

                    return response;
                }, TimeSpan.FromSeconds(10));

                var stream = await response.Content.ReadAsStreamAsync();
                Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);
                using var reader = new StreamReader(stream, Encoding.GetEncoding("windows-1251"));
                return await reader.ReadToEndAsync();
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public async Task<string> GetForecastTextAsync(long forecastTextId)
        {
            try
            {
                var response = await Retry.Do(async () =>
                {
                    var client = _clientFactory.Create();

                    var url = $"engine/modules/profile_lasttips.php?action=get_description&ajax=1&id={forecastTextId}";
                    var get = new HttpRequestMessage(HttpMethod.Get, url);

                    var response = await client.SendAsync(get);
                    if (response.StatusCode == HttpStatusCode.BadRequest)
                    {
                        return null;
                    }

                    if (response.Headers.ConnectionClose.HasValue && response.Headers.ConnectionClose.Value)
                        throw new Exception("cookie expired");

                    return response;
                }, TimeSpan.FromSeconds(10));

                var content = await response.Content.ReadAsStringAsync();
                var forecast = JsonConvert.DeserializeObject<ForeacastText>(content);

                return Regex.Unescape(forecast.Data);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        private static Status? GetIncomeStatus(string innerText, string attributes)
        {
            if (attributes.Contains("resminuscell")) return Status.Lose;
            if (attributes.Contains("respluscell")) return Status.Win;
            if (attributes.Contains("resnullcell"))
            {
                if (innerText.Contains("-")) return Status.Wait;
                if (innerText.Contains("0")) return Status.Back;
            }

            return null;
        }

        private static (string, string) GetForecast(string data)
        {
            var datas = data.SplitWithTrimming('@');
            var type = datas[0];

            var coefficient = datas[1];
            return (coefficient, type);
        }

        private static (string, string) GetChampionshipData(string data)
        {
            var datas = data.SplitWithTrimming('.');
            var sportName = datas[0];

            var championship = string.Join(". ", datas[1..]);
            return (championship, sportName);
        }

        private static string GetEventStart(string eventStart)
        {
            var year = DateTime.UtcNow.AddDays(3).Year;

            var date = eventStart.SplitWithTrimming('\n');
            var ddate = date[0].Split('-');
            return $"{year}-{ddate[1]}-{ddate[0]} {date[1]}";
        }

        private HtmlDocument GetHtmlDocument(string html)
        {
            var doc = new HtmlDocument();
            doc.LoadHtml(html);
            return doc;
        }
    }
}