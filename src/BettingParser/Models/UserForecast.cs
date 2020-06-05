using System;
using System.Collections.Generic;

namespace BettingParser.Models
{
    [Serializable]
    public class UserForecast
    {
        public long UserId { get; set; }
        
        public IEnumerable<Forecast> Forecasts { get; set; }
    }
}