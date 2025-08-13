using FootballDojo.Services;
using Microsoft.AspNetCore.Mvc;

namespace FootballDojo.Controllers
{
    [ApiController]
    [Route("api/teams")]
    public class TeamsController : ControllerBase
    {
        private readonly ITeamsService _teamsService;
        private readonly ILogger<TeamsController> _logger;

        public TeamsController(ITeamsService teamsService, ILogger<TeamsController> logger)
        {
            _teamsService = teamsService;
            _logger = logger;
        }

        [HttpGet]
        [Route("country={country}/teamName={teamName}")]
        public async Task<IActionResult> GetTeamByCountryAndTeamName(string country, string teamName)
        {
            try
            {
                var team = await _teamsService.GetTeamByCountryAndTeamNameAsync(country, teamName);

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
        [Route("leagueId={leagueId}/seasonYear={seasonYear}")]
        public async Task<IActionResult> GetTeamsByLeagueIdAndSeasonYear(int leagueId, int seasonYear)
        {
            try
            {
                var teams = await _teamsService.GetTeamsByLeagueIdAndSeasonYearAsync(leagueId, seasonYear);

                if (teams is null) return NotFound();

                return Ok(teams);
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError(ex, $"Error fetching teams for leagueId: {leagueId} & seasonYear: {seasonYear}");
                return BadRequest();
            }
        }
    }
}