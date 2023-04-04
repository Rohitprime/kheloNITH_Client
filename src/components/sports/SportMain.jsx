
import { useParams } from "react-router-dom"
import SportCard from "./SportCard"
import cricket from '../../assets/sports/cricket.png'
import football from '../../assets/sports/football.png'
import vollyball from '../../assets/sports/vollyball.png'
import chess from '../../assets/sports/chess.png'
import badminton from '../../assets/sports/badminton.png'
import tenish from '../../assets/sports/tenish.png'
import basketball from '../../assets/sports/basketball.png'
import GameCard from "./GameCard"
import { useSelector } from "react-redux"
import { useEffect } from "react"


const SportMain = ()=>{
    const {sport} = useParams();
    const sportsTeams = useSelector(state=> state.teams.sportsTeams)
   
    

    console.log(sportsTeams)
    
    return(
        <div className='relative w-screen h-screen mt-[150px] md:mt-[81px]'>
            <div className="w-full h-full bg-gradient-to-b from-[#5b3675] to-[#4f5c68] flex justify-center items-center absolute">
               {sport=='cricket'&& <img src={cricket} className="w-[700px]  h-[700px]" />}
               {sport=='football'&& <img src={football} className="w-[700px]  h-[700px]" />}
               {sport=='vollyball'&& <img src={vollyball} className="w-[700px]  h-[700px]" />}
               {sport=='chess'&& <img src={chess} className="w-[700px]  h-[700px]" />}
               {sport=='badminton'&& <img src={badminton} className="w-[700px]  h-[700px]" />}
               {sport=='tennis'&& <img src={tenish} className="w-[700px]  h-[700px]" />}
               {sport=='basketball'&& <img src={basketball} className="w-[700px]  h-[700px]" />}

            </div>
            <div className='w-screen h-screen min-h-screen bg-[#0e031e] absolute flex flex-col items-center z-[1] opacity-90 backdrop-blur-lg 
            overflow-y-scroll scrollbar-hide gap-8 pb-[780px] md:[390px]' >
                <h1 className='md:text-[60px] text-5xl font-bold font-serif opacity-100 text-white my-4 mt-10'>{sport.charAt(0).toUpperCase()}{sport.slice(1)} Teams</h1>
                {
                      sportsTeams?.map(sportsTeam =>(
                        <>
                         {
                            sportsTeam.type == sport && <GameCard team={sportsTeam} key={sportsTeam._id}/>
                         }
                        </>
                      ))
                } 

                <div></div>               
            </div>
        </div>
    )
}

export default SportMain