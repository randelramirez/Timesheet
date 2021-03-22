import React from 'react';
import { entry } from '../../containers/Timesheet/Timesheet';
import AnimationContainer from '../../containers/AnimationContainer/AnimationContainer';
import TimesheetEntry from '../TimesheetEntry/TimesheetEntry';

export type TimesheetEntriesProps = {
  entries: entry[];
  taskOptions: any;
  deleteHandler: any;
  dateChangeHandler: any;
  hoursChangeHandler: any;
  taskCodeChangeHandler: any;
};

export default function TimesheetEntries({entries, taskOptions, deleteHandler, hoursChangeHandler, taskCodeChangeHandler, dateChangeHandler}: TimesheetEntriesProps) {
  const controls: JSX.Element[] = entries.map(
    (entry: entry, index: number) => {
      return (
        <AnimationContainer key={entry.id}>
          <TimesheetEntry
            taskOptions={taskOptions || []}
            deleteHandler={(event) => {
              deleteHandler(event, entry.id.toString());
            }}
            data={entry}
            dateChangeHandler={(date: Date) =>
              dateChangeHandler(date, entry.id)
            }
            hoursChangeHandler={(event) =>
              hoursChangeHandler(event, entry.id)
            }
            taskCodeChangeHandler={(event, value) =>
              taskCodeChangeHandler(event, value, entry.id)
            }
          />
        </AnimationContainer>
      );
    }
  );

  // A component can only return 1 parent container, we use Fragrament to circumvent that
  return <React.Fragment>{controls}</React.Fragment>;
}