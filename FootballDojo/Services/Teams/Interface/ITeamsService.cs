using FootballDojo.Models;

namespace FootballDojo.Services
{
    public interface ITeamsService
    {
        Task<Team> GetTeamByCountryAndTeamNameAsync(string teamName, string country);
        Task<List<TeamResponse>> GetTeamsByLeagueIdAndSeasonAsync(int leagueId, int seasonYear);
    }
}