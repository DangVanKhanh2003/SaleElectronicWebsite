using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SellingElectronicWebsite.Entities;
using SellingElectronicWebsite.ViewModel;

namespace SellingElectronicWebsite.Repository
{
    public class StatsRepository : IStatsRepository
    {

        private SellingElectronicsContext _context;
        private readonly IMapper _mapper;


        public StatsRepository(SellingElectronicsContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;

        }

        public async Task<List<StatsViewModel>> GetStats(int startDate, int endDate)
        {
            // Define the Unix epoch
            var epoch = new DateTime(1970, 1, 1);

            // Get all orders between start date and end date
            var orders = await _context.ProductOrders
                .Include(o => o.Order)
                .Where(o => o.Order.Status.ToLower() == "approve" &&
                            EF.Functions.DateDiffSecond(epoch, o.Order.DateExport) > startDate &&
                            EF.Functions.DateDiffSecond(epoch, o.Order.DateExport) < endDate)
                .Select(o => new
                {
                    time = EF.Functions.DateDiffSecond(epoch, o.Order.DateExport),
                    amount = o.Amount,
                    money = o.Amount * o.UntilPrice
                })
                .ToListAsync();

            // Group by unit
            List<StatsViewModel> listUnit = orders
                .GroupBy(o => o.time)
                .Select(group => new StatsViewModel
                {
                    date = (int)group.Key,
                    amount = group.Sum(item => item.amount),
                    money = group.Sum(item => item.money)
                })
                .ToList();

            return listUnit;
        }




    }
}
