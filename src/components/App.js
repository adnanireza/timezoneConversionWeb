import React from "react";
import Header from "./Header";
import TimeBody from "./TimeBody";
import Footer from "./Footer";
import "../styles.css";
import { Provider } from "../context/citiesContext";

export default function App() {
  const styles = {
    app: {
      fontFamily: "sans-serif",
      textAlign: "center"
      /*display: "flex",
      flexDirection: "column"*/
      //,justifyContent: "space-between"
    },
    header: {
      //
    },
    body: {
      //
    },
    footer: {
      //
    }
  };

  return (
    <Provider>
      <div style={styles.app} className="App">
        {/*<div style={{ display: "flex", backgroundColpor: "#fcf876" }}>
          <div style={{ width: 300, height: 50, backgroundColor: "#12947f" }} />
          <div style={{ width: 300, height: 50, backgroundColor: "#e4e4e4" }} />
        </div>*/}
        <div style={styles.header}>
          <Header />
        </div>
        <div style={styles.body}>
          <TimeBody />
        </div>
        <div style={styles.footer}>
          <Footer />
        </div>
      </div>
    </Provider>
  );
}
