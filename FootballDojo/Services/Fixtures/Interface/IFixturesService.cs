using FootballDojo.Models;

namespace FootballDojo.Services
{
    public interface IFixturesService
    {
        Task<List<FixturesResponse>> GetFixturesByLeagueIdAndSeasonYearAndTeamIdAsync(int leagueId, int seasonYear, int teamId);
    }
}
