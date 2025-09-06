using FootballDojo.Client;
using FootballDojo.Global;
using FootballDojo.Models;

namespace FootballDojo.Repositories
{
    public class StandingsRepo : IStandingsRepo
    {
        private readonly FootballDojoClient _client;

        public StandingsRepo(FootballDojoClient client)
        {
            _client = client;
        }

        public async Task<List<Standings>> GetStandingsByLeagueIdAndSeasonAsync(int leagueId, int seasonYear)
        {
            var apiUrl = $"{Constants.BASE_URL}standings?league={leagueId}&season={seasonYear}";

            var response = await _client.HttpClient.GetFromJsonAsync<StandingsRoot>(apiUrl);

            return (response?.Response?.Count ?? 0) > 0
                ? response.Response[0].League.Standings[0]
                : null;
        }
    }
}