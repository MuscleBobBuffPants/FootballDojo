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

        [HttpGet]
        [Route("homeTeamId={homeTeamId}/awayTeamId={awayTeamId}")]
        public async Task<IActionResult> GetHeadToHeadFixturesByTeamIds(int homeTeamId, int awayTeamId)
        {
            try
            {
                var fixtures = await _fixturesService.GetHeadToHeadFixturesByTeamIdsAsync(homeTeamId, awayTeamId);

                if (fixtures is null) return NotFound();

                return Ok(fixtures);
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError(ex, $"Error fetching head-to-head fixtures for homeTeamId: {homeTeamId}, awayTeamId: {awayTeamId}");
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("leagueId={leagueId}/teamId={teamId}")]
        public async Task<IActionResult> GetRecentFormByLeagueIdAndTeamId(int leagueId, int teamId)
        {
            try
            {
                var fixtures = await _fixturesService.GetRecentFormByLeagueIdAndTeamIdAsync(leagueId, teamId);

                if (fixtures is null) return NotFound();

                return Ok(fixtures);
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError(ex, $"Error fetching recent fixtures for leagueId: {leagueId}, teamId: {teamId}");
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("fixtureId={fixtureId}")]
        public async Task<IActionResult> GetLineupsForFixtureByFixtureId(int fixtureId)
        {
            try
            {
                var lineups = await _fixturesService.GetLineupsForFixtureByFixtureIdAsync(fixtureId);

                if (lineups is null) return NotFound();

                return Ok(lineups);
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError(ex, $"Error fetching lineups for fixtureId: {fixtureId}");
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("stats/fixtureId={fixtureId}")]
        public async Task<IActionResult> GetStatsForFixtureByFixtureId(int fixtureId)
        {
            try
            {
                var stats = await _fixturesService.GetStatsForFixtureByFixtureIdAsync(fixtureId);

                if (stats is null) return NotFound();

                return Ok(stats);
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError(ex, $"Error fetching stats for fixtureId: {fixtureId}");
                return BadRequest();
            }
        }
    }
}
