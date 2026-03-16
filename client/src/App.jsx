import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import Home from "./pages/Home"
import AddLauncher from "./pages/AddLauncher"
import NavBar from "./components/NavBar"
import LauncherDetails from "./pages/LauncherDetails"

function App() {
  return (<>
    
    <BrowserRouter>
    <NavBar />
      <Routes>

        <Route path="/" element={<Home />}/>
        <Route path="/Add-Launcher" element={<AddLauncher />} />
        <Route path='/louncher-details' element={<LauncherDetails />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
