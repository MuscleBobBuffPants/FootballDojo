using FootballDojo.Models;

namespace FootballDojo.Services
{
    public interface IStandingsService
    {
        Task<List<Standings>> GetStandingsByLeagueIdAndSeasonYearAsync(int leagueId, int seasonYear);
    }
}
