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
    public class TaskServiceTest
    {
        [Fact]
        public async System.Threading.Tasks.Task GetAll_ReturnsAllData()
        {
            var options = new DbContextOptionsBuilder<TimesheetContext>()
                .UseInMemoryDatabase(databaseName: "Timesheet").Options;

            // Insert seed data into the database using one instance of the context
            var context = new TimesheetContext(options);

            context.Tasks.Add(new Task() { Name = "Test1" });
            context.Tasks.Add(new Task() { Name = "Test2" });
            context.Tasks.Add(new Task() { Name = "Test3" });
            context.SaveChanges();

            var service = new TaskService(context);
            var all = await service.GetAllAsync();
            Assert.Equal(3, all.Count());
        }
    }
}
