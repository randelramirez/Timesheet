using System;
using System.Collections.Generic;
using Timesheet.Core;
using Timesheet.Infrastructure.Persistence;

namespace Timesheet.Infrastructure.Helpers
{
    public class DataInitializer
    {
        private readonly TimesheetContext context;

        public DataInitializer(TimesheetContext context)
        {
            this.context = context;
        }

        public void SeedTasks()
        {
            var tasks = new List<Core.Task>();
            tasks.Add(new Core.Task() { Name = "Development" });
            tasks.Add(new Core.Task() { Name = "Testing" });
            tasks.Add(new Core.Task() { Name = "Daily Stand Up" });
            tasks.Add(new Core.Task() { Name = "Department Meeting" });
            tasks.Add(new Core.Task() { Name = "HR Training" });
            tasks.Add(new Core.Task() { Name = "Technical Training" });
            tasks.Add(new Core.Task() { Name = "Company Training" });
            tasks.Add(new Core.Task() { Name = "Admin(Email)" });
            tasks.Add(new Core.Task() { Name = "Sick Leave" });
            tasks.Add(new Core.Task() { Name = "Vacation Leave" });
            tasks.Add(new Core.Task() { Name = "Personal Time-off" });
            tasks.Add(new Core.Task() { Name = "Bug Fixing" });
            tasks.Add(new Core.Task() { Name = "Team meeting" });
            this.context.AddRange(tasks);
            this.context.SaveChanges();
        }

        public void SeedTimesheets()
        {
            var timesheets = new List<Timecard>();
            timesheets.Add(new Timecard { Date = DateTime.Now, Hours = 7.5m, TaskId = 1 });
            timesheets.Add(new Timecard { Date = DateTime.Now, Hours = .5m, TaskId = 3 });
            timesheets.Add(new Timecard { Date = DateTime.Now, Hours = 1.5m, TaskId = 5 });
            timesheets.Add(new Timecard { Date = DateTime.Now.AddDays(-1), Hours = 8.0m, TaskId = 10 });
            timesheets.Add(new Timecard { Date = DateTime.Now.AddDays(-2), Hours = 2.5m, TaskId = 13 });
            timesheets.Add(new Timecard { Date = DateTime.Now.AddDays(-2), Hours = 7.5m, TaskId = 1 });
            timesheets.Add(new Timecard { Date = DateTime.Now.AddDays(-2), Hours = .5m, TaskId = 8 });
            timesheets.Add(new Timecard { Date = DateTime.Now.AddDays(-2), Hours = .5m, TaskId = 3 });
            this.context.AddRange(timesheets);
            this.context.SaveChanges();
        }
    }
}
