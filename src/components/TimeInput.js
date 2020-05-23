import React, { useContext } from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker
} from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import ArrowDropDownOutlinedIcon from "@material-ui/icons/ArrowDropDownOutlined";
import Arrow from "./Arrow";
import Overflow from "./Overflow";
import { Orient } from "../utils/orient";

const useStyles = makeStyles(theme => ({
  button: {
    //margin: theme.spacing(1)
  }
}));
export default function TimeInput({ orient, time, setTime, setNow }) {
  const classes = useStyles();

  const styles = {
    timeInput: {
      //margin: 10
      //display: "grid"
      //display: "flex"
    },
    nowBar: {
      marginTop: 10,
      marginBottom: 10
    },
    inputBar: {
      display: "flex",
      flexDirection: orient === Orient.LEFT ? "row-reverse" : "row",
      marginTop: 10,
      marginBottom: 10
    },
    overflow: {
      height: 60.75,
      marginLeft: orient === Orient.RIGHT ? 15 : 0,
      marginRight: orient === Orient.LEFT ? 15 : 0,
      fontStyle: "italic",
      display: "flex",
      alignItems: "center",
      textAlign: "center"
    },
    input: {
      display: "flex",
      alignItems: "center"
      /*marginLeft: 10,
      marginRight: 10*/
      //margin: 10

      //flex: 1
      //width: "300px"
    },
    arrow: {
      display: "flex"
      //alignItems: "center"
      //flexDirection: orient === Orient.LEFT ? "row-reverse" : "row"
    }
  };

  return (
    <div style={styles.timeInput}>
      <div style={styles.nowBar}>
        <Button
          style={{ height: 60.75 }}
          onClick={() => setNow(new Date())}
          variant="outlined"
          color="default"
          className={classes.button}
          endIcon={<ArrowDropDownOutlinedIcon />}
        >
          Now
        </Button>
      </div>
      <div style={styles.inputBar}>
        <div style={styles.arrow}>
          <Arrow orient={orient} data={{ time: true }} />
        </div>
        <div style={styles.input}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker
              style={{ width: 150 }}
              margin="normal"
              id={"time-picker_" + orient.description}
              label=""
              value={time}
              onChange={setTime}
              KeyboardButtonProps={{
                "aria-label": "change time"
              }}
            />
          </MuiPickersUtilsProvider>
        </div>
        <div style={styles.overflow}>
          <Overflow orient={orient} />
        </div>
      </div>
    </div>
  );
}
