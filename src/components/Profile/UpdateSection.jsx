
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import UpdateEvent from "./updateForms/UpdateEvent"
import axios from "axios"

const UpdateSection =()=>{
    const {updateQuery} = useParams()
    
    const array = updateQuery.split('-')
    const id= array[1]
    const updateFor = array[0]
   


    return(
        <>
         {updateFor=='event' && <UpdateEvent id={id}/>}
        </>
    )
}

export default UpdateSection