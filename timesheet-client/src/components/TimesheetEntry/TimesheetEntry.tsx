import React from 'react';
import { entry } from '../../containers/Timesheet/Timesheet';

export type TimesheetEntryProps = {
  data: entry;
  deleteHandler: (event: React.MouseEvent) => void;
  taskCodeChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function TimesheetEntry(props: TimesheetEntryProps) {
  return (
    <div>
      <label htmlFor="Date">Date</label>
      <input type="date" name="date" />
      <label htmlFor="taskcode">Task Code</label>
      <input
        type="text"
        name="taskcode"
        onChange={props.taskCodeChangeHandler}
        value={props.data.taskcode}
      />
      <label htmlFor="hours">Hours</label>
      <input type="number" step="0.50" name="hours" />
      <button onClick={props.deleteHandler} type="button">
        <span role="img" aria-label="delete">
          ❌
        </span>
      </button>
    </div>
  );
}

export default TimesheetEntry;
