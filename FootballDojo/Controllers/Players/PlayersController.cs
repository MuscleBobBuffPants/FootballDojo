using FootballDojo.Services;
using Microsoft.AspNetCore.Mvc;

namespace FootballDojo.Controllers
{
    [ApiController]
    [Route("api/players")]
    public class PlayersController : ControllerBase
    {
        private readonly IPlayersService _playersService;
        private readonly ILogger<PlayersController> _logger;

        public PlayersController(IPlayersService playersService, ILogger<PlayersController> logger)
        {
            _playersService = playersService;
            _logger = logger;
        }

        [HttpGet]
        [Route("teamId={teamId}")]
        public async Task<IActionResult> GetPlayersByTeamId(int teamId)
        {
            try
            {
                var players = await _playersService.GetPlayersByTeamIdAsync(teamId);

                if (players is null) return NotFound();

                return Ok(players);
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError(ex, $"Error fetching players for team: {teamId}");
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("playerId={playerId}")]
        public async Task<IActionResult> GetPlayerProfileByPlayerId(int playerId)
        {
            try
            {
                var playerProfile = await _playersService.GetPlayerProfileByPlayerIdAsync(playerId);

                if (playerProfile is null) return NotFound();

                return Ok(playerProfile);
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError(ex, $"Error fetching player profile for player: {playerId}");
                return BadRequest();
            }
        }
    }
}