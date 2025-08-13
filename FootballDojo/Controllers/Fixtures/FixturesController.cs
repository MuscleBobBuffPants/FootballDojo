using FootballDojo.Services;
using Microsoft.AspNetCore.Mvc;

namespace FootballDojo.Controllers
{
    [ApiController]
    [Route("api/fixtures")]
    public class FixturesController : ControllerBase
    {
        private readonly IFixturesService _fixturesService;
        private readonly ILogger<FixturesController> _logger;

        public FixturesController(IFixturesService fixturesService, ILogger<FixturesController> logger)
        {
            _fixturesService = fixturesService;
            _logger = logger;
        }

        [HttpGet]
        [Route("leagueId={leagueId}/seasonYear={seasonYear}/teamId={teamId}")]
        public async Task<IActionResult> GetFixturesByLeagueIdAndSeasonYearAndTeamId(int leagueId, int seasonYear, int teamId)
        {
            try
            {
                var fixtures = await _fixturesService.GetFixturesByLeagueIdAndSeasonYearAndTeamIdAsync(leagueId, seasonYear, teamId);

                if (fixtures is null) return NotFound();

                return Ok(fixtures);
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError(ex, $"Error fetching fixtures for leagueId: {leagueId}, seasonYear: {seasonYear}, teamId: {teamId}");
                return BadRequest();
            }
        }
    }
}
