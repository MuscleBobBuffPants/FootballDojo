using FootballDojo.Global;

namespace FootballDojo.Client
{
    public class FootballDojoClient
    {
        public HttpClient HttpClient { get; }

        public FootballDojoClient(IHttpClientFactory httpClientFactory, string apiHost, string apiKey)
        {
            HttpClient = httpClientFactory.CreateClient();

            HttpClient.DefaultRequestHeaders.Add("x-rapidapi-host", apiHost);
            HttpClient.DefaultRequestHeaders.Add("x-rapidapi-key", apiKey);
        }
    }
}