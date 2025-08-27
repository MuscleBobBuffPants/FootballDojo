namespace FootballDojo.Models
{
    public class Stats
    {
        public GameStats Games { get; set; }
        public SubstituteStats Substitutes { get; set; }
        public ShotStats Shots { get; set; }
        public GoalStats Goals { get; set; }
        public PassStats Passes {  get; set; }
        public TackleStats Tackles { get; set; }
        public DuelStats Duels { get; set; }
        public DribbleStats Dribbles { get; set; }
        public FoulStats Fouls { get; set; }
        public CardStats Cards { get; set; }
        public PenaltyStats Penalty { get; set; }
    }

    public class StatsResponse
    {
        public List<Stats> Statistics { get; set; }
    }

    public class StatsRoot
    {
        public List<StatsResponse> Response { get; set; }
    }
}