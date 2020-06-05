using System;
using System.Net.Http;
using BettingParser.Abstractions;
using BettingParser.Configurations;

namespace BettingParser.Factories
{
    public class NetClientFactory : INetClientFactory
    {
        private readonly HttpClient _httpClient;
        private readonly NetClientOptions _netOptions;

        public NetClientFactory(HttpClient httpClient, NetClientOptions netOptions)
        {
            _httpClient = httpClient ?? throw new ArgumentNullException(nameof(httpClient));
            _netOptions = netOptions ?? throw new ArgumentNullException(nameof(netOptions));
        }

        public HttpClient Create()
        {
            _httpClient.DefaultRequestHeaders.Clear();
            _httpClient.DefaultRequestHeaders.Add("user-agent",  _netOptions.UserAgent);
            _httpClient.DefaultRequestHeaders.Add("cookie", _netOptions.GetRandomCookie());
            return _httpClient;
        }
    }
}