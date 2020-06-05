using System;
using Newtonsoft.Json;

namespace BettingParser.Models
{
    [Serializable]
    public class EventData
    {
        [JsonProperty("championship_data")]
        public ChampionshipData ChampionshipData { get; set; }
        
        [JsonProperty("event_start")]
        public string EventStart { get; set; }
        
        [JsonProperty("event")]
        public string Event { get; set; } 
        
        [JsonProperty("score")]
        public string Score { get; set; }
    }
}