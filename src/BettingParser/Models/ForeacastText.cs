using System;
using Newtonsoft.Json;

namespace BettingParser.Models
{
    [Serializable]
    public class ForeacastText
    {
        [JsonProperty("data")]
        public string Data { get; set; }
        
        [JsonProperty("status")]
        public string Status { get; set; }
    }
}