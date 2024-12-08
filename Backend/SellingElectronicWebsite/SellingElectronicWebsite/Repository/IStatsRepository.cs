using SellingElectronicWebsite.ViewModel;

namespace SellingElectronicWebsite.Repository
{
    public interface IStatsRepository
    {
        Task<List<StatsViewModel>> GetStats(int startDate, int endDate);
    }
}
