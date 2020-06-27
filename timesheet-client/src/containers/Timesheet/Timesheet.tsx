import React, { useState, useEffect } from 'react';
import { TransitionGroup } from 'react-transition-group';
import { v4 as uuid } from 'uuid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import axios from 'axios';
import { task, timecard } from '../../apiUtility';
import IsAuthenticated from '../IsAuthenticated/IsAuthenticated';
import Navigation from '../Navigation/Navigation';
import SavedNotification from '../../components/UI/Notification/SavedNotification';
import TimesheetEntries from '../../components/TimesheetEntries/TimesheetEntries';

export type entry = {
  id: string | number;
  taskId: number;
  hours: number;
  date: Date;
};

export type task = {
  id: number;
  name: string;
};

type TimesheetProps = {};

const Timesheet: React.FC = (props: TimesheetProps) => {
  const [entries, setEntries] = useState<entry[]>([
    {
      id: uuid(),
      date: new Date(),
      taskId: 0,
      hours: 0,
    },
  ]);

  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [taskOptions, setTaskOptions] = useState<task[] | null>(null);

  useEffect(() => {
    axios
      .get(task)
      .then((response) => {
        setTaskOptions(response.data as task[]);
      })
      .catch((error) => {
        console.error('error', error);
      });
  }, []);

  function addHandler(event: React.MouseEvent) {
    event.preventDefault();
    let updatedEntries = [
      ...entries,
      {
        id: uuid(),
        date: new Date(),
        taskId: 0,
        hours: 0,
      },
    ];
    setEntries(updatedEntries);
  }

  const deleteHandler = (event: React.MouseEvent, entryId: string) => {
    event.preventDefault();
    let updatedEntries = [...entries];

    updatedEntries = updatedEntries.filter((entry, i) => entry.id !== entryId);
    console.log(updatedEntries);
    setEntries(updatedEntries);
  };

  const dateChangeHandler = (date: Date, entryId: string): Date => {
    let updatedEntries = [...entries];
    let updatedEntry = {
      ...entries.filter((entry, index) => {
        return entry.id === entryId;
      })[0],
    };
    updatedEntry.date = date;
    updatedEntries = updatedEntries.map((entry, index) => {
      if (entry.id === entryId) {
        entry = updatedEntry;
      }
      return entry;
    });
    setEntries(updatedEntries);
    return updatedEntry.date;
  };

  // Refactor does not need to iterate on all entries for updating
  const taskCodeChangeHandler = (
    event: React.ChangeEvent<{}>,
    task: task,
    entryId: string
  ) => {
    console.log('value-taskCodeChangeHandler', task);

    const updatedEntries = entries.map((entry) => {
      if (entry.id === entryId) {
        const updatedItem = {
          ...entry,
          taskId: task.id,
        };

        return updatedItem;
      }
      // else return entry
      return entry;
    });

    setEntries(updatedEntries);
  };

  // Refactor does not need to iterate on all entries for updating
  const hoursChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    entryId: string
  ) => {
    const updatedEntries = entries.map((entry) => {
      if (entry.id === entryId) {
        const updatedItem = {
          ...entry,
          hours: +event.target.value,
        };

        return updatedItem;
      }
      // else return entry
      return entry;
    });

    setEntries(updatedEntries);
  };

  const saveHandler = (event: React.MouseEvent): void => {
    event.preventDefault();

    let entriesToSave: entry[] = entries.map((entry) => {
      return {
        id: 0,
        taskId: entry.taskId,
        hours: entry.hours,
        date: entry.date,
      };
    });

    axios
      .post(timecard, entriesToSave, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setIsSnackBarOpen(true);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  const snackBarCloseHandler = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    console.log(reason);
    // we received a default value of 'clickaway'
    if (reason === 'clickaway') {
      return;
    } //else reason = timeout, close the snackbar

    setIsSnackBarOpen(false);
  };

  return (
    <React.Fragment>
      <IsAuthenticated
        currentUser={{ userId: 100, username: 'gem' }}
        isLoggedinRender={<Navigation />}
        isLoggedoutRender={<div>logged out</div>}
      />
      <div style={{ textAlign: 'center', width: '80%', margin: 'auto' }}>
        <Button
          style={{ position: 'relative', right: '-400px', marginTop: '10px' }}
          variant="contained"
          color="secondary"
          size="small"
          // className={classes.button}
          startIcon={<AddIcon />}
          onClick={addHandler}
        >
          Add
        </Button>
        <form>
          <fieldset>
            <legend>Timesheet</legend>
            {/*use css for styling, remove br */}
            <br />
            <br />
            <br />

            <TransitionGroup className="timesheet">
              <TimesheetEntries
                entries={entries}
                taskOptions={taskOptions}
                deleteHandler={deleteHandler}
                dateChangeHandler={dateChangeHandler}
                hoursChangeHandler={hoursChangeHandler}
                taskCodeChangeHandler={taskCodeChangeHandler}
              />
            </TransitionGroup>
            <Button
              style={{
                position: 'relative',
                right: '-400px',
                marginTop: '10px',
              }}
              variant="contained"
              color="secondary"
              size="small"
              // className={classes.button}
              startIcon={<SaveIcon />}
              onClick={saveHandler}
            >
              Save
            </Button>
          </fieldset>
        </form>

        <SavedNotification
          duration={3000}
          notificationKey={'Saved'}
          open={isSnackBarOpen}
          message="Timesheet was saved ☺"
          onClose={snackBarCloseHandler}
        />
      </div>
    </React.Fragment>
  );
};

export default Timesheet;
