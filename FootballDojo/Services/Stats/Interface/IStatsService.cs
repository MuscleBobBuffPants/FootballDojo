using FootballDojo.Models;

public interface IStatsService
{
    Task<List<PlayerStatLeader>> GetTeamStatLeadersBySeason(int teamId, int season);
}