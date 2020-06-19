import React, { useState, useEffect } from 'react';
import { TransitionGroup } from 'react-transition-group';
import TimesheetEntry from '../../components/TimesheetEntry/TimesheetEntry';
import { v4 as uuid } from 'uuid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import AnimationContainer from '../AnimationContainer/AnimationContainer';
import axios from 'axios';
import { getTask } from '../../apiUtility';
import IsAuthenticated from '../IsAuthenticated/IsAuthenticated';
import Navigation from '../Navigation/Navigation';
import SavedNotification from '../../components/UI/Notification/SavedNotification';

export type entry = {
  id: string;
  taskcode: string;
  hours: number;
  date: Date;
};

export type task = {
  id: number;
  name: string;
};

type TimesheetProps = {};

function Timesheet(props: TimesheetProps) {
  const [entries, setEntries] = useState([
    {
      id: uuid(),
      date: new Date(),
      taskcode: '',
      hours: 0,
    },
  ]);

  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [taskOptions, setTaskOptions] = useState<task[] | null>(null);

  useEffect(() => {
    axios
      .get(getTask)
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
        taskcode: '',
        hours: 0,
      },
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

  function dateChangeHandler(date: Date, entryId: string) {
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
  }

  // Refactor does not need to iterate on all entries for updating
  function taskCodeChangeHandler(
    event: React.ChangeEvent<{}>,
    task: task,
    entryId: string
  ): void {
    console.log('value-taskCodeChangeHandler', task);
    let updatedEntries = [...entries];
    let updatedEntry = {
      ...entries.filter((entry, index) => {
        return entry.id === entryId;
      })[0],
    };
    updatedEntry.taskcode = task.name; // use id when saving to database
    updatedEntries = updatedEntries.map((entry, index) => {
      if (entry.id === entryId) {
        entry = updatedEntry;
      }
      return entry;
    });
    setEntries(updatedEntries);
  }

  // Refactor does not need to iterate on all entries for updating
  function hoursChangeHandler(
    event: React.ChangeEvent<HTMLInputElement>,
    entryId: string
  ) {
    let updatedEntry = {
      ...entries.filter((entry) => entry.id === entryId)[0],
    };
    updatedEntry.hours = +event.target.value;

    let updatedEntries = [...entries];
    updatedEntries = updatedEntries.map((entry) => {
      if (entry.id === entryId) {
        entry = updatedEntry;
      }
      return entry;
    });
    setEntries(updatedEntries);
  }

  function saveHandler(event: React.MouseEvent) {
    event.preventDefault();
    setIsSnackBarOpen(true);
    console.table(entries);
  }

  function snackBarCloseHandler(event?: React.SyntheticEvent, reason?: string) {
    console.log(reason);
    // we received a default value of 'clickaway'
    if (reason === 'clickaway') {
      return;
    } //else reason = timeout, close the snackbar

    setIsSnackBarOpen(false);
  }

  const controls: JSX.Element[] = entries.map((entry: entry, index: number) => {
    return (
      <AnimationContainer key={entry.id}>
        <TimesheetEntry
          taskOptions={taskOptions || []}
          deleteHandler={(event) => {
            deleteHandler(event, entry.id.toString());
          }}
          data={entry}
          dateChangeHandler={(date: Date) => dateChangeHandler(date, entry.id)}
          hoursChangeHandler={(event) => hoursChangeHandler(event, entry.id)}
          taskCodeChangeHandler={(event, value) =>
            taskCodeChangeHandler(event, value, entry.id)
          }
        />
      </AnimationContainer>
    );
  });

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
            <TransitionGroup className="timesheet">{controls}</TransitionGroup>
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
        {/* <Snackbar
          autoHideDuration={3000}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isSnackBarOpen}
          onClose={snackBarCloseHandler}
          key={'Saved'}
        >
          <MuiAlert elevation={6} children="Saved" variant="filled" />
        </Snackbar> */}
      </div>
    </React.Fragment>
  );
}

export default Timesheet;
