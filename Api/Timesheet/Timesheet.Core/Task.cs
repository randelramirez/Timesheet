using System;
using System.Collections.Generic;
using System.Text;

namespace Timesheet.Core
{
    public class Task
    {
        public Task()
        {
            this.Timecards = new List<Timecard>();
        }

        public int Id { get; set; }


        public string Name { get; set; }

        public ICollection<Timecard> Timecards { get; set; }
    }
}
