import axios from "axios"
import { useEffect, useState } from "react"
import { useParams,Link } from "react-router-dom"
import { cricket,football,vollyball,chess,badminton,basketball,tenish } from "../../assets/sportTeams/sportImages"
import GameCard from "../sports/GameCard"
import backendURl from "../helpers/backendUrl"

const OneTeam = () => {
    const { id } = useParams()
    const [team, setTeam] = useState({teamName:'',
        type:'',
        numberOfPlayers:1,
        teamLeader:{},
        players:[],
       })

    useEffect(() => {
        axios.get(`${backendURl}/kheloNITH/specific/oneTeam/${id}`)
            .then((res) => {
                setTeam(res.data.team)
            })
            .catch((e)=>{
                console.log(e.message)
            })
            
    }, [id])

    


    return (
        <div className='relative w-screen h-screen mt-[150px] md:mt-[81px]'>
            <div className="w-full h-full bg-gradient-to-b from-[#5b3675] to-[#4f5c68] flex justify-center items-center absolute">
               {team?.type=='cricket'&& <img src={cricket} className="w-[700px]  h-[700px]" />}
               {team?.type=='football'&& <img src={football} className="w-[700px]  h-[700px]" />}
               {team?.type=='vollyball'&& <img src={vollyball} className="w-[700px]  h-[700px]" />}
               {team?.type=='chess'&& <img src={chess} className="w-[700px]  h-[700px]" />}
               {team?.type=='badminton'&& <img src={badminton} className="w-[700px]  h-[700px]" />}
               {team?.type=='tennis'&& <img src={tenish} className="w-[700px]  h-[700px]" />}
               {team?.type=='basketball'&& <img src={basketball} className="w-[700px]  h-[700px]" />}

            </div>
            <div className='w-screen h-screen min-h-screen bg-[#0e031e] absolute flex flex-col items-center z-[1] opacity-90 backdrop-blur-lg 
            overflow-y-scroll scrollbar-hide gap-8 pb-[780px] md:[390px]' >
                <h1 className='md:text-[60px] text-5xl font-bold font-serif opacity-100 text-white my-4 mt-10'>{team?.type.charAt(0).toUpperCase()}{team?.type.slice(1)} Teams</h1>
                 
                 <GameCard team={team} />
               

                <div></div>               
            </div>
        </div>
    )
}


export default OneTeam