import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import Home from "./pages/Home"
import AddLauncher from "./pages/AddLauncher"
import NavBar from "./components/NavBar"
import LauncherDetails from "./pages/LauncherDetails"
import Login from "./pages/Login"
import Register from "./pages/Register"
import PrivetAll from "./components/PrivetAll"
import PrivetIntelligence from "./components/PrivetIntelligence"
import PrivetAdmin from "./components/PrivetAdmin"

function App() {
  return (<>
    
    <BrowserRouter>
    <NavBar />
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route element={<PrivetAll />}>
          <Route path="/home" element={<Home />}/>
          <Route path='/louncher-details' element={<LauncherDetails />}/>
        </Route>
        <Route element={<PrivetIntelligence />}>
          <Route path="/Add-Launcher" element={<AddLauncher />} />
        </Route>
        <Route element={<PrivetAdmin />}>
          <Route path="/register" element={<Register />}/>
        </Route>
       
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
