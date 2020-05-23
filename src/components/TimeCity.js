import React, { useState, useContext } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Arrow from "./Arrow";
import { Context } from "../context/citiesContext";
import { Orient } from "../utils/orient";

export default function TimeCity({ orient, city, setCity }) {
  const styles = {
    timeCity: {
      display: "flex",
      flexDirection: orient === Orient.LEFT ? "row-reverse" : "row",
      marginTop: 10,
      marginBottom: 10
    },
    autocomplete: {},
    arrow: {
      display: "flex"
      //alignItems: "center"
    }
  };
  const [inputValue, setInputValue] = useState("");
  const { citiesArray } = useContext(Context);
  return (
    <div style={styles.timeCity}>
      <div style={styles.arrow}>
        <Arrow orient={orient} data={{ city: true }} />
      </div>
      <div style={styles.autocomplete}>
        <Autocomplete
          id={"cities_" + orient.description}
          options={citiesArray}
          getOptionLabel={elem => elem}
          style={{ width: 300 }}
          value={city}
          onChange={(event, newValue) => {
            setCity(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newVal) => setInputValue(newVal)}
          renderInput={params => (
            <TextField {...params} label="Location" variant="outlined" />
          )}
        />
      </div>
    </div>
  );
}
