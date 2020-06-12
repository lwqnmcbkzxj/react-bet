using System.Collections.Generic;
using System.Threading.Tasks;
using BettingParser.Models;

namespace BettingParser.Abstractions
{
    public interface IParseService
    {
        Task<Forecast> GetForecastScores(string url);
        
        Task<UserForecast> GetLastForecasts(long userId);

        Task<IEnumerable<UserStat>> GetStat();
    }
}