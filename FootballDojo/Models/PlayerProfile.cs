namespace FootballDojo.Models
{
    public class PlayerProfile
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
        public string Nationality { get; set; }
        public string Height { get; set; }
        public string Weight { get; set; }
        public int Number { get; set; }
        public string Position { get; set; }
        public string Photo { get; set; }
    }

    public class PlayerProfileResponse
    {
        public PlayerProfile Player { get; set; }
    }

    public class PlayerProfileRoot
    {
        public List<PlayerProfileResponse> Response { get; set; }
    }
}
