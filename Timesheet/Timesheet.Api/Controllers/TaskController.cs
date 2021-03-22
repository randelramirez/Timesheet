using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using System;
using System.Threading.Tasks;
using Timesheet.Api.Services;
using Timesheet.Api.ViewModels;
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

        [HttpPost]
        public async Task<ActionResult<Core.Task[]>> Post(Core.Task model)
        {
            model.Id = 0;
           
            await this.service.Add(model);
            return CreatedAtRoute(nameof(TaskController.Get), new { id = model.Id });
        }

        [HttpPut]
        public async Task<ActionResult<Core.Task[]>> Put(Core.Task model)
        {
            model.Id = 0;

            await this.service.Add(model);
            return NoContent();
        }

        [HttpPatch]
        public ActionResult<Core.Task[]> Patch(JsonPatchDocument<UpdateTaskViewModel> patchDocument)
        {
            //model.Id = 0;

            //await this.service.Add(model);
            //return CreatedAtRoute(nameof(TaskController.Get), new { id = model.Id });
            var model = new UpdateTaskViewModel();
            patchDocument.ApplyTo(model,ModelState);

            if(!TryValidateModel(model))
            {
                return ValidationProblem(ModelState);
            }

            return NoContent();
        }

        public override ActionResult ValidationProblem([ActionResultObjectValue] ModelStateDictionary modelStateDictionary)
        {
            // So we don't need to write a logic, we get the same logic/code from Startup.cs ApiBehaviorOptions
            var options = HttpContext.RequestServices.GetRequiredService<IOptions<ApiBehaviorOptions>>();
            return (options.Value.InvalidModelStateResponseFactory(this.ControllerContext) as ActionResult);
        }
    }
}
