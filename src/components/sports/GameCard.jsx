
import { BsFillPersonPlusFill } from 'react-icons/bs'
const playerPng ='https://res.cloudinary.com/diszakm5s/image/upload/v1680701313/kheloNIT/dummy/player_waaj5n.png' 
const captain = 'https://res.cloudinary.com/diszakm5s/image/upload/v1680701304/kheloNIT/dummy/captain_zxkxvc.png'
import { Link,NavLink } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import {notificationAction} from '../../store/notfications'
import backendURl from '../helpers/backendUrl'

const GameCard = ({ team }) => {

    const nop = team?.numberOfPlayers
    const players = team?.players?.slice(0, nop / 2 )
    const players2 = team?.players?.slice(nop / 2 )
    const dispatch = useDispatch()

    const applyHandler = async(id)=>{

       
        try {
          dispatch(notificationAction.setFunction({functionMessage:`sending your request to ${team?.teamLeader?.name}`}))
          const token = localStorage.getItem('token')
          const res = await  axios.post(`${backendURl}/kheloNITH/notifications/team/apply`,{token,id})
          if(res.data.error){
            dispatch(notificationAction.setNotification({type:'error',message:res.data.error}))
            dispatch(notificationAction.setDontFunction())
            return
          }
         dispatch(notificationAction.setNotification({type:'success',message:res.data.message}))
         dispatch(notificationAction.setDontFunction())

        } catch (error) {
           dispatch(notificationAction.setNotification({type:'error',message:error.message}))
           dispatch(notificationAction.setDontFunction())
 
        }
    }

    return (
        <div className="w-10/12  bg-white/80 rounded-3xl flex-none flex flex-col
        bg-gradient-to-br from-[#a57def] to-[#0f4343] relative">

            {team?.letApply=='yes' && <div className='w-[150px] h-[40px] border absolute -top-4 -right-3 rounded-lg bg-green-300 opacity-80
              flex justify-center items-center hover:scale-105'>
                 <button className='text-whit' onClick={()=>{applyHandler(team?._id)}}>Want to Join</button>
            </div>}

            <div className="w-full h-full flex flex-row" key={team?._id}>
                <div className="w-3/12 h-full rounded-l-3xl flex justify-center items-center">
                    <h1 className="font-bold text-[25px] text-[#faf5ff] font-serif space-y-0">
                        {team?.teamName?.split("").map((c,i) => (
                            <>
                                {c.toUpperCase()}<br key={i} />
                            </>
                        ))}
                    </h1>
                </div>
                <div className="w-10/12 md:w-9/12 h-full rounded-r-3xl flex flex-col pb-4">
                    <Link to={`/specific/oneUser/${team?.teamLeader?._id}`} className="w-full h-[120px]  flex flex-row items-center px-5 gap-1 md:gap-4 justify-center
                        ">
                        <img src={team?.teamLeader?.avtar?.avtar?team?.teamLeader?.avtar?.avtar:captain} alt="Caption Image" 
                            className="md:w-[85px] md:h-[85px] w-[70px] h-[70px] rounded-full bg-white
                                 border-2 border-[#ffffff]" />
                            <h1 className="text-white md:text-6xl text-2xl font-bold">{team?.teamLeader?.name}</h1>
                        <h1 className="text-white font-bold md:text-4xl mt-3">(c)</h1>
                    </Link>
                    <div className="w-full  flex md:flex-row flex-col md:pr-10 ">
                        <div className="w-full md:w-6/12 h-full  flex flex-col p-2 gap-4">
                            {
                                players.map((player, i) => {
                                    return (
                                        <div className="w-full h-[65px] bg-[#bd99d2] rounded-xl flex-none" key={player._id}>
                                            <div className="w-full h-full flex flex-row items-center px-5">
                                                <Link to={`/specific/oneUser/${player?._id}`} className='flex justify-center items-center'>
                                                    <img src={player?.avtar?player?.avtar?.avtar:playerPng} alt="" className="w-[60px] h-[60px] rounded-full bg-white
                                                    border-2 border-[#ffffff]" />
                                                    <h1 className="text-white text-xl font-bold ml-3">{player?.name}</h1>
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="md:w-6/12 w-full flex flex-col p-2 gap-4">
                            {
                                players2.map((player, i) => {
                                    return (
                                        <div className="w-full h-[65px] bg-[#bd99d2] rounded-xl flex-none" key={player._id}>
                                            {player && <div className="w-full h-full flex flex-row items-center px-5">
                                                <Link to={`/specific/oneUser/${player?._id}`} className='flex justify-center items-center'>
                                                    <img src={player?.avtar?player?.avtar?.avtar:playerPng} alt="" className="w-[60px] h-[60px] rounded-full bg-white
                                                       border-2 border-[#ffffff]" />
                                                    <h1 className="text-white text-xl font-bold ml-3">{player?.name}</h1>
                                                </Link>
                                            </div>}
                                            {
                                                !player && <div className='w-full h-full flex justify-center items-center text-white
                                        text-3xl'>
                                                    <BsFillPersonPlusFill />
                                                </div>
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default GameCard