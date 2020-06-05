using System;
using Newtonsoft.Json;

namespace BettingParser.Models
{
    [Serializable]
    public class Forecast
    {
        [JsonProperty("parser_forecast_id")]
        public string ParserForecastId { get; set; }
        
        [JsonProperty("event_data")]
        public EventData EventData { get; set; }
        
        [JsonProperty("forecast_text")]
        public string ForecastText { get; set; }
        
        [JsonProperty("bet_data")]
        public BetData BetData { get; set; }

        [JsonProperty("bookmaker_name")]
        public string BookmakerName { get; set; }
    }
}