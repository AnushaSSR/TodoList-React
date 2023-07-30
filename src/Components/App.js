import "../App.css";
import React, { useState, useEffect } from "react";
import Todos from "./Todos";
import Modal from "react-modal";
Modal.setAppElement("#root"); // Set the root element for accessibility

function App() {
  return (
    <div className="App">
      <Todos />
    </div>
  );
}

export default App;
