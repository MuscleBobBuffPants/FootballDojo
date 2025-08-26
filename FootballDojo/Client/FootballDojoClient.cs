using FootballDojo.Global;

namespace FootballDojo.Client
{
    public class FootballDojoClient
    {
        public HttpClient HttpClient { get; }

        public FootballDojoClient(IHttpClientFactory httpClientFactory)
        {
            HttpClient = httpClientFactory.CreateClient();

            HttpClient.DefaultRequestHeaders.Add("x-rapidapi-host", Environment.GetEnvironmentVariable("FOOTBALL_API_HOST"));
            HttpClient.DefaultRequestHeaders.Add("x-rapidapi-key", Environment.GetEnvironmentVariable("FOOTBALL_API_KEY"));
        }
    }
}