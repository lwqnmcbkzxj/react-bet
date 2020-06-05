using System;

namespace BettingParser.Configurations
{
    public class NetClientOptions
    {
        private readonly Random _random = new Random();
        
        public string UserAgent { get; set; }
        
        public string[] Cookies { get; set; }

        public string GetRandomCookie()
        {
            return Cookies[_random.Next(0, Cookies.Length)];
        } 
    }
}