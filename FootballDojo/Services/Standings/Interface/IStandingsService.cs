using FootballDojo.Models;

namespace FootballDojo.Services
{
    public interface IStandingsService
    {
        Task<Standings> GetStandingsByLeagueIdAndSeasonYearAsync(int leagueId, int seasonYear);
    }
}
