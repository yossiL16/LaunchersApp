import React from 'react'
import { useLauncher } from '../utils/zustand'

export default function LauncherDetails() {

   
    const launcher = useLauncher((state) => state.launcher)
    function check(){
    onsole.log(launcher);
    }
    
    
  return (
    <div><button onClick={check}>check</button></div>
  )
}
