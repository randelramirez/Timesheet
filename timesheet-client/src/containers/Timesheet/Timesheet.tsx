import React, { useState } from 'react';
import TimesheetEntry from '../../components/TimesheetEntry/TimesheetEntry';

export type entry = {
  id: number;
  taskcode: string;
  hours: number;
  date: Date;
};

type TimesheetProps = {};

function Timesheet(props: TimesheetProps) {
  const [entries, setEntries] = useState([
    { id: 0, date: new Date(), taskcode: '', hours: 0 },
  ]);

  function addHandler(event: React.MouseEvent) {
    event.preventDefault();
    let updatedEntries = [
      ...entries,
      { id: 0, date: new Date(), taskcode: '', hours: 0 },
    ];
    setEntries(updatedEntries);
  }

  function deleteHandler(event: React.MouseEvent, indexToRemove: number) {
    event.preventDefault();
    let updatedEntries = [...entries];

    updatedEntries.filter(function (_, i) {
      return i !== indexToRemove;
    });
    updatedEntries = updatedEntries.filter((_, i) => i !== indexToRemove);
    console.log(updatedEntries);
    setEntries(updatedEntries);
  }

  function taskCodeChangeHandler(
    event: React.ChangeEvent<HTMLInputElement>,
    indexOfEntry: number
  ): void {
    let updatedEntries = [...entries];
    let updatedEntry = entries.filter((_, index) => {
      return index === indexOfEntry;
    })[0];
    updatedEntry.taskcode = event.target.value;
    updatedEntries = updatedEntries.map((entry, index) => {
      if (index === indexOfEntry) {
        entry = updatedEntry;
      }
      return entry;
    });
    setEntries(updatedEntries);
  }

  function saveHandler(event: React.MouseEvent) {
    event.preventDefault();
    alert('Saved!');
    console.table('entries', entries);
  }

  const controls: JSX.Element[] = entries.map((entry: entry, index: number) => {
    return (
      <TimesheetEntry
        key={index}
        deleteHandler={(event) => {
          deleteHandler(event, index);
        }}
        data={entry}
        taskCodeChangeHandler={(event) => taskCodeChangeHandler(event, index)}
      />
    );
  });

  return (
    <div>
      <button type="button" onClick={addHandler}>
        <span role="img" aria-label="add">
          ➕
        </span>
      </button>
      <form>
        {controls}
        <button onClick={saveHandler} type="button">
          Save
        </button>
      </form>
    </div>
  );
}

export default Timesheet;
