namespace FootballDojo.Models
{
    public class Fixtures
    {
        public int Id { get; set; }
        public string Date { get; set; }
        public int Timestamp { get; set; }
        public Venue Venue { get; set; }

    }
    public class FixturesResponse
    {
        public List<Fixtures> Fixture { get; set; }
        public List<Team> Teams { get; set; }
    }

    public class FixturesRoot
    {
        public List<FixturesResponse> Response { get; set; }
    }
}
