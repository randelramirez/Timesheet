using System.Collections.Generic;
using System.Linq;

namespace Timesheet.Api.ViewModels.Extensions
{
    public static class TaskViewModelHelper
    {
        public static TaskViewModel ToViewModel(this Core.Task model) =>
             new TaskViewModel() { Id = model.Id, Name = model.Name };
        

        public static IEnumerable<TaskViewModel> ToViewModels(this IEnumerable<Core.Task> model)
            => model.Select(t => t.ToViewModel());
        
    }
}
