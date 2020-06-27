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

const TimesheetEntries: React.FC<TimesheetEntriesProps> = (
  props: TimesheetEntriesProps
) => {
  const controls: JSX.Element[] = props.entries.map(
    (entry: entry, index: number) => {
      return (
        <AnimationContainer key={entry.id}>
          <TimesheetEntry
            taskOptions={props.taskOptions || []}
            deleteHandler={(event) => {
              props.deleteHandler(event, entry.id.toString());
            }}
            data={entry}
            dateChangeHandler={(date: Date) =>
              props.dateChangeHandler(date, entry.id)
            }
            hoursChangeHandler={(event) =>
              props.hoursChangeHandler(event, entry.id)
            }
            taskCodeChangeHandler={(event, value) =>
              props.taskCodeChangeHandler(event, value, entry.id)
            }
          />
        </AnimationContainer>
      );
    }
  );

  // A component can only return 1 parent container, we use Fragrament to circumvent that
  return <React.Fragment>{controls}</React.Fragment>;
};

export default TimesheetEntries;
