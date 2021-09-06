using System;

namespace Timesheet.Api.ViewModels
{
    public class TimecardViewModel
    {
        public int Id { get; set; }

        public DateTime Date { get; set; }

        public int TaskId { get; set; }

        public decimal Hours { get; set; }
    }
}
