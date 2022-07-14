import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import { Home } from "./home/Home";
import { TestFlow } from "./test-flow/TestFlow";
import { TestFinishPage } from "./test-flow/TestFinishPage";
import styled from "styled-components";

const AppContent = styled.div`
  max-width: 800px;
  margin: auto;
`;

function App() {
  return (
    <Router>
      <AppContent>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
          </Route>
          <Route path="/testing/:sessionId">
            <Route index element={<TestFlow />} />
          </Route>
          <Route path="/testing/:sessionId/completed">
            <Route index element={<TestFinishPage />} />
          </Route>
        </Routes>
      </AppContent>
    </Router>
  );
}

export default App;
