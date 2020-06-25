using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using Timesheet.Infrastructure.Persistence;

namespace Timesheet.Api.Services
{
    public class TaskService : IGetAll<Core.Task>
    {
        private readonly TimesheetContext context;

        public TaskService(TimesheetContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Core.Task>> GetAllAsync()
        {
            return await this.context.Tasks.ToListAsync();
        }

        public async Task Add(Timesheet.Core.Task task)
        {
            await this.context.AddAsync(task);
            await this.context.SaveChangesAsync();
        }
    }
}
