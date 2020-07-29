using System.Collections.Generic;
using System.Linq;

namespace Timesheet.Api.ViewModels.Extensions
{
    public static class TimecardViewModelHelper
    {
        public static TimecardViewModel ToViewModel(this Core.Timecard model)
        {
            return new TimecardViewModel
            {
                Id = model.Id,
                Date = model.Date,
                Hours = model.Hours,
                TaskId = model.TaskId
            };
        }

        public static CreateTimecardViewModel ToCreateViewModel(this Core.Timecard model)
        {
            return new CreateTimecardViewModel
            {
                Date = model.Date,
                Hours = model.Hours,
                TaskId = model.TaskId
            };
        }

        public static IEnumerable<TimecardViewModel> ToViewModels(this IEnumerable<Core.Timecard> model)
        {
            return model.Select(t => t.ToViewModel());
        }

        public static IEnumerable<CreateTimecardViewModel> ToCreateViewModels(this IEnumerable<Core.Timecard> model)
        {
            return model.Select(t => t.ToCreateViewModel());
        }
    }
}
