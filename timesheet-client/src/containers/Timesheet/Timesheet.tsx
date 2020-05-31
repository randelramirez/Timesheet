import React, { useState, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import TimesheetEntry from '../../components/TimesheetEntry/TimesheetEntry';
import { v4 as uuid } from 'uuid';

export type entry = {
  id: string;
  taskcode: string;
  hours: number;
  date: Date;
};

type TimesheetProps = {};

function Timesheet(props: TimesheetProps) {
  const [entries, setEntries] = useState([
    { id: uuid(), date: new Date(), taskcode: '', hours: 0 },
  ]);

  function addHandler(event: React.MouseEvent) {
    event.preventDefault();
    let updatedEntries = [
      ...entries,
      { id: uuid(), date: new Date(), taskcode: '', hours: 0 },
    ];
    setEntries(updatedEntries);
  }

  function deleteHandler(event: React.MouseEvent, entryId: string) {
    event.preventDefault();
    let updatedEntries = [...entries];

    updatedEntries = updatedEntries.filter((entry, i) => entry.id !== entryId);
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
      <CSSTransition key={entry.id} timeout={500} classNames="timesheet-entry">
        <TimesheetEntry
          deleteHandler={(event) => {
            deleteHandler(event, entry.id.toString());
          }}
          data={entry}
          taskCodeChangeHandler={(event) => taskCodeChangeHandler(event, index)}
        />
      </CSSTransition>
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
        <TransitionGroup className="timesheet">{controls}</TransitionGroup>
        <button onClick={saveHandler} type="button">
          Save
        </button>
      </form>
    </div>
  );
}

export default Timesheet;
