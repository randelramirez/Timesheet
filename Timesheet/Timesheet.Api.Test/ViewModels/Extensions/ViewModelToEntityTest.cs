using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Timesheet.Api.ViewModels;
using Timesheet.Api.ViewModels.Extensions;
using Timesheet.Core;
using Timesheet.Infrastructure.Persistence;
using Xunit;

namespace Timesheet.Api.Test.ViewModels.Extensions
{ 
    public class ViewModelToEntityTest
    {
        [Fact]
        public void TimecardViewModel_ConvertToModel_CorrectDataConverted()
        {
            var expected = new Timecard() { Id = 1, Date = new DateTime(2020,6,25), Hours = 7.5m, TaskId = 2  };
            var viewmodel = new TimecardViewModel() { Id = 1, Date = new DateTime(2020, 6, 25), Hours = 7.5m, TaskId = 2 };
            Assert.Equal(expected.Id,viewmodel.ToTimecardEntity().Id);
            Assert.Equal(expected.TaskId, viewmodel.ToTimecardEntity().TaskId);
            Assert.Equal(expected.Hours, viewmodel.ToTimecardEntity().Hours);

        }
    }
}
