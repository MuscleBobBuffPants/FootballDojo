using FootballDojo.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace FootballDojo.Controllers
{
    [ApiController]
    [Route("api/standings")]
    public class StandingsController : ControllerBase
    {
        private readonly IStandingsRepo _standingsRepo;
        private readonly ILogger<StandingsController> _logger;

        public StandingsController(IStandingsRepo standingsRepo, ILogger<StandingsController> logger)
        {
            _standingsRepo = standingsRepo;
            _logger = logger;
        }

        [HttpGet]
        [Route("leagueId={leagueId}/season={season}")]
        public async Task<IActionResult> GetStandingsByLeagueIdAndSeason(int leagueId, int season)
        {
            try
            {
                var standings = await _standingsRepo.GetStandingsByLeagueIdAndSeasonAsync(leagueId, season);

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