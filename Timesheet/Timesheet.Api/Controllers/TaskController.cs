using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Timesheet.Api.Services;

namespace Timesheet.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly TaskService service;

        public TaskController(TaskService service)
        {
            this.service = service;
        }

        // GET: api/<TimesheetController>
        [HttpGet]
        public async Task<ActionResult<Core.Task[]>> Get()
        {
            var tasks = await this.service.GetAllAsync();
         
            return Ok(tasks);
        }
    }
}
