using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Timesheet.Api.ViewModels
{
    public class CreateTimecardViewModel
    {
        public DateTime Date { get; set; }

        public int TaskId { get; set; }

        public decimal Hours { get; set; }
    }
}
