using FootballDojo.Models;

namespace FootballDojo.Services
{
    public interface IStatsService
    {
        Task<List<Stats>> GetStatsByPlayerIdAndLeagueIdAndSeasonYearAsync(int playerId, int leagueId, int seasonYear);
    }
}
