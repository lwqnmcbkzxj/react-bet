using System;
using Newtonsoft.Json;

namespace BettingParser.Models
{
    [Serializable]
    public class BetData
    {
        [JsonProperty("coefficient")]
        public double Coefficient { get; set; }
        
        [JsonProperty("bet")]
        public double? Bet { get; set; }
        
        [JsonProperty("status")]
        public Status? Status { get; set; }
        
        [JsonProperty("type")]
        public string Type { get; set; }
    }
}