using FootballDojo.Models;

namespace FootballDojo.Repositories
{
    public interface IPlayersRepo
    {
        Task<List<Player>> GetPlayersByTeamIdAsync(int teamId);
        Task<PlayerProfile> GetPlayerProfileByPlayerIdAsync(int playerId);
    }
}