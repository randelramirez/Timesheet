using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Timesheet.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        // GET: api/<TimesheetController>
        [HttpGet]
        public IEnumerable<Core.Task> Get()
        {
            var tasks = new List<Timesheet.Core.Task>();
            tasks.Add(new Core.Task() { Id = 1, Name = "Development" });
            tasks.Add(new Core.Task() { Id = 2, Name = "Testing" });
            tasks.Add(new Core.Task() { Id = 4, Name = "Daily Stand Up" });
            tasks.Add(new Core.Task() { Id = 5, Name = "Department Meeting" });
            tasks.Add(new Core.Task() { Id = 6, Name = "HR Training" });
            tasks.Add(new Core.Task() { Id = 7, Name = "Technical Training" });
            tasks.Add(new Core.Task() { Id = 8, Name = "Company Training" });
            tasks.Add(new Core.Task() { Id = 9, Name = "Admin(Email)" });
            tasks.Add(new Core.Task() { Id = 10, Name = "Sick Leave" });
            tasks.Add(new Core.Task() { Id = 11, Name = "Vacation Leave" });
            tasks.Add(new Core.Task() { Id = 12, Name = "Personal Time-off" });
            tasks.Add(new Core.Task() { Id = 13, Name = "Bug Fixing" });
            tasks.Add(new Core.Task() { Id = 14, Name = "Team meeting" });
            return tasks;
        }
    }
}
