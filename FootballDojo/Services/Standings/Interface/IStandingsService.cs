using FootballDojo.Models;

namespace FootballDojo.Services
{
    public interface IStandingsService
    {
        Task<List<Standings>> GetStandingsByLeagueIdAndSeasonAsync(int leagueId, int seasonYear);
    }
}
