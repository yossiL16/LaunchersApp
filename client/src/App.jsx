import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import LauncherDetails from "./pages/launcherDetails"
import Home from "./pages/Home"
import AddLauncher from "./pages/AddLauncher"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/Add-Launcher" element={<AddLauncher />} />
        <Route path="/Launchr-Details" element={<LauncherDetails ></LauncherDetails>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
