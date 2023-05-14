import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
const profile = 'https://res.cloudinary.com/diszakm5s/image/upload/v1680701304/kheloNIT/dummy/captain_zxkxvc.png'
import Navbar from "../navbar/Navbar"
import { Link } from "react-router-dom"
import backendURl from "../helpers/backendUrl"
import { notificationAction } from "../../store/notfications"
import { useDispatch } from "react-redux"


const UserProfile = () => {

    const { id } = useParams()

    const [user, setUser] = useState({})
    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(notificationAction.setFunction({functionMessage:''}))
        axios.get(`${backendURl}/kheloNITH/specific/oneUser/${id}`)
            .then((res) => {
                setUser(res.data.user)
                dispatch(notificationAction.setDontFunction())
            })
            .catch((e) => {
                console.log(e.message)
                dispatch(notificationAction.setNotification({ type: 'error', message: res.data.error }))
                dispatch(notificationAction.setDontFunction())
            })

    }, [id])

    return (
        <>
            <div className="  w-screen h-screen  flex flex-col gap-3 px-5 p-2 mt-[151px] md:mt-[81px] bg-[#210732]
             overflow-y-scroll pt-10 scrollbar-hide">

                <div className=' bg-white/10  opacity-80 p-2 animate-slideup'>
                    <div className="w-full h-[200px] flex flex-row  items-center justify-center gap-4">
                        <img src={user?.avtar?user?.avtar.avtar:profile} alt="" className="md:w-[160px] md:h-[160px] w-[120px] h-[120px] rounded-full bg-white/50
                            border-2 border-[#d178f5]" />
                        <fieldset className="w-full md:w-2/12  p-2 flex flex-col items-center justify-center relative border-t-2">
                            <legend className=" p-2 border-2 border-[#d178f5] rounded-md top-5 right-0 flex justify-center items-center
                            font-bold text-4xl bg-clip-text text-transparent bg-gradient-to-r from-[#ecbe19] to-[#fc5644]">
                                123
                            </legend>
                            <h1 className="font-bold font-serif md:text-5xl text-3xl text-white">{user?.name}</h1>
                            <h1 className="font-bold font-serif text-xl text-white/60">{user?.email}</h1>
                        </fieldset>
                    </div>
                    <div className="w-full pb-5 px-4 ">
                        <h1 className="text-white flex flex-wrap justify-center font-mono font-bold text-lg">{user.description}</h1>
                    </div>
                </div>

                <fieldset className="w-full p-5 bg-white/10 relative animate-slidedown flex flex-wrap text-white font-bold
                         border justify-around items-center gap-2">
                         <legend className="text-xl">Favourite Sports</legend>
                          {
                            user?.gameChoise && user?.gameChoise.map((choise)=>(
                                  <h1>{choise}</h1>
                            ))
                          }
                        </fieldset>



                <div>
                       <div className="w-full bg-white/10 flex flex-col justify-center items-center text-[#ffffff] md:p-5 text-lg font-mono font-bold
                          p-2 border-b-[1px] border-b-[#e9b0ff] animate-slideup">
                          <label className="" >({user?.progress?.request}) Requests Over ({user?.progress?.numberOfEvents}) Events</label>                           
                        </div>
                        <div className="w-full  flex flex-row gap-1 p-1 md:p-5 py-4 bg-white/10 justify-center items-center">
                             <div className="w-3/12 md:w-2/12 h-full  flex flex-col items-center gap-2 ">
                                <h1 className="text-start text-white">Applied</h1>
                                <div className="w-9/12 md:w-4/12 h-[60px] md:h-[100px] rounded-full border-4 border-[#d89fec] flex justify-center items-center">
                                     <h1 className="text-white text-lg md:text-2xl font-mono font-extralight">{user?.progress?.applied}</h1>
                                </div>
                             </div>
                             <div className="w-9/12 md:w-6/12 h-full flex flex-col items-center">
                         
                                    <div className="w-full h-[60px] p-1 text-white font-mono">
                                        <label htmlFor="" >Accepted By Other ({user?.progress?.acceptByOther})</label>
                                        <progress className="w-full h-[12px] rounded-xl" max={user?.progress?.applied} value={user?.progress?.acceptByOther}/>
                                    </div>
                                    <div className="w-full h-[60px] p-1 text-white font-mono">
                                        <label htmlFor="" >Rejected By Other ({user?.progress?.rejectedByOther})</label>
                                        <progress className="w-full h-[12px] rounded-xl" max={user?.progress?.applied} value={user?.progress?.rejectedByOther}></progress>
                                    </div>
                             </div>
                        </div>
                </div>

                <div className="w-full bg-white/10 flex flex-col items-center opacity-80  pt-8 gap-4 pb-8 animate-slideup">
                    <h1 className="text-white font-bold text-3xl md:text-5xl font-serif">Created Teams</h1>
                    {user?.createdTeams?.length == 0 && <h1 className="text-white/80 font-bold text-2xl">Nothing yet</h1>}
                    {user?.createdTeams?.map(team =>
                        <Link to={`/specific/oneTeam/${team?._id}`} className="w-full md:w-10/12 h-[100px] bg-[#32104b] rounded-lg flex-none 
                        flex md:flex-row flex-col justify-center md:justify-around items-center" key={team._id}>
                            <Link to={`/specific/oneTeam/${team._id}`} className="font-bold text-2xl text-white font-serif
                                         hover:bg-[#de7bfc] px-2 rounded-lg">{team?.teamName}
                            </Link>
                            <h1 className="font-bold text-2xl text-white font-serif">{team?.type}</h1>
                            <h1 className="font-bold text-2xl text-white font-serif">{team?.date}</h1>
                        </Link>)}
                </div>

                <div className="w-full bg-white/10 flex flex-col items-center opacity-80  pt-8 gap-4 pb-8 animate-slideup">
                    <h1 className="text-white font-bold text-3xl md:text-5xl font-serif">Teams Joined</h1>
                    {user?.inTeams?.length == 0 && <h1 className="text-white/80 font-bold text-2xl">No Team Joined Yet</h1>}
                    {user?.inTeams?.map(inTeam =>
                        <Link to={`/specific/oneTeam/${inTeam?._id}`} className="w-full md:w-10/12 h-[100px] bg-[#32104b] rounded-lg 
                        flex-none flex md:flex-row flex-col justify-center md:justify-around items-center" key={inTeam._id}>
                            <Link to={`/specific/oneTeam/${inTeam._id}`} className="font-mono text-2xl text-white font-bold
                                         hover:bg-[#de7bfc] px-2 rounded-lg">{inTeam?.teamName}
                            </Link>
                            <h1 className="font-bold text-xl text-white font-serif">{inTeam?.type}</h1>
                            <h1 className="font-bold text-xl text-white font-serif">{inTeam?.date}</h1>
                        </Link>)}
                </div>

                <div className="w-full bg-white/10 flex flex-col items-center opacity-80  pt-8 gap-4 pb-8 animate-slideup">
                    <h1 className="text-white font-bold text-3xl md:text-5xl font-serif">Events Created</h1>
                    {user?.events?.length == 0 && <h1 className="text-white/80 font-bold text-2xl">No Events Created Yet</h1>}
                    {user?.events?.map(event =>
                        <div className="w-full md:w-10/12 h-[100px] bg-[#32104b] rounded-lg flex-none 
                        flex md:flex-row flex-col justify-center md:justify-around items-center" key={event._id}>
                            <Link to={`/specific/oneEvent/${event._id}`} className="font-bold text-2xl text-white font-serif
                                         hover:bg-[#de7bfc] px-2 rounded-lg">{event?.type}
                            </Link>
                            <h1 className="font-bold text-2xl text-white font-serif">{event?.date}</h1>
                            <h1 className="font-bold text-2xl text-white font-serif">{event?.time}</h1>

                        </div>)}
                </div>


            </div>
            <div className="w-full h-[100px] bg-[#210732]"></div>
        </>
    )
}

export default UserProfile