using FootballDojo.Models;

namespace FootballDojo.Services
{
    public interface IFixturesService
    {
        Task<List<Fixtures>> GetFixturesByLeagueIdAndSeasonYearAndTeamIdAsync(int leagueId, int seasonYear, int teamId);
    }
}
