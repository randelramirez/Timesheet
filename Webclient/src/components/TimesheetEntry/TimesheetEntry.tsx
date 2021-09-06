import React, { useCallback, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import { IEntry, ITask } from "../../containers/Timesheet/Timesheet";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";

export interface ITimesheetEntryProps {
  data: IEntry;
  taskOptions: ITask[];
  deleteHandler: (event: React.MouseEvent) => void;
  onChange: (value: IEntry) => void;
}

function TimesheetEntry({
  data,
  deleteHandler,
  taskOptions,
  onChange,
}: ITimesheetEntryProps) {
  const [dataValue, setDataValue] = useState(data);
  // const memoized = useCallback(() => onChange(dataValue), [
  //   dataValue,
  //   onChange,
  // ]);

  useEffect(() => {
    onChange(dataValue);
  }, [dataValue]);

  return (
    <div style={{ margin: "5px" }}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          label="Date"
          style={{ marginRight: "15px", height: "20px", marginTop: "-2px" }}
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          value={dataValue.date}
          onChange={(e) =>
            setDataValue({
              ...dataValue,
              date: new Date(e?.getFullYear()!, e?.getMonth()!, e?.getDate()),
            })
          }
          size="small"
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </MuiPickersUtilsProvider>
      <Autocomplete
        size="small"
        defaultValue={taskOptions.find((t) => t.id === data.taskId)}
        style={{
          width: 300,
          display: "inline-block",
          marginRight: "15px",
          marginTop: "5px",
        }}
        options={taskOptions}
        getOptionLabel={(option) => option.name}
        getOptionSelected={(option, value) => {
          // to prevent warning regarding invalid value
          return option.id === value.id && option.name === value.name;
        }}
        onChange={(_, value) =>
          setDataValue({ ...dataValue, taskId: value?.id! })
        }
        renderInput={(params) => (
          <TextField {...params} label="Task" variant="outlined" />
        )}
      />
      <TextField
        size="small"
        style={{ marginRight: "15px", height: "20px" }}
        label="Hours"
        type="number"
        inputProps={{ min: 0.5, step: 0.5 }}
        onChange={(e) =>
          setDataValue({ ...dataValue, hours: Number(e.target.value) })
        }
        value={dataValue.hours}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button
        style={{ marginRight: "15px", verticalAlign: "bottom" }}
        variant="contained"
        color="secondary"
        size="small"
        // className={classes.button}
        startIcon={<DeleteIcon />}
        onClick={deleteHandler}
      >
        Delete
      </Button>
    </div>
  );
}

export default TimesheetEntry;
