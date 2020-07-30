using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Timesheet.Api.ViewModels
{
    public class UpdateTaskViewModel
    {
        [Required]
        public string Name { get; set; }
    }
}
