import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import './App.css';
import {Home} from "./home/Home";

function App() {
  return (
      <Router>
        <div className="App">
          <Routes>
            <Route path="/">
                <Route index element={<Home />} />
            </Route>
          </Routes>

        </div>
      </Router>
  );
}

export default App;
