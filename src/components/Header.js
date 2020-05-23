import React from "react";

export default function Header() {
  const styles = {
    header: {
      marginTop: 20,
      marginBottom: 40
    }
  };
  return <h1 style={styles.header}>Time Zone Converter</h1>;
}
