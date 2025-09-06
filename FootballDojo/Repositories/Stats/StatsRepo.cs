using FootballDojo.Client;
using FootballDojo.Global;
using FootballDojo.Models;

namespace FootballDojo.Repositories
{
    public class StatsRepo : IStatsRepo
    {
        private readonly FootballDojoClient _client;

        public StatsRepo(FootballDojoClient client)
        {
            _client = client;
        }

        public async Task<List<PlayerStats>> GetStatsByPlayerIdAndLeagueIdAndSeasonAsync(int playerId, int leagueId, int season)
        {
            var apiUrl = $"{Constants.BASE_URL}players?id={playerId}&league={leagueId}&season={season}";

            var response = await _client.HttpClient.GetFromJsonAsync<PlayerStatsRoot>(apiUrl);

            return (response?.Response?.Count ?? 0) > 0
                ? response.Response[0].Statistics
                : null;
        }

        public async Task<TeamStats> GetStatsByTeamIdAndLeagueIdAndSeasonAsync(int teamId, int leagueId, int season)
        {
            var apiUrl = $"{Constants.BASE_URL}teams/statistics?league={leagueId}&season={season}&team={teamId}";

            var response = await _client.HttpClient.GetFromJsonAsync<TeamStatsRoot>(apiUrl);

            return response?.Response is not null
                ? response.Response
                : null;
        }

        public async Task<List<PlayerStats>> GetStatsByTeamIdAndLeagueIdAndSeasonAsync(int teamId, int season)
        {
            var apiUrl = $"{Constants.BASE_URL}players?season={season}&team={teamId}";

            var response = await _client.HttpClient.GetFromJsonAsync<PlayerStatsRoot>(apiUrl);

            return (response?.Response?.Count ?? 0) > 0
                ? response.Response[0].Statistics
                : null;
        }
    }
}
