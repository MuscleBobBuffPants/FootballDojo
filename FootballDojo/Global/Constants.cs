using FootballDojo.Models;

namespace FootballDojo.Global
{
    public class Constants
    {
        public const string BASE_URL = "https://v3.football.api-sports.io/";

        #region Defaults

        public static readonly List<PlayerStats> DEFAULT_STATS = new List<PlayerStats>
        {
            new PlayerStats
            {
                Games = new GameStats
                {
                    Minutes = null,
                    Rating = null,
                },
                Goals = new GoalStats
                {
                    Total = null,
                    Assists = null
                },
                Shots = new ShotStats
                {
                    Total = null,
                    On = null
                },
                Passes = new PassStats
                {
                    Total = null,
                    Key = null
                },
                Dribbles = new DribbleStats
                {
                    Attempts = null,
                    Success = null
                },
                Tackles = new TackleStats
                {
                    Total = null,
                    Blocks = null,
                    Interceptions = null
                },
                Duels = new DuelStats
                {
                    Total = null,
                    Won = null
                },
                Fouls = new FoulStats
                {
                    Committed = null,
                    Drawn = null
                },
                Penalty = new PenaltyStats
                {
                    Scored = null,
                    Missed = null
                },
                Cards = new CardStats
                {
                    Yellow = null,
                    Red = null,
                    YellowRed = null
                }
            }
        };

        #endregion
    }
}
