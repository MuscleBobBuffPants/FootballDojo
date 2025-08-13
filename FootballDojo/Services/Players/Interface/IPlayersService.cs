using FootballDojo.Models;

namespace FootballDojo.Services
{
    public interface IPlayersService
    {
        Task<List<Player>> GetPlayersByTeamIdAsync(int teamId);
        Task<PlayerProfile> GetPlayerProfileByPlayerIdAsync(int playerId);
    }
}