import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import MeetingRoom from './components/MeetingRoom'
import { ThemeProvider } from 'styled-components';
import {
  MeetingProvider,
  lightTheme,
  GlobalStyles,
} from 'amazon-chime-sdk-component-library-react';

const App = () => (
  <ThemeProvider theme={lightTheme}>
    <GlobalStyles />
    <MeetingProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/meeting/:id" element={<MeetingRoom />} />
          </Routes>
        </div>
    </Router>
    </MeetingProvider>
  </ThemeProvider>
);

export default App;
