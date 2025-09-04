namespace FootballDojo.Models
{
    public class TeamPenalties
    {
        public TeamPenaltyStats Scored { get; set; }
        public TeamPenaltyStats Missed { get; set; }
        public int Total { get; set; }
    }
}
