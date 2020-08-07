using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Timesheet.Core;

namespace Timesheet.Api.ViewModels.Extensions
{
    public static class ViewModelToEntity
    {
        public static Timecard ToTimecardEntity(this TimecardViewModel viewModel) =>
             new Timecard() { Id = viewModel.Id, Date = viewModel.Date, Hours = viewModel.Hours, TaskId = viewModel.TaskId };

        public static Timecard ToTimecardEntity(this CreateTimecardViewModel viewModel) =>
             new Timecard() { Date = viewModel.Date, Hours = viewModel.Hours, TaskId = viewModel.TaskId };
        
        public static IEnumerable<Timecard> ToTimecardEntities(this IEnumerable<TimecardViewModel> viewModels) =>
             viewModels.Select(t => t.ToTimecardEntity());

        public static IEnumerable<Timecard> ToTimecardEntities(this IEnumerable<CreateTimecardViewModel> viewModels) =>
             viewModels.Select(t => t.ToTimecardEntity());
        
        public static Core.Task ToTaskEntity(this TaskViewModel viewModel) =>
             new Core.Task() { Id = viewModel.Id, Name = viewModel.Name };

    }
}
