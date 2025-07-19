import React from 'react'
import InputForm from './components/InputForm'
import { Route, Routes } from 'react-router-dom'
import Tasks from './components/Tasks'
import DaysAnalyzer from './components/DaysAnalyzer'
import NavBar from './components/NavBar'

const App = () => {
  return (
    <>
    <NavBar />
      <Routes>
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/" element={<InputForm />} />
        <Route path="/analyzer" element={<DaysAnalyzer />} />
      </Routes>
    </>
  )
}

export default App