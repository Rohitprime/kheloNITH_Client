
import axios from "axios"
import { useDispatch } from "react-redux"
import { notificationAction } from "../../../store/notfications"
import { profileAction } from "../../../store/profile"
import { Link } from "react-router-dom"
import backendURl from "../../helpers/backendUrl"

const CreatedTeams = ({team})=>{

    const dispatch = useDispatch()

    const deleteHandler = async (e) => {

        const id = e.target.name
         dispatch(notificationAction.setFunction({functionMessage:'deleting The Team'}))
        try {
            const token = await localStorage.getItem('token')
            const res = await axios.post(`${backendURl}/kheloNITH/team/deleteTeam`, { id, token })

            if (res.data.error) {
                dispatch(notificationAction.setNotification({ type: 'error', message: res.data.error }))
                dispatch(notificationAction.setDontFunction())
                return
            }
            dispatch(notificationAction.setNotification({ type: 'success', message: res.data.message }))
            dispatch(profileAction.setReRun())
            dispatch(notificationAction.setDontFunction())

        }
        catch (error) {
            dispatch(notificationAction.setNotification({ type: 'error', message: error.message }))
        }
    }

    return(
        <div className="w-full md:w-10/12 h-[100px] bg-[#32104b] rounded-lg flex-none flex 
                                    md:flex-row flex-col" key={team._id}>
            <div className='w-full md:w-9/12 h-full flex items-center justify-around'>
                 <Link to={`/specific/oneTeam/${team._id}`} className="font-bold text-2xl text-white font-serif
                                         hover:bg-[#de7bfc] px-2 rounded-lg">{team?.teamName}
                 </Link>
                        <h1 className="font-bold text-2xl text-white font-serif">{team?.type}</h1>
                        <h1 className="font-bold text-2xl text-white font-serif">{team?.date}</h1>
            </div>
            <div className='w-full md:w-3/12 h-full  flex items-center justify-center gap-3 '>
                <input type='button' className='w-3/12 md:w-5/12 h-[35px] md:h-[50px]  flex justify-center items-center
                      text-white text-lg bg-green-500 rounded-lg cursor-pointer hover:scale-105' value='update'/>
                   <input type='button' value='delete' name={team?._id} className='w-3/12 md:w-5/12 h-[35px] md:h-[50px]  flex justify-center items-center
                         text-white text-lg bg-rose-600 rounded-lg cursor-pointer hover:scale-105' onClick={deleteHandler} />
            </div>
        </div>
    )
}

export default CreatedTeams