namespace FootballDojo.Models
{
    public class Standings
    {
    }

    public class StandingsResponse
    {
        public Standings Standings { get; set; }
    }

    public class StandingsRoot
    {
        public List<StandingsResponse> Response { get; set; }
    }
}
