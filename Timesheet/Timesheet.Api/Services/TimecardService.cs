using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Timesheet.Core;
using Timesheet.Infrastructure.Persistence;
using Task = System.Threading.Tasks.Task;

namespace Timesheet.Api.Services
{
    public class TimecardService : IGetAll<Core.Timecard>
    {
        private readonly TimesheetContext context;

        public TimecardService(TimesheetContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Timecard>> GetAllAsync()
        {
            return await this.context.Timecards.ToListAsync();
        }

        public async Task<IEnumerable<Timecard>> GetAllByDateRange(DateTime fromDate, DateTime toDate)
        {
            return await this.context.Timecards.Where(t => t.Date <= fromDate && t.Date >= toDate).ToListAsync();
        }

        public async Task Add(List<Timecard> timecards)
        {
            await this.context.Timecards.AddRangeAsync(timecards);
            await this.context.SaveChangesAsync();
        }
    }
}
