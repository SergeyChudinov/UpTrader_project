import './App.css';

import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'; 


// import AppHeader from "../appHeader/AppHeader";
import StartPage from '../../components/startPage/StartPage';
import TaskPage from '../taskPage/TaskPage';






const App = () => {

  return (
    <Router>
      <div className="App">
        {/* <AppHeader/> */}
        <main>
          <Routes>
            <Route path="/" element={<StartPage/>}/>              
            <Route path="/task/:id" element={<TaskPage/>}/>
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App;

