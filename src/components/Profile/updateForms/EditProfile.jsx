
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { notificationAction } from '../../../store/notfications'
import { profileAction } from '../../../store/profile'
import backendURl from '../../helpers/backendUrl'

const EditProfile = () => {
    
    const presentUser = useSelector(state => state.profile.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [user,setUser]= useState({...presentUser})
    const [choise,setChoise] = useState([])

    const[userError,setUserError] = useState({ename:false,enumber:false})
   

    const nameHandler =(e)=>{ 
       setUserError({...userError,ename:false})
       setUser({...user,name:e.target.value})}

    const numberHandler =(e)=>{
        setUserError({...userError,enumber:false})
        setUser({...user,number:e.target.value})
    }

    const descriptionHandler =(e)=>{ 
        // setUserError({...userError,ename:false})
        setUser({...user,description:e.target.value})
    }
    
    const avtarHandler = async(e)=>{
        const {files} = e.target
        if(files[0].size > 250*1024){
            dispatch(notificationAction.setNotification({type:'error',message:'file size limit exceded 250kb'}))
            return
        }
        const file = files[0]
        const avtarUrl = await converToBase64(file)
        setUser({...user,newAvtar:avtarUrl})
    }

    const gameChoiseHandler =(e)=>{
       
        console.log(e.target.checked)
        if(e.target.checked){
            choise.push(e.target.value)
        }
        let arr = new Set(choise);
        if(e.target.checked == false){
           arr.delete(e.target.value)
        }
        console.log('set',arr)
        setChoise(Array.from(arr))
        console.log('after push ', choise)
        setUser({...user,gameChoise:choise})
        console.log(user.gameChoise)

    }

    const masterOfHandler = (e)=>{
        console.log(e.target.value)
        setUser({...user,masterOf:e.target.value})
        console.log(user)
  }

    const submintHandler = async(e)=>{
         e.preventDefault()
       
    
         if(user.name === ''){
            setUserError({...userError,ename:true})
            return
         }
         if(user.number.length <10 || user.number.length>10){
            setUserError({...userError,enumber:true})
            return;
          }
      
        dispatch(notificationAction.setFunction({functionMessage:'updating Profile'}))

         try {
             const res =await axios.post(`${backendURl}/kheloNITH/profile/edit`,{user})
             if(res.data.error){
                dispatch(notificationAction.setNotification({type:'error',message:'somthing went wrong ! try again'}))
                dispatch(notificationAction.setDontFunction())
                return
             }
             dispatch(notificationAction.setNotification({type:'success',message:res.data.message}))
             dispatch(notificationAction.setDontFunction())

             dispatch(profileAction.setReRun())
         } catch (error) {
            dispatch(notificationAction.setNotification({type:'error',message:res.data.error}))
                            dispatch(notificationAction.setDontFunction())

         }
    }


    return (
        <div className='overflow-y-scroll w-screen h-screen scrollbar-hide bg-white/10'>
            
            <div className='w-full h-full  flex flex-col items-center z-[1] backdrop-blur-sm ' >

            <form className='w-11/12 md:w-5/12  bg-gradient-to-b from-[#d577fd] to-[#dfe5eb] backdrop-blur-2xl rounded-3xl mt-[80px] 
                animate-slideup flex flex-col items-center shadow-2xl' onSubmit={submintHandler} encType='multipart/form-data'>
                    <h1 className='font-bold text-[50px] text-[#062147] mt-[15px] font-serif'>Edit Profile</h1>

                    <input type='text' className={`w-9/12 h-[55px]  mt-[10px] text-start shadow-xl font-bold text-2xl focus:outline-none
                    border-b-[5px] text-white bg-transparent placeholder-[#062147] ${userError.ename && 'border-b-8 border-b-rose-900 placeholder-rose-900'}`} 
                     onChange={nameHandler} defaultValue={`${presentUser.name}`} placeholder='Your Name'/> 

                    <input type='number' className={`w-9/12 h-[55px] mt-[40px] text-white text-start placeholder-[#031732] bg-transparent shadow-xl focus:outline-none
                     border-b-[5px] font-bold text-2xl ${userError.enumber && 'border-b-8 border-b-rose-900 placeholder-rose-900'}`}  defaultValue={`${presentUser.number}`} 
                     onChange={numberHandler} placeholder='Your Mobile Number'/>

                    <textarea  className={`w-9/12 h-[65px] mt-[40px] text-white text-start placeholder-[#062147] bg-transparent shadow-xl focus:outline-none
                     border-b-[5px] font-bold text-2xl ${ ''}`} 
                     onChange={descriptionHandler} placeholder='Description' >{presentUser.description?presentUser.description:''}</textarea>
                    
                    <input type='file' className={`w-9/12 h-[55px] mt-[40px] text-white text-start placeholder-[#031732] bg-transparent shadow-xl focus:outline-none
                     border-b-[5px] font-bold text-2xl ${userError.enumber && 'border-b-8 border-b-rose-900 placeholder-rose-900'}`}  
                     onChange={avtarHandler} accept='.jpeg,.jpg,.png' name='avtar'/>

                <fieldset className='w-11/12 md:w-9/12 border-4 mt-5 flex flex-row p-3 shadow-lg '>
                     <legend className='text-white font-bold text-2xl'>Master of</legend>
                    <div className=' w-6/12 flex flex-col justify-center text-white text-lg font-bold gap-2'>
                        <div><input type='radio' name='master of' onChange={masterOfHandler} value='Cricket'/>  Cricket</div>
                        <div><input type='radio' name='master of' onChange={masterOfHandler} value='Football'/>  Football</div>
                        <div><input type='radio' name='master of' onChange={masterOfHandler} value='Volleyball'/> Volleyball</div>
                        <div><input type='radio' name='master of' onChange={masterOfHandler} value='Badminton'/> Badminton</div>
                    </div>

                    <div className='w-6/12 h-[150px] flex flex-col justify-center text-white text-lg font-bold gap-2'>
                        <div><input type='radio' name='master of' onChange={masterOfHandler} value='Tennis'/> Tennis</div> 
                        <div><input type='radio' name='master of' onChange={masterOfHandler} value='Basketball'/> Basketball</div>
                        <div><input type='radio' name='master of' onChange={masterOfHandler} value='Chess'/> Chess</div>
                    </div>
                   </fieldset>

                <fieldset className='w-11/12 md:w-9/12 border-4 mt-5 flex flex-row p-3 shadow-2xl'>
                     <legend className='text-white font-bold text-2xl'>Choose your favourite sport(s)</legend>
                    <div className=' w-6/12 flex flex-col justify-center text-white text-lg font-bold gap-2'>
                        <div><input type='checkbox' onChange={gameChoiseHandler} value='Cricket'/>  Cricket</div>
                        <div><input type='checkbox' onChange={gameChoiseHandler} value='Football'/>  Football</div>
                        <div><input type='checkbox' onChange={gameChoiseHandler} value='Volleyball'/>  Volleyball</div>
                        <div><input type='checkbox' onChange={gameChoiseHandler} value='Badminton'/>  Badminton</div>
                    </div>

                    <div className='w-6/12 h-[150px] flex flex-col justify-center text-white text-lg font-bold gap-2'>
                        <div><input type='checkbox' onChange={gameChoiseHandler} value='Tennis'/> Tennis</div> 
                        <div><input type='checkbox' onChange={gameChoiseHandler} value='Basketball'/> Basketball</div>
                        <div><input type='checkbox' onChange={gameChoiseHandler} value='Chess'/> Chess</div>
                    </div>

                   </fieldset>

                    <button type='submit' className='w-4/12 h-[55px] rounded-xl my-[40px] text-center bg-gradient-to-br  from-[#cf83ff] to-[#6f118c] shadow-2xl
                     font-bold text-xl text-white hover:scale-105' >submit</button>

                </form>
            </div>
        </div>
    )
}

export default EditProfile

const converToBase64 = (file)=>{
    return new Promise((resolve,reject)=>{
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onload = ()=>{
            resolve(fileReader.result)
        }
        fileReader.onerror = (error)=>{
            reject(error)
        }
    })
}