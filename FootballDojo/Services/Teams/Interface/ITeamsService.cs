using FootballDojo.Models;

namespace FootballDojo.Services
{
    public interface ITeamsService
    {
        Task<Team> GetTeamByCountryAndTeamNameAsync(string teamName, string country);
        Task<List<TeamResponse>> GetTeamsByLeagueIdAndSeasonYearAsync(int leagueId, int seasonYear);
    }
}