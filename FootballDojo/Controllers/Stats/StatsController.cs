using FootballDojo.Global;
using FootballDojo.Services;
using Microsoft.AspNetCore.Mvc;

namespace FootballDojo.Controllers
{
    [ApiController]
    [Route("api/stats")]
    public class StatsController : ControllerBase
    {
        private readonly IStatsService _statsService;
        private readonly ILogger<StatsController> _logger;

        public StatsController(IStatsService statsService, ILogger<StatsController> logger)
        {
            _statsService = statsService;
            _logger = logger;
        }

        [HttpGet]
        [Route("playerId={playerId}/leagueId={leagueId}/season={season}")]
        public async Task<IActionResult> GetStatsByPlayerIdAndLeagueIdAndSeason(int playerId, int leagueId, int season)
        {
            try
            {
                var stats = await _statsService.GetStatsByPlayerIdAndLeagueIdAndSeasonAsync(playerId, leagueId, season);

                if (stats is null) return Ok(Constants.DEFAULT_STATS);

                return Ok(stats);
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError(ex, $"Error fetching stats for playerId: {playerId}, leagueId: {leagueId}, seasonYear: {season}");
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("teamId={teamId}/leagueId={leagueId}/season={season}")]
        public async Task<IActionResult> GetStatsByTeamIdAndLeagueIdAndSeason(int teamId, int leagueId, int season)
        {
            try
            {
                var stats = await _statsService.GetStatsByTeamIdAndLeagueIdAndSeasonAsync(teamId, leagueId, season);

                if (stats is null) return NotFound();

                return Ok(stats);
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError(ex, $"Error fetching stats for teamId: {teamId}, leagueId: {leagueId}, season: {season}");
                return BadRequest();
            }
        }
    }
}
