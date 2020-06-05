using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BettingParser.Abstractions;
using BettingParser.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BettingParser.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class ParserController : ControllerBase
    {
        private readonly IParseService _parseService;

        public ParserController(IParseService parseService)
        {
            _parseService = parseService ?? throw new ArgumentNullException(nameof(parseService));
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public Task<UserForecast[]> GetLastForecast([FromQuery(Name = "userid")] long[] userIds)
        {
            var tasks = new Task<UserForecast>[userIds.Length];
            for (var i = 0; i < userIds.Length; i++)
            {
                tasks[i] = _parseService.GetLastForecasts(userIds[i]);
            }

            return Task.WhenAll(tasks);
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public Task<Forecast[]> GetForecast([FromQuery(Name = "url")] string[] urls)
        {
            var tasks = new Task<Forecast>[urls.Length];
            for (var i = 0; i < urls.Length; i++)
            {
                tasks[i] = _parseService.GetForecastScores(urls[i]);
            }

            return Task.WhenAll(tasks);
        }
    }
}