import React, { useState, useEffect, MouseEventHandler } from "react";
import { TransitionGroup } from "react-transition-group";
import { v4 as uuid } from "uuid";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";
import axios from "axios";
import { task, timecard } from "../../apiUtility";
import IsAuthenticated from "../IsAuthenticated/IsAuthenticated";
import Navigation from "../Navigation/Navigation";
import SavedNotification from "../../components/UI/Notification/SavedNotification";
import TimesheetEntries from "../../components/TimesheetEntries/TimesheetEntries";
import { Http2ServerRequest } from "http2";

export interface IEntry {
  id: string | number;
  taskId: number;
  hours: number;
  date: Date;
}

export interface ITask {
  id: number;
  name: string;
}

interface ITimesheetProps {}

function Timesheet(props: ITimesheetProps) {
  const [entries, setEntries] = useState<IEntry[]>([
    {
      id: uuid(),
      date: new Date(),
      taskId: 0,
      hours: 0,
    },
  ]);

  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [taskOptions, setTaskOptions] = useState<ITask[] | null>(null);

  useEffect(() => {
    axios
      .get(task, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("response", response.data);
        setTaskOptions(response.data as ITask[]);
      })
      .catch((error) => {
        console.error("error", error);
      });
  }, []);

  function addHandler(event: React.SyntheticEvent<HTMLButtonElement>) {
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

  function deleteHandler(event: React.MouseEvent, entryId: string) {
    // event.preventDefault();
    let updatedEntries = [...entries];

    updatedEntries = updatedEntries.filter((entry, i) => entry.id !== entryId);
    console.log(updatedEntries);
    setEntries(updatedEntries);
  }

  function updateEntries(entryToUpdate: IEntry) {
    // get all entries that is not equal to the entry to be updated

    const oldEntries = entries.filter((e) => e.id !== entryToUpdate.id);
    const updatedEntries = [...oldEntries, entryToUpdate];
    setEntries(updatedEntries);
  }

  function saveHandler(event: React.MouseEvent) {
    event.preventDefault();

    let entriesToSave: IEntry[] = entries.map((entry) => {
      return {
        id: 0,
        taskId: entry.taskId,
        hours: entry.hours,
        date: entry.date,
      };
    });

    console.log("entries to save", entriesToSave);

    // axios
    //   .post(timecard, entriesToSave, {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   })
    //   .then((response) => {
    //     setIsSnackBarOpen(true);
    //   })
    //   .catch((error) => {
    //     console.log("error", error);
    //   });
  }

  function snackBarCloseHandler(event?: React.SyntheticEvent, reason?: string) {
    console.log(reason);
    // we received a default value of 'clickaway'
    if (reason === "clickaway") {
      return;
    } //else reason = timeout, close the snackbar

    setIsSnackBarOpen(false);
  }

  return (
    <React.Fragment>
      <IsAuthenticated
        currentUser={{ userId: 100, username: "gem" }}
        isLoggedinRender={<Navigation />}
        isLoggedoutRender={<div>logged out</div>}
      />
      <div
        style={{
          textAlign: "center",
          width: "80%",
          margin: "auto",
          backgroundColor: "lightcyan",
          boxShadow: "2px 2px 2px 2px rgba(0, 0, 0, 0.5)",
          borderRadius: "10px",
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          size="small"
          // className={classes.button}
          startIcon={<AddIcon />}
          onClick={addHandler}
        >
          Add
        </Button>
        <form style={{ padding: "10px" }}>
          <fieldset
            style={{
              borderRadius: "10px",
              boxShadow: "2px 2px 2px 2px rgba(0, 0, 0, 0.5)",
            }}
          >
            <legend>Timesheet</legend>
            {/*use css for styling, remove br */}
            <br />
            <br />
            <br />

            {/* <TransitionGroup className="timesheet"> */}
            <TimesheetEntries
              entries={entries}
              taskOptions={taskOptions}
              deleteHandler={deleteHandler}
              onChange={(entry: IEntry) => {
                console.log("updated entry", entry);
                updateEntries(entry);
              }}
            />
            {/* </TransitionGroup> */}
            <Button
              style={{
                position: "relative",
                right: "-400px",
                marginTop: "10px",
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
          notificationKey={"Saved"}
          open={isSnackBarOpen}
          message="Timesheet was saved ☺"
          onClose={snackBarCloseHandler}
        />
      </div>
    </React.Fragment>
  );
}

export default Timesheet;
