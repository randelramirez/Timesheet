using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Timesheet.Infrastructure.Persistence;

namespace Timesheet.Api.Services
{
    public class TaskService : IGetAll<Core.Task>, IGet<Core.Task>
    {
        private readonly TimesheetContext context;

        public TaskService(TimesheetContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<IEnumerable<Core.Task>> GetAllAsync(IEnumerable<int> ids)
        {
            return await this.context.Tasks.Where(t => ids.Contains(t.Id)).ToListAsync();
        }

        public async Task<IEnumerable<Core.Task>> GetAllAsync()
        {
            return await this.context.Tasks.AsNoTracking().ToListAsync();
        }

        public async System.Threading.Tasks.Task Add(Timesheet.Core.Task task)
        {
            await this.context.AddAsync(task);
            await this.context.SaveChangesAsync();
        }

        public async Task<Core.Task> GetAsync(int id)
        {
            return await this.context.Tasks.AsNoTracking().SingleOrDefaultAsync(t => t.Id == id);
        }  
    }
}
