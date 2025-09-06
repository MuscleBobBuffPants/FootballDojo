using FootballDojo.Client;
using FootballDojo.Global;
using FootballDojo.Models;

namespace FootballDojo.Repositories
{
    public class TeamsRepo : ITeamsRepo
    {
        private readonly FootballDojoClient _client;

        public TeamsRepo(FootballDojoClient client)
        {
            _client = client;
        }

        public async Task<Team> GetTeamByCountryAndTeamNameAsync(string country, string teamName)
        {
            var apiUrl = $"{Constants.BASE_URL}teams?name={teamName}&country={country}";

            var response = await _client.HttpClient.GetFromJsonAsync<TeamRoot>(apiUrl);

            return (response?.Response?.Count ?? 0) > 0
                ? response.Response[0].Team
                : null;
        }

        public async Task<List<TeamResponse>> GetTeamsByLeagueIdAndSeasonAsync(int leagueId, int season)
        {
            var apiUrl = $"{Constants.BASE_URL}teams?league={leagueId}&season={season}";

            var response = await _client.HttpClient.GetFromJsonAsync<TeamRoot>(apiUrl);

            return (response?.Response?.Count ?? 0) > 0
                ? response.Response
                : null;
        }
    }
}