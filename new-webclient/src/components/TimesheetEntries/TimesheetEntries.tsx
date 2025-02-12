import React from "react";
import { IEntry } from "../../containers/Timesheet/Timesheet";
import AnimationContainer from "../../containers/AnimationContainer/AnimationContainer";
import TimesheetEntry from "../TimesheetEntry/TimesheetEntry";

export interface ITimesheetEntriesProps {
  entries: IEntry[];
  taskOptions: any;
  onChange: any;
  deleteHandler: any;
}

export default function TimesheetEntries({
  entries,
  taskOptions,
  onChange,
  deleteHandler,
}: ITimesheetEntriesProps) {
  const controls: JSX.Element[] = entries.map(
    (entry: IEntry, index: number) => {
      return (
        <AnimationContainer key={entry.id}>
          <TimesheetEntry
            data={entry}
            taskOptions={taskOptions || []}
            deleteHandler={deleteHandler}
          />
        </AnimationContainer>
      );
    }
  );

  // A component can only return 1 parent container, we use Fragrament to circumvent that
  return <React.Fragment>{controls}</React.Fragment>;
}
