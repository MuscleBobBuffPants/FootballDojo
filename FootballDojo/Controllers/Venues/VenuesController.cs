using FootballDojo.Services;
using Microsoft.AspNetCore.Mvc;

namespace FootballDojo.Controllers
{
    [ApiController]
    [Route("api/venues")]
    public class VenuesController : ControllerBase
    {
        private readonly IVenuesService _venuesService;
        private readonly ILogger<VenuesController> _logger;

        public VenuesController(IVenuesService venuesService, ILogger<VenuesController> logger)
        {
            _venuesService = venuesService;
            _logger = logger;
        }

        [HttpGet]
        [Route("venueId={venueId}")]
        public async Task<IActionResult> GetStandingsByLeagueIdAndSeasonYear(int venueId)
        {
            try
            {
                var venue = await _venuesService.GetVenueByVenueId(venueId);

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