using FootballDojo.Models;

namespace FootballDojo.Models
{
    public class TeamStats
    {
        public League League { get; set; }
        public Team Team { get; set; }
        public string Form { get; set; }
        public TeamFixtureStats Fixtures { get; set; }
        public TeamGoals Goals { get; set; }
        public TeamCleanSheets Clean_sheet { get; set; }
        public TeamFailedToScore Failed_to_score { get; set; }
        public TeamPenalties Penalty { get; set; }
        public List<TeamLineups> Lineups { get; set; }
        public TeamCards Cards { get; set; }
    }

    public class TeamStatsRoot
    {
        public TeamStats Response { get; set; }
    }
}
