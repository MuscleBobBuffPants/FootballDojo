using FootballDojo.Models;

namespace FootballDojo.Repositories
{
    public interface IVenuesRepo
    {
        Task<Venue> GetVenueByVenueId(int venueId);
    }
}