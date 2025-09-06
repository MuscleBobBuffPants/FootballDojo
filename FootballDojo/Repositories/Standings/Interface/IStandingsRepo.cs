using FootballDojo.Models;

namespace FootballDojo.Repositories
{
    public interface IStandingsRepo
    {
        Task<List<Standings>> GetStandingsByLeagueIdAndSeasonAsync(int leagueId, int seasonYear);
    }
}
