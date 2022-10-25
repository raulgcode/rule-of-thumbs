import React from "react";
import { AppContextProvider } from "./context";
import { Home } from "./pages";
import "./App.css";

function App() {
  return (
    <div className="App">
      <AppContextProvider>
        <Home />
      </AppContextProvider>
    </div>
  );
}

export default App;
