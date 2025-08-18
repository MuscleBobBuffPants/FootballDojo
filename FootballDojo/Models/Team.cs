namespace FootballDojo.Models
{
    public class Team
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string Logo { get; set; }
    }

    public class TeamResponse
    {
        public Team Team { get; set; }
    }

    public class TeamRoot
    {
        public List<TeamResponse> Response { get; set; }
    }
}