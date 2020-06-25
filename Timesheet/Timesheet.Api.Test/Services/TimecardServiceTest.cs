using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Timesheet.Api.Services;
using Timesheet.Core;
using Timesheet.Infrastructure.Persistence;
using Xunit;

namespace Timesheet.Api.Test.Services
{
    public class TimecardServiceTest
    {
        [Fact]
        public async System.Threading.Tasks.Task GetAll_ReturnsAllRows()
        {
            var options = new DbContextOptionsBuilder<TimesheetContext>()
               .UseInMemoryDatabase(databaseName: "Timesheet").Options;

            // Insert seed data into the database using one instance of the context
            var context = new TimesheetContext(options);

            context.Timecards.Add(new Timecard() { Id = 1, Date = new DateTime(2020, 1,11), Hours = 7.5m, TaskId = 1 });
            context.Timecards.Add(new Timecard() { Id = 2, Date = new DateTime(2020, 1, 11), Hours = 7.5m, TaskId = 1 });
            context.Timecards.Add(new Timecard() { Id = 3, Date = new DateTime(2020, 1, 11), Hours = 7.5m, TaskId = 1 });

            context.SaveChanges();

            var service = new TimecardService(context);
            var all = await service.GetAllAsync();
            Assert.Equal(3, all.Count());
        }
    }
}
