using FootballDojo.Models;

namespace FootballDojo.Repositories
{
    public interface IStatsRepo
    {
        Task<List<PlayerStats>> GetStatsByPlayerIdAndLeagueIdAndSeasonAsync(int playerId, int leagueId, int season);
        Task<TeamStats> GetTeamStatsByTeamIdAndLeagueIdAndSeasonAsync(int teamId, int leagueId, int season);
        Task<List<TeamStatsByPlayer>> GetPlayerStatsByLeagueIdAndTeamIdAndSeasonAsync(int leagueId, int teamId, int season);
    }
}
