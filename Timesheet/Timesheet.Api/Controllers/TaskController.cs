using Microsoft.AspNetCore.Mvc;
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
            this.service = service;
        }

        // GET: api/<TimesheetController>
        [HttpGet]
        public async Task<ActionResult<Core.Task[]>> Get()
        {
            var tasks = await this.service.GetAllAsync();
            return Ok(tasks.ToViewModels());
        }
    }
}
