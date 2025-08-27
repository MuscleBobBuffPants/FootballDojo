namespace FootballDojo.Models
{
    public class FixtureStats
    {
        public Team Team { get; set; }
        public List<FixtureTeamStats> Statistics { get; set; }
    }

    public class FixtureStatsResponse
    {
        public List<FixtureStats> Response { get; set; }
    }
}
