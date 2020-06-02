import React from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

import { entry } from '../../containers/Timesheet/Timesheet';
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
  deleteHandler: (event: React.MouseEvent) => void;
  dateChangeHandler: (date: any) => any;
  taskCodeChangeHandler: (event: React.ChangeEvent<{}>, value: any) => void;
  hoursChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function TimesheetEntry(props: TimesheetEntryProps) {
  return (
    <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          label="Date"
          value={props.data.date}
          onChange={props.dateChangeHandler}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </MuiPickersUtilsProvider>

      <Autocomplete
        options={[
          { id: 100, name: 'Development' },
          { id: 99, name: 'Bug Fixing' },
          { id: 200, name: 'Unit Testing' },
          { id: 300, name: 'Daily Stand Up' },
        ]}
        getOptionLabel={(option) => option.name}
        getOptionSelected={(option, value) => {
          // console.log('option', option);
          // console.log('value', value);\
          // to prevent warning regarding invalid value
          return option.id === value.id && option.name === value.name;
        }}
        onChange={props.taskCodeChangeHandler}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Combo box" variant="outlined" />
        )}
      />

      <TextField
        label="Hours"
        type="number"
        onChange={props.hoursChangeHandler}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <br />
      <Button
        variant="contained"
        color="secondary"
        size="medium"
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
