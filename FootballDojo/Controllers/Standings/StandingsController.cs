using FootballDojo.Services;
using Microsoft.AspNetCore.Mvc;

namespace FootballDojo.Controllers
{
    [ApiController]
    [Route("api/standings")]
    public class StandingsController : ControllerBase
    {
        private readonly IStandingsService _standingsService;
        private readonly ILogger<StandingsController> _logger;

        public StandingsController(IStandingsService standingsService, ILogger<StandingsController> logger)
        {
            _standingsService = standingsService;
            _logger = logger;
        }

        [HttpGet]
        [Route("leagueId={leagueId}/season={season}")]
        public async Task<IActionResult> GetStandingsByLeagueIdAndSeason(int leagueId, int season)
        {
            try
            {
                var standings = await _standingsService.GetStandingsByLeagueIdAndSeasonAsync(leagueId, season);

                if (standings is null) return NotFound();

                return Ok(standings);
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError(ex, $"Error fetching standings for leagueId: {leagueId}, season: {season}");
                return BadRequest();
            }
        }
    }
}