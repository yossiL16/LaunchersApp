
import { useLauncher } from '../utils/zustand'

export default function LauncherDetails() {

   
    const launcher = useLauncher((state) => state.launcher)

    
  return (
    <div>
        <p>name: {launcher.name}</p>
        <p>rocketType: {launcher.rocketType}</p>
        <p>latitude: {launcher.latitude}</p>
        <p>longitude: {launcher.longitude}</p>
        <p>city: {launcher.city}</p>
    </div>
  )
}
