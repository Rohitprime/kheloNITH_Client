
import SportCard from "./SportCard"
import { cricket,football,vollyball,chess,badminton,basketball,tenish } from "../../assets/sportTeams/sportImages"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { sportsAction } from "../../store/sports"
import { notificationAction } from "../../store/notfications"
import backendURl from "../helpers/backendUrl"

const Sports = () => {

    const dispatch = useDispatch()
    const sportsTeams = useSelector(state=>state.teams.sportTeams)
    
    useEffect(()=>{
        
        dispatch(notificationAction.setFunction({functionMessage:''}))
         axios.get(`${backendURl}/kheloNITH/team/getTeams`)
        .then((res)=>{
            dispatch(sportsAction.setSportsTeams(res.data.teams))
          
            dispatch(notificationAction.setDontFunction())
        })
        .catch((e)=>{console.log(e.message)})

    },[])


    return (
        <div className="bg-gradient-to-br from-[#2e1148] to-[#280334] flex overflow-y-scroll h-screen scrollbar-hide justify-center">
            <div className="w-9/12 h-screen px-5 p-3 flex flex-wrap gap-16 justify-center">
                <div className="w-screen h-[80px]"></div>
                <SportCard sport={'cricket'} logo={cricket}/>
                <SportCard sport={'football'} logo={football} />
                <SportCard sport={'volleyball'} logo={vollyball} />
                <SportCard sport={'badminton'} logo={badminton} />
                <SportCard sport={'tennis'} logo={tenish} />
                <SportCard sport={'basketball'} logo={basketball} />
                <SportCard sport={'chess'} logo={chess} />
                <div className="w-screen h-[80px]"></div>
            </div>
        </div>
    )
}

export default Sports