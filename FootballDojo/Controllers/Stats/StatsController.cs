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
        private readonly IStatsService _statsService;
        private readonly ILogger<StatsController> _logger;

        public StatsController(IStatsRepo statsRepo, IStatsService statsService, ILogger<StatsController> logger)
        {
            _statsRepo = statsRepo;
            _statsService = statsService;
            _logger = logger;
        }

        [HttpGet]
        [Route("playerId={playerId}/leagueId={leagueId}/season={season}")]
        public async Task<IActionResult> GetStatsByPlayerIdAndLeagueIdAndSeason(int playerId, int leagueId, int season)
        {
            try
            {
                var stats = await _statsRepo.GetStatsByPlayerIdAndLeagueIdAndSeasonAsync(playerId, leagueId, season);

                return Ok(stats ?? Constants.DEFAULT_STATS);
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError(ex, $"Error fetching stats for playerId: {playerId}, leagueId: {leagueId}, seasonYear: {season}");
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("teamId={teamId}/leagueId={leagueId}/season={season}")]
        public async Task<IActionResult> GetTeamStatsByTeamIdAndLeagueIdAndSeason(int teamId, int leagueId, int season)
        {
            try
            {
                var stats = await _statsRepo.GetTeamStatsByTeamIdAndLeagueIdAndSeasonAsync(teamId, leagueId, season);

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
        [Route("leagueId={leagueId}/teamId={teamId}/season={season}")]
        public async Task<IActionResult> GetStatLeadersByLeagueIdAndTeamIdAndSeason(int leagueId, int teamId, int season)
        {
            try
            {
                var statLeaders = await _statsService.GetTeamStatLeadersByLeagueAndSeason(leagueId, teamId, season);

                return Ok(statLeaders);
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError(ex, $"Error fetching player stats for teamId: {teamId}, season: {season}");
                return BadRequest();
            }
        }
    }
}
