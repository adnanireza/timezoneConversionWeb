import React, { useContext } from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import ArrowDropUpOutlinedIcon from "@material-ui/icons/ArrowDropUpOutlined";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Context } from "../context/citiesContext";

const useStyles = makeStyles(theme => ({
  button: {
    //margin: theme.spacing(1)
  }
}));
export default function TimeDate() {
  const styles = {
    date: {
      display: "grid"
      //gridTemplateColumns: "1"
    },
    dateInput: {
      marginTop: 10,
      marginBottom: 10
      //
    },
    today: {
      //marginTop: 10,
      marginBottom: 10
      //
    }
  };
  const classes = useStyles();
  const { state, setDate } = useContext(Context);
  return (
    <div style={styles.date}>
      <div style={styles.dateInput}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            style={{ width: 200 }}
            margin="normal"
            id="date-picker-dialog"
            label=""
            format="MM/dd/yyyy"
            value={state.date}
            onChange={setDate}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
        </MuiPickersUtilsProvider>
      </div>
      <div style={styles.today}>
        <Button
          style={{ height: 60.75 }}
          onClick={() => setDate(new Date())}
          variant="outlined"
          color="default"
          className={classes.button}
          endIcon={<ArrowDropUpOutlinedIcon />}
        >
          Today
        </Button>
      </div>
    </div>
  );
}
