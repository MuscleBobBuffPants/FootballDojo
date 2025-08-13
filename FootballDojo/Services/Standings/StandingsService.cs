using FootballDojo.Client;
using FootballDojo.Global;
using FootballDojo.Models;

namespace FootballDojo.Services
{
    public class StandingService : IStandingsService
    {
        private readonly FootballDojoClient _client;

        public StandingService(FootballDojoClient client)
        {
            _client = client;
        }

        public async Task<Standings> GetStandingsByLeagueIdAndSeasonYearAsync(int leagueId, int seasonYear)
        {
            var apiUrl = $"{Constants.BASE_URL}standings?league={leagueId}&season={seasonYear}";

            var response = await _client.HttpClient.GetFromJsonAsync<StandingsRoot>(apiUrl);

            return (response?.Response?.Count ?? 0) > 0
                ? response.Response[0].Standings
                : null;
        }
    }
}