
import SportCard from "./SportCard"
import cricket from '../../assets/sports/cricket.png'
import football from '../../assets/sports/football.png'
import vollyball from '../../assets/sports/vollyball.png'
import chess from '../../assets/sports/chess.png'
import badminton from '../../assets/sports/badminton.png'
import tenish from '../../assets/sports/tenish.png'
import basketball from '../../assets/sports/basketball.png'
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
        
        dispatch(notificationAction.setFunction({functionMessage:'Loading...'}))
         axios.get(`${backendURl}/kheloNITH/team/getTeams`)
        .then((res)=>{
            dispatch(sportsAction.setSportsTeams(res.data.teams))
            console.log(res.data.teams)
            dispatch(notificationAction.setDontFunction())
        })
        .catch((e)=>{console.log(e.message)})

    },[])


    return (
        <div className="bg-gradient-to-br from-[#2e1148] to-[#280334] flex overflow-y-scroll h-screen scrollbar-hide justify-center">
            <div className="w-9/12 h-screen px-5 p-3 flex flex-wrap gap-16 justify-center">
                <div className="w-screen h-[80px]"></div>
                <SportCard sport={'cricket'} logo={cricket} />
                <SportCard sport={'football'} logo={football} />
                <SportCard sport={'vollyball'} logo={vollyball} />
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