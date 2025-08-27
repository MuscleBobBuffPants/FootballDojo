using FootballDojo.Models;

namespace FootballDojo.Services
{
    public interface IFixturesService
    {
        Task<List<FixturesResponse>> GetFixturesByLeagueIdAndSeasonYearAndTeamIdAsync(int leagueId, int seasonYear, int teamId);
        Task<List<FixturesResponse>> GetHeadToHeadFixturesByTeamIdsAsync(int homeTeamId, int awayTeamId);
        Task<List<FixturesResponse>> GetRecentFormByLeagueIdAndTeamIdAsync(int leagueId, int teamId);
        Task<List<Lineups>> GetLineupsForFixtureByFixtureIdAsync(int fixtureId);
    }
}
