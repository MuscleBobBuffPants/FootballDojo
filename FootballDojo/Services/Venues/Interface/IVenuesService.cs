using FootballDojo.Models;

namespace FootballDojo.Services
{
    public interface IVenuesService
    {
        Task<Venue> GetVenueByVenueId(int venueId);
    }
}