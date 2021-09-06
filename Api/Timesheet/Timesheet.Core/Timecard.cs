using System;
using System.Collections.Generic;
using System.Text;

namespace Timesheet.Core
{
    public class Timecard
    {
        public int Id { get; set; }

        public DateTime Date { get; set; }

        public int TaskId { get; set; }

        public decimal Hours { get; set; }

        public Task Task { get; set; }
    }
}
