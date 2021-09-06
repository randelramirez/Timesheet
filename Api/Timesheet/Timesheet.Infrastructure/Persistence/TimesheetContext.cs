using Microsoft.EntityFrameworkCore;
using Timesheet.Core;

namespace Timesheet.Infrastructure.Persistence
{
    public class TimesheetContext : DbContext
    {
        public DbSet<Timecard> Timecards { get; set; }

        public DbSet<Task> Tasks { get; set; }

        public TimesheetContext(DbContextOptions<TimesheetContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Timecard>().HasKey(tc => tc.Id);
            modelBuilder.Entity<Timecard>().Property(p => p.Hours).HasColumnType("decimal(18,1)");

            modelBuilder.Entity<Task>().HasKey(t => t.Id);

            // Timecard and Task Relationship
            modelBuilder.Entity<Timecard>().HasOne(t => t.Task)
                .WithMany(t => t.Timecards)
                .HasForeignKey(tc => tc.TaskId);

        }
    }
}
