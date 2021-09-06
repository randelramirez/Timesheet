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
        public async System.Threading.Tasks.Task GetAll_ReturnsAllData()
        {
            var options = new DbContextOptionsBuilder<TimesheetContext>()
               .UseInMemoryDatabase(databaseName: "Timesheet1").Options;

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

        [Fact]
        public async System.Threading.Tasks.Task GetAllByDateRange_ReturnsCorrectNumberOfData()
        {
            var options = new DbContextOptionsBuilder<TimesheetContext>()
               .UseInMemoryDatabase(databaseName: "Timesheet2").Options;

            // Insert seed data into the database using one instance of the context
            var context = new TimesheetContext(options);

            context.Timecards.Add(new Timecard() { Id = 1, Date = new DateTime(2020, 1, 11), Hours = 7.5m, TaskId = 1 });
            context.Timecards.Add(new Timecard() { Id = 2, Date = new DateTime(2020, 1, 11), Hours = 7.5m, TaskId = 1 });
            context.Timecards.Add(new Timecard() { Id = 3, Date = new DateTime(2019, 12, 31), Hours = 7.5m, TaskId = 1 });
            context.Timecards.Add(new Timecard() { Id = 4, Date = new DateTime(2020, 1, 12), Hours = 7.5m, TaskId = 1 });
            context.Timecards.Add(new Timecard() { Id = 6, Date = new DateTime(2020, 1, 13), Hours = 7.5m, TaskId = 1 });
            context.Timecards.Add(new Timecard() { Id = 7, Date = new DateTime(2020, 1, 14), Hours = 7.5m, TaskId = 1 });
            context.Timecards.Add(new Timecard() { Id = 8, Date = new DateTime(2020, 1, 15), Hours = 7.5m, TaskId = 1 });

            context.SaveChanges();

            var service = new TimecardService(context);
            var all = await service.GetAllByDateRange(new DateTime(2020,1,11),new DateTime(2020,1,14));
            all.ToList().ForEach(t => Console.WriteLine(t.Id));
            Assert.Equal(5, all.Count());
        }
    }
}
