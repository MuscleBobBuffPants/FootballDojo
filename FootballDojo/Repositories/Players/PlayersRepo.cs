using FootballDojo.Client;
using FootballDojo.Global;
using FootballDojo.Models;

namespace FootballDojo.Repositories
{
    public class PlayersRepo : IPlayersRepo
    {
        private readonly FootballDojoClient _client;

        public PlayersRepo(FootballDojoClient client)
        {
            _client = client;
        }

        public async Task<List<Player>> GetPlayersByTeamIdAsync(int teamId)
        {
            var apiUrl = $"{Constants.BASE_URL}players/squads?team={teamId}";

            var response = await _client.HttpClient.GetFromJsonAsync<PlayerRoot>(apiUrl);

            return (response?.Response?.Count ?? 0) > 0
                ? response.Response[0].Players
                : null;
        }

        public async Task<PlayerProfile> GetPlayerProfileByPlayerIdAsync(int playerId)
        {
            var apiUrl = $"{Constants.BASE_URL}/players/profiles?player={playerId}";

            var response = await _client.HttpClient.GetFromJsonAsync<PlayerProfileRoot>(apiUrl);

            return (response?.Response?.Count ?? 0) > 0
                ? response.Response[0].Player
                : null;
        }
    }
}