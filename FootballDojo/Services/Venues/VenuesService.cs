using FootballDojo.Client;
using FootballDojo.Global;
using FootballDojo.Models;
using FootballDojo.Models.Venues;

namespace FootballDojo.Services
{
    public class VenuesService : IVenuesService
    {
        private readonly FootballDojoClient _client;

        public VenuesService(FootballDojoClient client)
        {
            _client = client;
        }

        public async Task<Venue> GetVenueByVenueId(int venueId)
        {
            var apiUrl = $"{Constants.BASE_URL}venues?id={venueId}";

            var response = await _client.HttpClient.GetFromJsonAsync<Venues>(apiUrl);

            return (response?.Response?.Count ?? 0) > 0
                ? response.Response[0]
                : null;
        }
    }
}