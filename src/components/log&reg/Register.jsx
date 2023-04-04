
import bg from '../../assets/bg/bg3.png'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { authAction } from '../../store/auth'
import { notificationAction } from '../../store/notfications'
import backendURl from '../helpers/backendUrl'

const Register = () => {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [user,setUser]= useState({name:'',email:'',password:'',number:'',avtar:'',description:''})
    const[userError,setUserError] = useState({ename:false,eemail:false,epassword:false,enumber:false})

    const nameHandler =(e)=>{ 
       setUserError({...userError,ename:false})
       setUser({...user,name:e.target.value})}

    const emailHandler =(e)=>{
        setUserError({...userError,eemail:false})
        setUser({...user,email:e.target.value})}

    const passwordHandler =(e)=>{
        setUserError({...userError,epassword:false})
        setUser({...user,password:e.target.value})
    }
    const numberHandler =(e)=>{
        setUserError({...userError,enumber:false})
        setUser({...user,number:e.target.value})
    }

    const descriptionHandler =(e)=>{ 
        setUser({...user,description:e.target.value})
    }
    

    const avtarHandler = async(e)=>{
        const {files} = e.target
        if(files[0].size > 5500*1024){
            dispatch(notificationAction.setNotification({type:'error',message:'file size limit exceded 5mb'}))
            return
        }
        const file = files[0]
        console.log(file.File)
        const avtarUrl = await converToBase64(file)
        console.log(avtarUrl)
        setUser({...user,avtar:avtarUrl})
    }



    const submintHandler = async(e)=>{
         e.preventDefault()
       
    
         if(user.name === ''){
            setUserError({...userError,ename:true})
            return
         }
         if(user.email === ''){
            setUserError({...userError,eemail:true})
            return
         }
         if(user.password === ''){
            setUserError({...userError,epassword:true})
            return
         }
         if(user.number.length <10 || user.number.length>10){
            setUserError({...userError,enumber:true})
            return;
          }
         console.log(user)
         dispatch(notificationAction.setFunction({functionMessage:'Registering...'}))
         try {
             const res =await axios.post(`${backendURl}/kheloNITH/register`,user)
             console.log(res.data)
             if(res.data.error){
                dispatch(notificationAction.setNotification({type:'error',message:res.data.error}))
                dispatch(notificationAction.setDontFunction())
                return
             }
             localStorage.setItem('token',res.data.token)
             dispatch(authAction.setAuthorizetion(true))
             dispatch(notificationAction.setNotification({type:'success',message:'reginsterd succesfully'}))
             dispatch(notificationAction.setDontFunction())
             return  navigate('/profile')
         } catch (error) {
            dispatch(notificationAction.setNotification({type:'error',message:error.message}))
            dispatch(notificationAction.setDontFunction())
         }
    }

    return (
        <div className='relative overflow-y-scroll w-screen h-screen scrollbar-hide'>
            <div className="w-full h-full bg-gradient-to-b from-[#1e092d] to-black flex justify-center items-center absolute">
                {/* <img src={bg} className="w-0 sm:w-full sm:h-full" /> */}
            </div>
            <div className='w-full h-full  absolute flex flex-col md:justify-center items-center z-[1] backdrop-blur-sm opacity-90
            bg-gradient-to-b from-[#200133] to-black md:mt-0 mt-[135px]' >

            <form className='w-11/12 md:w-5/12  bg-gradient-to-b from-[#dfb2f3] to-[#423344] backdrop-blur-2xl rounded-3xl mt-[50px] 
                animate-slideup flex flex-col items-center shadow-2xl' onSubmit={submintHandler}>
                    <h1 className='font-bold text-[50px] text-[#ffffff] mt-[15px] font-serif'>Register</h1>

                    <input type='text' className={`w-11/12 md:w-9/12 h-[55px]  mt-[10px] text-start shadow-xl font-bold text-2xl focus:outline-none
                    border-b-[5px] text-white bg-transparent placeholder-[#ffffff] ${userError.ename && 'border-b-8 border-b-rose-900 placeholder-rose-900'}`} placeholder='Name' 
                    onChange={nameHandler}/>

                    <input type='email' className={`w-11/12 md:w-9/12 h-[55px]  mt-[10px] text-start shadow-xl font-bold text-2xl focus:outline-none
                    border-b-[5px] text-white bg-transparent placeholder-[#ffffff] ${userError.eemail && 'border-b-8 border-b-rose-900 placeholder-rose-900'}`} placeholder='Email' 
                    onChange={emailHandler}/>

                    <input type='password' className={`w-11/12 md:w-9/12 h-[55px]  mt-[10px] text-start shadow-xl font-bold text-2xl focus:outline-none
                    border-b-[5px] text-white bg-transparent placeholder-[#fefefe] ${userError.epassword && 'border-b-8 border-b-rose-900 placeholder-rose-900'}`} placeholder='Password' 
                     onChange={passwordHandler}/>

                    <input type='number' className={`w-11/12 md:w-9/12 h-[55px] text-white mt-[40px] text-start placeholder-[#ffffff] bg-transparent shadow-xl focus:outline-none
                     border-b-[5px] font-bold text-2xl ${userError.enumber && 'border-b-8 border-b-rose-900 placeholder-rose-900'}`} placeholder='Mobile Number' 
                     onChange={numberHandler}/>

                    <textarea  className={`w-9/12 h-[65px] mt-[40px] text-white text-start placeholder-[#ffffff] bg-transparent shadow-xl focus:outline-none
                     border-b-[5px] font-bold text-2xl ${ ''}`} 
                     onChange={descriptionHandler} placeholder='Description' ></textarea>
                    

                   <div className='w-11/12 md:w-9/12 flex flex-row  justify-start items-center mt-[40px] border-b-[5px] gap-2'>
                      <label htmlFor='avtar' className='w-4/12 h-[55px] flex justify-center border-r-[2px] text-white font-bold md:text-2xl items-center
                         '>ProfileImage</label>
                    <input type='file' className={`w-9/12 h-[55px]  text-white text-start placeholder-[#031732] bg-transparent shadow-xl focus:outline-none
                         font-bold text-2xl `}  placeholder={`Profile Image`} 
                        onChange={avtarHandler} accept='.jpeg,.jpg,.png' name='avtar' id='avtar'/>
                   </div>
                    <button type='submit' className='w-4/12 h-[55px] rounded-xl my-[40px] text-center bg-gradient-to-br from-[#d372f9] to-[#675576] shadow-xl
                     font-bold text-xl text-white hover:scale-105' >submit</button>

                </form>
            </div>
        </div>
    )
}

export default Register

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