namespace FootballDojo.Models
{
    public class TeamStatsByPlayer
    {
        public Player Player { get; set; }
        public List<PlayerStats> Statistics { get; set; }
    }

    public class TeamStatsByPlayerRoot
    {
        public List<TeamStatsByPlayer> Response { get; set; }
    }
}