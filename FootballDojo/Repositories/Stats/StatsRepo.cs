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

            return (response?.Response?.Any() ?? false)
                ? response.Response[0].Statistics
                : null;
        }

        public async Task<TeamStats> GetTeamStatsByTeamIdAndLeagueIdAndSeasonAsync(int teamId, int leagueId, int season)
        {
            var apiUrl = $"{Constants.BASE_URL}teams/statistics?league={leagueId}&season={season}&team={teamId}";

            var response = await _client.HttpClient.GetFromJsonAsync<TeamStatsRoot>(apiUrl);

            return response?.Response;
        }

        public async Task<List<TeamStatsByPlayer>> GetPlayerStatsByLeagueIdAndTeamIdAndSeasonAsync(int leagueId, int teamId, int season)
        {
            var apiUrl = $"{Constants.BASE_URL}players?league={leagueId}&season={season}&team={teamId}";

            var response = await _client.HttpClient.GetFromJsonAsync<TeamStatsByPlayerRoot>(apiUrl);

            return (response?.Response?.Any() ?? false)
                ? response.Response
                : null;
        }
    }
}
