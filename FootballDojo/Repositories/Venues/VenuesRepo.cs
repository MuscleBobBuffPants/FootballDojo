using FootballDojo.Client;
using FootballDojo.Global;
using FootballDojo.Models;
using FootballDojo.Models.Venues;

namespace FootballDojo.Repositories
{
    public class VenuesRepo : IVenuesRepo
    {
        private readonly FootballDojoClient _client;

        public VenuesRepo(FootballDojoClient client)
        {
            _client = client;
        }

        public async Task<Venue> GetVenueByVenueId(int venueId)
        {
            var apiUrl = $"{Constants.BASE_URL}venues?id={venueId}";

            var response = await _client.HttpClient.GetFromJsonAsync<Venues>(apiUrl);

            return (response?.Response?.Any() ?? false)
                ? response.Response[0]
                : null;
        }
    }
}