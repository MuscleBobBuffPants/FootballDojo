using FootballDojo.Client;
using FootballDojo.Global;
using FootballDojo.Models;

namespace FootballDojo.Services
{
    public class FixturesService : IFixturesService
    {
        private readonly FootballDojoClient _client;

        public FixturesService(FootballDojoClient client)
        {
            _client = client;
        }

        public async Task<List<Fixtures>> GetFixturesByLeagueIdAndSeasonYearAndTeamIdAsync(int leagueId, int seasonYear, int teamId)
        {
            var apiUrl = $"{Constants.BASE_URL}fixtures?league={leagueId}&season={seasonYear}&team={teamId}";

            var response = await _client.HttpClient.GetFromJsonAsync<FixturesRoot>(apiUrl);

            return (response?.Response?.Count ?? 0) > 0
                ? response.Response[0].Fixture
                : null;
        }
    }
}
