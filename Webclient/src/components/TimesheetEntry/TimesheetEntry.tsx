import React from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { entry, task } from '../../containers/Timesheet/Timesheet';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

export type TimesheetEntryProps = {
  data: entry;
  taskOptions: task[];
  deleteHandler: (event: React.MouseEvent) => void;
  dateChangeHandler: (date: any) => any;
  taskCodeChangeHandler: (event: React.ChangeEvent<{}>, value: any) => void;
  hoursChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function TimesheetEntry(props: TimesheetEntryProps) {
  return (
    <div style={{ margin: '5px' }}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          label="Date"
          style={{ marginRight: '15px', height: '20px', marginTop: '-2px' }}
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          value={props.data.date}
          onChange={props.dateChangeHandler}
          size="small"
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </MuiPickersUtilsProvider>

      <Autocomplete
        size="small"
        style={{
          width: 300,
          display: 'inline-block',
          marginRight: '15px',
          marginTop: '5px',
        }}
        options={props.taskOptions}
        getOptionLabel={(option) => option.name}
        getOptionSelected={(option, value) => {
          // console.log('option', option);
          // console.log('value', value);\
          // to prevent warning regarding invalid value
          return option.id === value.id && option.name === value.name;
        }}
        onChange={props.taskCodeChangeHandler}
        renderInput={(params) => (
          <TextField {...params} label="Task" variant="outlined" />
        )}
      />

      <TextField
        size="small"
        style={{ marginRight: '15px', height: '20px' }}
        label="Hours"
        type="number"
        inputProps={{ min: 0.5, step: 0.5 }}
        onChange={props.hoursChangeHandler}
        InputLabelProps={{
          shrink: true,
        }}
      />

      <Button
        style={{ marginRight: '15px', verticalAlign: 'bottom' }}
        variant="contained"
        color="secondary"
        size="small"
        // className={classes.button}
        startIcon={<DeleteIcon />}
        onClick={props.deleteHandler}
      >
        Delete
      </Button>
    </div>
  );
}

export default TimesheetEntry;
