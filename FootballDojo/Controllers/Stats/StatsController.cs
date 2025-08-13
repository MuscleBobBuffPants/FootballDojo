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
        [Route("playerId={playerId}/leagueId={leagueId}/seasonYear={seasonYear}")]
        public async Task<IActionResult> GetStatsByPlayerIdAndLeagueIdAndSeasonYear(int playerId, int leagueId, int seasonYear)
        {
            try
            {
                var stats = await _statsService.GetStatsByPlayerIdAndLeagueIdAndSeasonYearAsync(playerId, leagueId, seasonYear);

                if (stats is null) return NotFound();

                return Ok(stats);
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError(ex, $"Error fetching stats for playerId: {playerId}, leagueId: {leagueId}, seasonYear: {seasonYear}");
                return BadRequest();
            }
        }
    }
}
