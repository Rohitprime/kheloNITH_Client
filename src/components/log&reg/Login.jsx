const bg = 'https://res.cloudinary.com/diszakm5s/image/upload/v1680701916/kheloNIT/dummy/bg6_llipum.png'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { authAction } from '../../store/auth'
import { useState } from 'react'
import axios from 'axios'
import { notificationAction } from '../../store/notfications'
import backendURl from '../helpers/backendUrl'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [user,setUser]= useState({email:'',password:''})
    const[userError,setUserError] = useState({eemail:false,epassword:false})

    
    const emailHandler =(e)=>{
        setUserError({...userError,eemail:false})
        setUser({...user,email:e.target.value})}

    const passwordHandler =(e)=>{
        setUserError({...userError,epassword:false})
        setUser({...user,password:e.target.value})
    }
  


    const submintHandler = async(e)=>{
         e.preventDefault()
         if(user.email === ''){
            setUserError({...userError,eemail:true})
            return
         }
         if(user.password === ''){
            setUserError({...userError,epassword:true})
            return
         }
         dispatch(notificationAction.setFunction({functionMessage:'Ready-to-Play'}))
         try {
             const res =await axios.post(`${backendURl}/kheloNITH/login`,user)
             if(res.data.error){
                dispatch(notificationAction.setNotification({type:'error',message:res.data.error}))
                dispatch(notificationAction.setDontFunction())
                return;
             }
             localStorage.setItem('token',res.data.token)
             dispatch(authAction.setAuthorizetion(true))
             dispatch(notificationAction.setDontFunction())
             dispatch(notificationAction.setNotification({type:'success',message:res.data.message}))
             return navigate('/profile')

         } catch (error) {
            dispatch(authAction.setAuthorizetion(true))
            dispatch(notificationAction.setNotification({type:'error',message:error.message}))

         }
    }
    
    

    return (
        <div className='relative overflow-y-scroll w-screen h-screen scrollbar-hide'>
            <div className="w-full h-full bg-gradient-to-b from-[#1e092d] to-black flex justify-center items-center absolute">
                <img src={bg} className="w-full h-full" />
            </div>
            <div className='w-full h-full  absolute flex flex-col justify-center items-center z-[1] backdrop-blur-sm opacity-70
            bg-gradient-to-b from-[#200133] to-black' >
                <form className='w-11/12 md:w-4/12 h-[550px] bg-gradient-to-b from-[#e9cdf6] to-[#000000] opacity-90 backdrop-blur-2xl rounded-3xl mt-[50px] 
                animate-slideup flex flex-col items-center shadow-2xl' onSubmit={submintHandler}>
                    <h1 className='font-bold text-[40px] text-[#33104b] mt-[50px] font-serif'>Login</h1>

                    <input type='email' className={`w-9/12 h-[55px]  mt-[10px] text-start shadow-xl font-bold text-2xl focus:outline-none
                    border-b-[5px] text-white bg-transparent placeholder-[#062147] ${userError.eemail && 'border-b-8 border-b-rose-900 placeholder-rose-900'}`} placeholder='Email' 
                    onChange={emailHandler} />

                    <input type='password' className={`w-9/12 h-[55px]  mt-[10px] text-start shadow-xl font-bold text-2xl focus:outline-none
                    border-b-[5px] text-white bg-transparent placeholder-[#062147] ${userError.epassword && 'border-b-8 border-b-rose-900 placeholder-rose-900'}`} placeholder='Password' 
                     onChange={passwordHandler}/>
                     <button type='submit' className='w-4/12 h-[55px] rounded-xl mt-[40px] text-center bg-gradient-to-br from-[#1f042e] to-[#670aae] shadow-xl
                     font-bold text-xl text-white hover:scale-105' >submit</button>

                     <h1 className='mt-5 font-serif text-xl text-white'>don't have an account?  
                     <Link to='/register'><b className='text-[#c091fe] hover:scale-110'>Register</b></Link></h1>
                </form>
            </div>
        </div>
    )
}

export default Login