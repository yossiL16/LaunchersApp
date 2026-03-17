import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import Home from "./pages/Home"
import AddLauncher from "./pages/AddLauncher"
import NavBar from "./components/NavBar"
import LauncherDetails from "./pages/LauncherDetails"
import Login from "./pages/Login"
import Register from "./pages/Register"

function App() {
  return (<>
    
    <BrowserRouter>
    <NavBar />
      <Routes>
        <Route path="/" element={<Login />}/>

        <Route path="/home" element={<Home />}/>
        <Route path='/louncher-details' element={<LauncherDetails />}/>

        <Route path="/Add-Launcher" element={<AddLauncher />} />
        
        <Route path="/register" element={<Register />}/>
        
       
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
