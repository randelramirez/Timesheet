using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Timesheet.Api.ViewModels
{
    public class CreateTimecardViewModel : IValidatableObject
    {
        [Required]
        public DateTime Date { get; set; }

        public int TaskId { get; set; }

        [Range(1,24,ErrorMessage = "A Task cannot be more than 24 hours 😥")]
        public decimal Hours { get; set; }

        /*
          Note:
          - Validate Method will not be executed once a validation error was already thrown by one of the data annotation atrribute
          - Attribute Validator/Data Annotations execute first before the Validate Method of IValidatableObject
          - If the attribute Validator/Data Annotations is applied on the class level, 
            property level annotations will execute first and if validation errors were thrown from the properties
            then the IsValid Method of the data annotation attribute will not be executed and only error messages 
            from the data annotations will be returned to the response
            Ex. for #3
            [TaskIdNotZeroAttribute]
            public class CreateTimecardViewModel (Validaton Atrribute has an IsValid Method)
        */
        /* 
            So if there are actually errors from the Validate method and 
            from the data annotations, only validation errors from data annotations are returned to the response
        */
        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (TaskId == 0 || TaskId < 0)
            {
                // yield return ensures validation is returned immediately
                yield return new ValidationResult("Task cannot have ID of 0 or ➖Negative", new[] { nameof(CreateTimecardViewModel) });
            }

            if (Hours == 0 || Hours < 0)
            {
                // yield return ensures validation is returned immediately
                yield return new ValidationResult("Hours cannot be 0 or  ➖Negative", new[] { nameof(CreateTimecardViewModel) });
            }
        }
    }
}
