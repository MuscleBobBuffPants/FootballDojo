using FootballDojo.Models;

namespace FootballDojo.Repositories
{
    public interface ITeamsRepo
    {
        Task<Team> GetTeamByCountryAndTeamNameAsync(string teamName, string country);
        Task<List<TeamResponse>> GetTeamsByLeagueIdAndSeasonAsync(int leagueId, int seasonYear);
    }
}