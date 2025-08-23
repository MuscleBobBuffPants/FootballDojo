using FootballDojo.Client;
using FootballDojo.Global;
using FootballDojo.Models;

namespace FootballDojo.Services
{
    public class StatsService : IStatsService
    {
        private readonly FootballDojoClient _client;

        public StatsService(FootballDojoClient client)
        {
            _client = client;
        }

        public async Task<List<Stats>> GetStatsByPlayerIdAndLeagueIdAndSeasonYearAsync(int playerId, int leagueId, int seasonYear)
        {
            var apiUrl = $"{KeyConstants.BASE_URL}players?id={playerId}&league={leagueId}&season={seasonYear}";

            var response = await _client.HttpClient.GetFromJsonAsync<StatsRoot>(apiUrl);

            return (response?.Response?.Count ?? 0) > 0
                ? response.Response[0].Statistics
                : null;
        }
    }
}
