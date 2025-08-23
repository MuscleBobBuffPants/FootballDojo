using FootballDojo.Global;

namespace FootballDojo.Client
{
    public class FootballDojoClient
    {
        public HttpClient HttpClient { get; }

        public FootballDojoClient(IHttpClientFactory httpClientFactory)
        {
            HttpClient = httpClientFactory.CreateClient();

            HttpClient.DefaultRequestHeaders.Add("x-rapidapi-key", KeyConstants.API_KEY);
            HttpClient.DefaultRequestHeaders.Add("x-rapidapi-host", KeyConstants.API_HOST);
        }
    }
}