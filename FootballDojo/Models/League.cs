namespace FootballDojo.Models
{
    public class League
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Country { get; set; }
        public string Logo { get; set; }
        public string Flag { get; set; }
        public List<List<Standings>> Standings { get; set; }
    }
}