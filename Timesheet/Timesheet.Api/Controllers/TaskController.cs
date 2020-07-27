using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Timesheet.Api.Services;
using Timesheet.Api.ViewModels.Extensions;

namespace Timesheet.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly TaskService service;

        public TaskController(TaskService service)
        {
            this.service = service ?? throw new ArgumentNullException();
        }

        // GET: api/<TimesheetController>
        [HttpGet]
        [HttpHead]
        public async Task<ActionResult<Core.Task[]>> Get()
        {
            var tasks = await this.service.GetAllAsync();
            return Ok(tasks.ToViewModels());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Core.Task[]>> Get(int id)
        {
            var task = await this.service.GetAsync(id);
            if(task != null)
            {
                return Ok(task);
            }

            return NotFound();
        }
    }
}
