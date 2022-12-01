import './App.css';

import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'; 


// import AppHeader from "../appHeader/AppHeader";
import ProjectPage from '../../components/projectPage/ProjectPage';
import TaskPage from '../taskPage/TaskPage';






const App = () => {

  return (
    <Router>
      <div className="App">
        {/* <AppHeader/> */}
        <main>
          <Routes>
            <Route path="/" element={<ProjectPage/>}/>              
            <Route path="/task/:id" element={<TaskPage/>}/>
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App;

