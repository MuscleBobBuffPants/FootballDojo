namespace FootballDojo.Models
{
    public class Standings
    {
        public int Rank { get; set; }
        public Team Team { get; set; }
        public int Points { get; set; }
        public int GoalsDiff { get; set; }
        public string Description { get; set; }
    }

    public class StandingsResponse
    {
        public League League { get; set; }
    }

    public class StandingsRoot
    {
        public List<StandingsResponse> Response { get; set; }
    }
}
