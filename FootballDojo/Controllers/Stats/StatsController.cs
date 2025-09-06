using FootballDojo.Global;
using FootballDojo.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace FootballDojo.Controllers
{
    [ApiController]
    [Route("api/stats")]
    public class StatsController : ControllerBase
    {
        private readonly IStatsRepo _statsRepo;
        private readonly ILogger<StatsController> _logger;

        public StatsController(IStatsRepo statsRepo, ILogger<StatsController> logger)
        {
            _statsRepo = statsRepo;
            _logger = logger;
        }

        [HttpGet]
        [Route("playerId={playerId}/leagueId={leagueId}/season={season}")]
        public async Task<IActionResult> GetStatsByPlayerIdAndLeagueIdAndSeason(int playerId, int leagueId, int season)
        {
            try
            {
                var stats = await _statsRepo.GetStatsByPlayerIdAndLeagueIdAndSeasonAsync(playerId, leagueId, season);

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
                var stats = await _statsRepo.GetStatsByTeamIdAndLeagueIdAndSeasonAsync(teamId, leagueId, season);

                if (stats is null) return NotFound();

                return Ok(stats);
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError(ex, $"Error fetching stats for teamId: {teamId}, leagueId: {leagueId}, season: {season}");
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("teamId={teamId}/season={season}")]
        public async Task<IActionResult> GetPlayerStatsByTeamIdAndSeason(int teamId, int season)
        {
            try
            {
                var stats = await _statsRepo.GetPlayerStatsByTeamIdAndSeasonAsync(teamId, season);

                if (stats is null) return NotFound();

                return Ok(stats);
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError(ex, $"Error fetching player stats for teamId: {teamId}, season: {season}");
                return BadRequest();
            }
        }
    }
}
