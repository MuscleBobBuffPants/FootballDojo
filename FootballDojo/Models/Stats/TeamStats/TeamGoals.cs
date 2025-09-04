namespace FootballDojo.Models
{
    public class TeamGoals
    {
        public TeamForOrAgainstGoals For { get; set; }
        public TeamForOrAgainstGoals Against { get; set; }
    }

    public class TeamForOrAgainstGoals
    {
        public TeamGoalTotals Total { get; set; }
        public TeamGoalAverage Average { get; set; }
        public Dictionary<string, TeamGoalMinute> Minute { get; set; }
    }
}
