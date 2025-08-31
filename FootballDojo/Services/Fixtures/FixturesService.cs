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

        public async Task<List<FixturesResponse>> GetFixturesByLeagueIdAndSeasonAndTeamIdAsync(int leagueId, int seasonYear, int teamId)
        {
            var apiUrl = $"{Constants.BASE_URL}fixtures?league={leagueId}&season={seasonYear}&team={teamId}";

            var response = await _client.HttpClient.GetFromJsonAsync<FixturesRoot>(apiUrl);

            return (response?.Response?.Count ?? 0) > 0
                ? response.Response
                : null;
        }

        public async Task<List<FixturesResponse>> GetHeadToHeadFixturesByTeamIdsAsync(int homeTeamId, int awayTeamId)
        {
            var apiUrl = $"{Constants.BASE_URL}fixtures/headtohead?h2h={homeTeamId}-{awayTeamId}";

            var response = await _client.HttpClient.GetFromJsonAsync<FixturesRoot>(apiUrl);

            return (response?.Response?.Count ?? 0) > 0
                ? response.Response
                : null;
        }

        public async Task<List<FixturesResponse>> GetRecentFormByLeagueIdAndTeamIdAsync(int leagueId, int teamId)
        {
            var apiUrl = $"{Constants.BASE_URL}fixtures?league={leagueId}&team={teamId}&last=5"; // Default = last 5 games

            var response = await _client.HttpClient.GetFromJsonAsync<FixturesRoot>(apiUrl);

            return (response?.Response?.Count ?? 0) > 0
                ? response.Response
                : null;
        }

        public async Task<int?> GetLastCompletedFixtureIdByLeagueIdAndTeamIdAsync(int leagueId, int season, int teamId)
        {
            var apiUrl = $"{Constants.BASE_URL}fixtures?league={leagueId}&season={season}&team={teamId}&last=1&status=FT";

            var response = await _client.HttpClient.GetFromJsonAsync<FixturesRoot>(apiUrl);

            return (response?.Response?.Count ?? 0) > 0
                ? response.Response[0].Fixture.Id
                : null;
        }

        public async Task<List<StartingXI>> GetLineupByFixtureIdAndTeamIdAsync(int fixtureId, int teamId)
        {
            var apiUrl = $"{Constants.BASE_URL}fixtures/lineups?fixture={fixtureId}&team={teamId}";

            var response = await _client.HttpClient.GetFromJsonAsync<LineupsResponse>(apiUrl);

            return (response?.Response?.Count ?? 0) > 0
                ? response.Response[0].StartXI
                : null;
        }

        public async Task<List<Lineups>> GetLineupsForFixtureByFixtureIdAsync(int fixtureId)
        {
            var apiUrl = $"{Constants.BASE_URL}fixtures/lineups?fixture={fixtureId}";

            var response = await _client.HttpClient.GetFromJsonAsync<LineupsResponse>(apiUrl);

            return (response?.Response?.Count ?? 0) > 0
                ? response.Response
                : null;
        }

        public async Task<List<FixtureStats>> GetStatsForFixtureByFixtureIdAsync(int fixtureId)
        {
            var apiUrl = $"{Constants.BASE_URL}fixtures/statistics?fixture={fixtureId}";

            var response = await _client.HttpClient.GetFromJsonAsync<FixtureStatsResponse>(apiUrl);

            return (response?.Response?.Count ?? 0) > 0
                ? response.Response
                : null;
        }
    }
}
