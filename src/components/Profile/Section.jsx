import { useParams } from "react-router-dom"
import CreateEvents from "./CreateEvents"
import CreateTeam from "./CreateTeam"
import EditProfile from "./updateForms/EditProfile"
import Genral from "./genral/Genral"
import ProfileNotifications from "./profileNotification/ProfileNotifications"
import TeamNotis from "./teamNotis/TeamNotis"



const Section =()=>{

    const {query='genral'} = useParams()
   
    return(
        <>
        { query=='createEvents' && <CreateEvents/>}   
         {query=='genral' && <Genral/>}
         {query=='createTeam' && <CreateTeam/>}
         {query=='notifications' && <ProfileNotifications/>}
         {query=='editProfile' && <EditProfile/>}
         {query=='teamNotis' && <TeamNotis/>}
      </>
    )
    
    
}

export default Section