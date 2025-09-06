using FootballDojo.Models;

namespace FootballDojo.Repositories
{
    public interface IFixturesRepo
    {
        Task<List<FixturesResponse>> GetFixturesByLeagueIdAndSeasonAndTeamIdAsync(int leagueId, int season, int teamId);
        Task<List<FixturesResponse>> GetHeadToHeadFixturesByTeamIdsAsync(int homeTeamId, int awayTeamId);
        Task<List<FixturesResponse>> GetRecentFormByLeagueIdAndTeamIdAsync(int leagueId, int season, int teamId);
        Task<int?> GetLastCompletedFixtureIdByLeagueIdAndTeamIdAsync(int leagueId, int season, int teamId);
        Task<Lineups> GetLineupByFixtureIdAndTeamIdAsync(int fixtureId, int teamId);
        Task<List<Lineups>> GetLineupsForFixtureByFixtureIdAsync(int fixtureId);
        Task<List<FixtureStats>> GetStatsForFixtureByFixtureIdAsync(int fixtureId);
    }
}
