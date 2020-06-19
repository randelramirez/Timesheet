import React from 'react';
import { entry } from '../../containers/Timesheet/Timesheet';

export type TimesheetEntriesProps = {
  entries: entry[];
  taskOptions: any;
};

function TimesheetEntries(props: TimesheetEntriesProps) {
  // function dateChangeHandler(date: Date, entryId: string) {
  //   let updatedEntries = [...props.entries];
  //   let updatedEntry = {
  //     ...props.entries.filter((entry, index) => {
  //       return entry.id === entryId;
  //     })[0],
  //   };
  //   updatedEntry.date = date;
  //   updatedEntries = updatedEntries.map((entry, index) => {
  //     if (entry.id === entryId) {
  //       entry = updatedEntry;
  //     }
  //     return entry;
  //   });
  //   setEntries(updatedEntries);
  //   return updatedEntry.date;
  // }

  // // Refactor does not need to iterate on all entries for updating
  // function taskCodeChangeHandler(
  //   event: React.ChangeEvent<{}>,
  //   task: task,
  //   entryId: string
  // ): void {
  //   console.log('value-taskCodeChangeHandler', task);
  //   let updatedEntries = [...entries];
  //   let updatedEntry = {
  //     ...entries.filter((entry, index) => {
  //       return entry.id === entryId;
  //     })[0],
  //   };
  //   updatedEntry.taskcode = task.name; // use id when saving to database
  //   updatedEntries = updatedEntries.map((entry, index) => {
  //     if (entry.id === entryId) {
  //       entry = updatedEntry;
  //     }
  //     return entry;
  //   });
  //   setEntries(updatedEntries);
  // }

  // // Refactor does not need to iterate on all entries for updating
  // function hoursChangeHandler(
  //   event: React.ChangeEvent<HTMLInputElement>,
  //   entryId: string
  // ) {
  //   let updatedEntry = {
  //     ...entries.filter((entry) => entry.id === entryId)[0],
  //   };
  //   updatedEntry.hours = +event.target.value;

  //   let updatedEntries = [...entries];
  //   updatedEntries = updatedEntries.map((entry) => {
  //     if (entry.id === entryId) {
  //       entry = updatedEntry;
  //     }
  //     return entry;
  //   });
  //   setEntries(updatedEntries);
  // }

  // function deleteHandler(event: React.MouseEvent, entryId: string) {
  //   event.preventDefault();
  //   let updatedEntries = [...props.entries];

  //   updatedEntries = updatedEntries.filter((entry, i) => entry.id !== entryId);
  //   console.log(updatedEntries);
  //   setEntries(updatedEntries);
  // }

  // const controls: JSX.Element[] = props.entries.map(
  //   (entry: entry, index: number) => {
  //     return (
  //       <EntryContainer key={entry.id}>
  //         <TimesheetEntry
  //           taskOptions={props.taskOptions || []}
  //           deleteHandler={(event) => {
  //             deleteHandler(event, entry.id.toString());
  //           }}
  //           data={entry}
  //           dateChangeHandler={(date: Date) =>
  //             dateChangeHandler(date, entry.id)
  //           }
  //           hoursChangeHandler={(event) =>
  //             hoursChangeHandler(event, entry.id)
  //           }
  //           taskCodeChangeHandler={(event, value) =>
  //             taskCodeChangeHandler(event, value, entry.id)
  //           }
  //         />
  //       </EntryContainer>
  //     );
  //   }
  // );

  return <div>{}</div>;
}

export default TimesheetEntries;
