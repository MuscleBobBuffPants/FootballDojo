using FootballDojo.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace FootballDojo.Controllers
{
    [ApiController]
    [Route("api/venues")]
    public class VenuesController : ControllerBase
    {
        private readonly IVenuesRepo _venuesRepo;
        private readonly ILogger<VenuesController> _logger;

        public VenuesController(IVenuesRepo venuesRepo, ILogger<VenuesController> logger)
        {
            _venuesRepo = venuesRepo;
            _logger = logger;
        }

        [HttpGet]
        [Route("venueId={venueId}")]
        public async Task<IActionResult> GetStandingsByLeagueIdAndSeasonYear(int venueId)
        {
            try
            {
                var venue = await _venuesRepo.GetVenueByVenueId(venueId);

                if (venue is null) return NotFound();

                return Ok(venue);
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError(ex, $"Error fetching venue for venueId: {venueId}");
                return BadRequest();
            }
        }
    }
}