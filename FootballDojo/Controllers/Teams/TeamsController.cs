using FootballDojo.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace FootballDojo.Controllers
{
    [ApiController]
    [Route("api/teams")]
    public class TeamsController : ControllerBase
    {
        private readonly ITeamsRepo _teamsRepo;
        private readonly ILogger<TeamsController> _logger;

        public TeamsController(ITeamsRepo teamsRepo, ILogger<TeamsController> logger)
        {
            _teamsRepo = teamsRepo;
            _logger = logger;
        }

        [HttpGet]
        [Route("country={country}/teamName={teamName}")]
        public async Task<IActionResult> GetTeamByCountryAndTeamName(string country, string teamName)
        {
            try
            {
                var team = await _teamsRepo.GetTeamByCountryAndTeamNameAsync(country, teamName);

                if (team is null) return NotFound();

                return Ok(team);
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError(ex, $"Error fetching team for country: {country} & teamName: {teamName}");
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("leagueId={leagueId}/season={season}")]
        public async Task<IActionResult> GetTeamsByLeagueIdAndSeason(int leagueId, int season)
        {
            try
            {
                var teams = await _teamsRepo.GetTeamsByLeagueIdAndSeasonAsync(leagueId, season);

                if (teams is null) return NotFound();

                return Ok(teams);
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError(ex, $"Error fetching teams for leagueId: {leagueId} & season: {season}");
                return BadRequest();
            }
        }
    }
}