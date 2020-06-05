using System.Net.Http;

namespace BettingParser.Abstractions
{
    public interface INetClientFactory
    {
        HttpClient Create();
    }
}