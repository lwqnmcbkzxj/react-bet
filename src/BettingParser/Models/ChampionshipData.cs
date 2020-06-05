using System;
using Newtonsoft.Json;

namespace BettingParser.Models
{
    [Serializable]
    public class ChampionshipData
    {
        [JsonProperty("championship")]
        public string Championship { get; set; }
        
        [JsonProperty("sport_name")]
        public string SportName { get; set; }
    }
}