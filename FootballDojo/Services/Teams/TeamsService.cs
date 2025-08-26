using FootballDojo.Client;
using FootballDojo.Global;
using FootballDojo.Models;

namespace FootballDojo.Services
{
    public class TeamsService : ITeamsService
    {
        private readonly FootballDojoClient _client;

        public TeamsService(FootballDojoClient client)
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

        public async Task<List<TeamResponse>> GetTeamsByLeagueIdAndSeasonYearAsync(int leagueId, int seasonYear)
        {
            var apiUrl = $"{Constants.BASE_URL}teams?league={leagueId}&season={seasonYear}";

            var response = await _client.HttpClient.GetFromJsonAsync<TeamRoot>(apiUrl);

            return (response?.Response?.Count ?? 0) > 0
                ? response.Response
                : null;
        }
    }
}