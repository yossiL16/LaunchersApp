import { useNavigate } from "react-router-dom"
import { useLauncher } from "../utils/zustand"

export default function HomeCards({item}) {

    const addLauncher = useLauncher((state) =>state.addLauncher)
    const r = useLauncher((state) => state.launcher)

    const navigate = useNavigate()

    function goToDetails(){
        addLauncher(item)
        console.log(r);
        
        
        navigate('/louncher-details')
    }

  return (
    <div className='card-home' style={{width: '200px', height:'150px', backgroundColor:'yellow'}}>
        <h1>{item.id}</h1>
        <p>{item.city}</p>
        <p>{item.rocketType}</p>
        <button onClick={goToDetails}>Details</button>
    </div>
  )
}
