using FootballDojo.Models;

namespace FootballDojo.Services
{
    public interface IStatsService
    {
        Task<List<PlayerStats>> GetStatsByPlayerIdAndLeagueIdAndSeasonAsync(int playerId, int leagueId, int season);
        Task<TeamStats> GetStatsByTeamIdAndLeagueIdAndSeasonAsync(int teamId, int leagueId, int season);
    }
}
