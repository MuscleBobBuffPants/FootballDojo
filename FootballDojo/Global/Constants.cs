using FootballDojo.Models;

namespace FootballDojo.Global
{
    public class Constants
    {
        public static readonly List<Stats> DEFAULT_STATS = new List<Stats>
        {
            new Stats
            {
                Games = new GameStats
                {
                    Minutes = null,
                    Rating = null,
                },
                Substitutes = new SubstituteStats
                {
                    In = null,
                    Out = null,
                },
                Shots = new ShotStats
                {
                    Total = null,
                    On = null
                },
                Goals = new GoalStats
                {
                    Total = null,
                    Assists = null
                },
                Passes = new PassStats
                {
                    Total = null,
                    Key = null
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
                Dribbles = new DribbleStats
                {
                    Attempts = null,
                    Success = null
                },
                Fouls = new FoulStats
                {
                    Committed = null,
                    Drawn = null
                },
                Cards = new CardStats
                {
                    Yellow = null,
                    Red = null,
                    YellowRed = null
                },
                Penalty = new PenaltyStats
                {
                    Scored = null,
                    Missed = null
                }
            }
        };
    }
}
