using FootballDojo.Models;

namespace FootballDojo.Repositories
{
    public interface IStatsRepo
    {
        Task<List<PlayerStats>> GetStatsByPlayerIdAndLeagueIdAndSeasonAsync(int playerId, int leagueId, int season);
        Task<TeamStats> GetStatsByTeamIdAndLeagueIdAndSeasonAsync(int teamId, int leagueId, int season);
        Task<List<PlayerStats>> GetPlayerStatsByTeamIdAndSeasonAsync(int teamId, int season);
    }
}
