using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Timesheet.Api.Services;
using Timesheet.Api.ViewModels;
using Timesheet.Api.ViewModels.Extensions;
using Timesheet.Core;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Timesheet.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TimesheetController : ControllerBase
    {
        private readonly LinkGenerator linkGenerator;
        private readonly TimecardService service;

        public TimesheetController(LinkGenerator linkGenerator, TimecardService service)
        {
            this.linkGenerator = linkGenerator;
            this.service = service;
        }

        // GET: api/<TimesheetController>

        [HttpGet] // the actions are the actual endpoints
        public async Task<ActionResult<Timesheet.Core.Timecard[]>> Get()
        {
            try
            {
                var timecards = await this.service.GetAllAsync();
                return Ok(timecards.Select(t => new TimecardViewModel { Id =  t.Id, Date = t.Date, Hours = t.Hours, TaskId = t.TaskId }));
            }
            catch (Exception)
            {
                //requestResult = this.StatusCode(StatusCodes.Status500InternalServerError, "Database failure");
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Database failure");
            }
        }

        // GET api/<TimesheetController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<TimesheetController>
        [HttpPost]
        public async Task<ActionResult<Core.Timecard>> Post([FromBody] IEnumerable<TimecardViewModel> timecards)
        {
            var timecardModels = timecards.ToTimecardEntities().ToList();
            var url = this.linkGenerator.GetPathByAction(HttpContext, "Get", values: new { timecards = timecardModels });
            await this.service.Add(timecardModels);
            return Created(url, timecardModels);
        }

        // PUT api/<TimesheetController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<TimesheetController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
