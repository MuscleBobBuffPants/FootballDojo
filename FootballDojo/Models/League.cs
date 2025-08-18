namespace FootballDojo.Models
{
    public class League
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Standings Standings { get; set; }
    }
}