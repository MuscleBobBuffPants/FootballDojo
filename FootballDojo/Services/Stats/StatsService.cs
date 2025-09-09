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

        public async Task<List<PlayerStatLeader>> GetTeamStatLeadersByLeagueAndSeason(int leagueId, int teamId, int season)
        {
            var statLeaders = new List<PlayerStatLeader>();
            var stats = await _statsRepo.GetPlayerStatsByLeagueIdAndTeamIdAndSeasonAsync(leagueId, teamId, season);

            if (stats == null || !stats.Any())
                return statLeaders;

            // Define the categories dynamically
            var categories = new List<(string Description, Func<TeamStatsByPlayer, double> Selector)>
            {
                ("Goals", p => p.Statistics[0].Goals.Total ?? 0),
                ("Assists", p => p.Statistics[0].Goals.Assists ?? 0),
                ("Match Rating", p =>
                    {
                        if (double.TryParse(p.Statistics[0].Games.Rating, out var rating))
                            return rating;
                        return 0;
                    }
                ),
                ("Minutes Played", p => p.Statistics[0].Games.Minutes ?? 0),
                ("Shots", p => p.Statistics[0].Shots.Total ?? 0),
                ("Shots On Target", p => p.Statistics[0].Shots.On ?? 0),
                ("Passes", p => p.Statistics[0].Passes.Total ?? 0),
                ("Key Passes", p => p.Statistics[0].Passes.Key ?? 0),
                ("Successful Dribbles", p => p.Statistics[0].Dribbles.Success ?? 0),
                ("Duels Won", p => p.Statistics[0].Duels.Won ?? 0),
                ("Tackles", p => p.Statistics[0].Tackles.Total ?? 0),
                ("Blocks", p => p.Statistics[0].Tackles.Blocks ?? 0),
                ("Interceptions", p => p.Statistics[0].Tackles.Interceptions ?? 0),
                ("Fouls Committed", p => p.Statistics[0].Fouls.Committed ?? 0),
                ("Fouls Drawn", p => p.Statistics[0].Fouls.Drawn ?? 0),
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
                            Photo = p.Player.Photo,
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