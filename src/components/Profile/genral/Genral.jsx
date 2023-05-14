
const events = 'https://res.cloudinary.com/diszakm5s/image/upload/v1680701325/kheloNIT/dummy/events_el9oco.png'
const team  = 'https://res.cloudinary.com/diszakm5s/image/upload/v1680701333/kheloNIT/dummy/team_aob7kw.png'
const inTeam = 'https://res.cloudinary.com/diszakm5s/image/upload/v1680701324/kheloNIT/dummy/inTeams_usdc5y.png'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { notificationAction } from '../../../store/notfications'
import { useNavigate, Link } from 'react-router-dom'
import { profileAction } from '../../../store/profile'
import CreateTeam from '../CreateTeam'
import CreatedTeams from './CreatedTeams'
import CreatedEvent from './CreatedEvent'
import InTeam from './InTeam'

const Genral = () => {
    const [genral, setGenral] = useState({ oevents:true, oteam: false,oinTeam:false })
    const user = useSelector(state => state.profile.user)
  

    const eventsHandler = () => { setGenral({ oevents: true, oteam: false,oinTeam:false })}
    const teamHandler = () => {setGenral({ oevents: false, oteam: true,oinTeam:false })}
    const inTeamHandler = ()=>{setGenral({oevents:false,oteam:false,oinTeam:true})}


    return (
        <div className=" w-full flex flex-col gap-2 ">
            <div className="w-full  flex flex-col md:flex-row justify-center gap-5 p-5 items-center">

                <div className="w-9/12 md:w-3/12 h-[300px] p-2 rounded-2xl bg-[#cd95f5] opacity-90 flex flex-col justify-center items-center
                  hover:scale-105 cursor-pointer"   onClick={eventsHandler}>
                    <img src={events} alt="" className="w-full rounded-2xl  h-[250px]" />
                    <h1 className="font-bold font-serif text-3xl text-gray-700 ]">Created Events</h1>
                </div>
                <div className="w-9/12 md:w-3/12 h-[300px] p-2  rounded-2xl bg-[#cd95f5] opacity-90 flex flex-col justify-center items-center 
                   hover:scale-105 cursor-pointer"  onClick={teamHandler}>
                    <img src={team} alt="" className="w-full h-full rounded-2xl" />
                    <h1 className="font-bold font-serif text-3xl text-gray-700 ">Created Teams</h1>
                </div>
                <div className="w-9/12 md:w-3/12 h-[300px] p-2  rounded-2xl bg-[#cd95f5] opacity-90 flex flex-col justify-center items-center 
                   hover:scale-105 cursor-pointer"  onClick={inTeamHandler}>
                    <img src={inTeam} alt="" className="w-full h-full rounded-2xl" />
                    <h1 className="font-bold font-serif text-3xl text-gray-700 ">Joined Teams</h1>
                </div>
            </div>

           <div className=' h-screen pb-20'>
           {genral.oevents &&


                <div className='w-full flex flex-col justify-center items-center gap-6 mt-3 overflow-y-scroll scrollbar-hide'>
                    <h1 className='text-white/80 font-bold text-4xl my-2 font-serif'>All Events</h1>
                    {user?.events?.length == 0 && <h1 className="text-white/70 text-2xl text-center font-medium font-serif
                        animate-slideup">No Event created Yet</h1>}
                    <div className='w-full  animate-slideup md:h-screen overflow-y-scroll bg-[#7d5991] p-4 flex flex-col items-center gap-4 scrollbar-hide'>
                        {

                            user?.events?.map(event => <CreatedEvent event={event}/>)
                        }
                    </div>

                </div>
                
                }

                {genral.oteam &&
                <>
                    <div className='w-full h-[100px]  text-center font-bold text-4xl text-white/80 font-serif'>All Teams</div>
                    {user?.createdTeams?.length == 0 && <h1 className="text-white/70 text-2xl text-center font-medium font-serif
                    animate-slideup">No Team created Yet</h1>}
                    <div className='w-full  animate-slideup md:h-screen overflow-y-scroll bg-[#7d5991] p-4 flex flex-col items-center gap-4
                        scrollbar-hide '>
                        {
                            user?.createdTeams?.map(team => <CreatedTeams team={team}/>)
                        }
                    </div>
                </>
                }

                {genral.oinTeam &&
                <>
                    <div className='w-full  text-center font-bold text-4xl text-white/80 font-serif '>All Teams You Have Joined</div>
                    {user?.inTeams?.length == 0 && <h1 className="text-white/70 text-2xl font-medium font-serif text-center
                    animate-slideup">No Team Joined Yet</h1>}
                    <div className='w-full  animate-slideup md:h-screen overflow-y-scroll bg-[#7d5991] p-4 flex flex-col items-center gap-4
                        scrollbar-hide '>
                        {
                            user?.inTeams?.map(inteam => <InTeam inTeam={inteam}/>)
                        }
                    </div>
                </>
                }

           </div>

        </div>
    )
}

export default Genral