using FootballDojo.Repositories;

public class StatsService : IStatsService
{
    private readonly StatsRepo _repo;

    public StatsService(StatsRepo repo)
    {
        _repo = repo;
    }
}