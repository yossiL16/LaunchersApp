
import { useLauncher } from '../utils/zustand'

export default function LauncherDetails() {

   
    const launcher = useLauncher((state) => state.launcher)
    const item = launcher[0]
    console.log(item);
    

    
  return (
    <div>
        <p>name: {item.name}</p>
        <p>rocketType: {item.rocketType}</p>
        <p>latitude: {item.latitude}</p>
        <p>longitude: {item.longitude}</p>
        <p>city: {item.city}</p>
    </div>
  )
}
