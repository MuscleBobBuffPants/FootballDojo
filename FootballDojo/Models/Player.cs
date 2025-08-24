namespace FootballDojo.Models
{
    public class Player
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? Number { get; set; }
        public string Position { get; set; }
        public string Photo { get; set; }
    }

    public class PlayerResponse
    {
        public List<Player> Players { get; set; }
    }

    public class PlayerRoot
    {
        public List<PlayerResponse> Response { get; set; }
    }
}