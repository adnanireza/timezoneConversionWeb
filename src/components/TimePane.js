import React, { useContext } from "react";
import TimeCity from "./TimeCity";
import TimeInput from "./TimeInput";
import { Context } from "../context/citiesContext";

export default function TimePane({ orient }) {
  const { state, setCity, setTime, setNow } = useContext(Context);
  return (
    <div style={styles.timePane}>
      <div style={styles.timeInput}>
        <TimeInput
          orient={orient}
          time={state[orient].time}
          setTime={time => setTime(time, orient)}
          setNow={time => setNow(time, orient)}
        />
      </div>
      <div style={styles.timeCity}>
        <TimeCity
          orient={orient}
          city={state[orient].city}
          setCity={city => setCity(city, orient)}
        />
      </div>
    </div>
  );
}

const styles = {
  timePane: {
    textAlign: "center"
    //backgroundColor: "#82c4c3",
    //width: 350
  },
  timeCity: {
    //display: "flex"
  },
  timeInput: {
    //backgroundColor: "#fdcb9e"
  }
};
