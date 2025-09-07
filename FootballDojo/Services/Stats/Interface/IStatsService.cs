using FootballDojo.Models;

public interface IStatsService
{
    Task<List<PlayerStatLeader>> GetTeamStatLeadersByLeagueAndSeason(int leagueId, int teamId, int season);
}