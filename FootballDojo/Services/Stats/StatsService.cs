using FootballDojo.Models;
using FootballDojo.Repositories;

namespace FootballDojo.Services
{
    public class StatsService : IStatsService
    {
        private readonly IStatsRepo _statsRepo;

        public StatsService(IStatsRepo repo)
        {
            _statsRepo = repo;
        }

        public async Task<List<PlayerStatLeader>> GetTeamStatLeadersBySeason(int teamId, int season)
        {
            var statLeaders = new List<PlayerStatLeader>();
            var stats = await _statsRepo.GetPlayerStatsByTeamIdAndSeasonAsync(teamId, season);

            if (stats == null || !stats.Any())
                return statLeaders;

            // Define the categories dynamically
            var categories = new List<(string Description, Func<TeamStatsByPlayer, int> Selector)>
            {
                ("Goals", p => p.Statistics[0].Goals.Total ?? 0),
                ("Assists", p => p.Statistics[0].Goals.Assists ?? 0),
                ("Key Passes", p => p.Statistics[0].Passes.Key ?? 0),
                ("Tackles", p => p.Statistics[0].Tackles.Total ?? 0),
                ("Successful Dribbles", p => p.Statistics[0].Dribbles.Success ?? 0),
                ("Duels Won", p => p.Statistics[0].Duels.Won ?? 0)
            };

            // Loop through each category and find the top player
            foreach (var category in categories)
            {
                // Find the highest stat value for this category
                var maxValue = stats.Max(category.Selector);

                // Get all players with that top value, as long as the value is above 0
                if (maxValue > 0)
                {
                    var topPlayers = stats
                        .Where(p => category.Selector(p) == maxValue)
                        .Select(p => new PlayerStatLeader
                        {
                            Name = p.Player.Name,
                            Description = category.Description,
                            Stat = maxValue
                        });

                    statLeaders.AddRange(topPlayers);
                }
            }

            return statLeaders;
        }
    }
}