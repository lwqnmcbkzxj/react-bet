using System;
using System.Collections.Generic;
using HtmlAgilityPack;

namespace BettingParser.Models
{
    [Serializable]
    public class UserForecast
    {
        public long UserId { get; set; }
        
        public IEnumerable<Forecast> Forecasts { get; set; }
        
        public double Balance { get; set; }
    }
}