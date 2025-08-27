namespace FootballDojo.Models
{
    public class Lineups
    {
        public Team Team { get; set; }
        public Coach Coach { get; set; }
        public string Formation { get; set; }
        public List<StartingXI> StartXI { get; set; }
        public List<StartingXISubstitute> Substitutes { get; set; }
    }

    public class LineupsResponse
    {
        public List<Lineups> Response { get; set; }
    }
}
