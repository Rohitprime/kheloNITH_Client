
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
    const [user,setUser]= useState({name:'',email:'',password:'',number:'',avtar:'',description:'',gameChoise:[],masterOf:''})
    const[userError,setUserError] = useState({ename:false,eemail:false,epassword:false,enumber:false})
    const [choise,setChoise] = useState([])

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
       
        const avtarUrl = await converToBase64(file)
      
        setUser({...user,avtar:avtarUrl})
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
       
         dispatch(notificationAction.setFunction({functionMessage:'Registering'}))
         try {
             const res =await axios.post(`${backendURl}/kheloNITH/register`,user)
            
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
        <div className='overflow-y-scroll w-screen h-screen scrollbar-hide'>
            <div className=' flex flex-col md:justify-center items-center z-[1] backdrop-blur-sm opacity-90
            bg-gradient-to-b from-[#200133] to-black md:mt-[80px] mt-[135px] pb-16' >

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
                         '>Profile Image</label>
                    <input type='file' className={`w-9/12 h-[55px]  text-white text-start placeholder-[#031732] bg-transparent shadow-xl focus:outline-none
                         font-bold text-2xl `}  placeholder={`Profile Image`} 
                        onChange={avtarHandler} accept='.jpeg,.jpg,.png' name='avtar' id='avtar'/>
                   </div>
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
                   <fieldset className='w-11/12 md:w-9/12 border-4 mt-5 flex flex-row p-3 shadow-lg'>
                     <legend className='text-white font-bold text-2xl'>Choose your favourite sport</legend>
                    <div className=' w-6/12 flex flex-col justify-center text-white text-lg font-bold gap-2'>
                        <div><input type='checkbox' onChange={gameChoiseHandler} value='Cricket'/>  Cricket</div>
                        <div><input type='checkbox' onChange={gameChoiseHandler} value='Football'/>  Football</div>
                        <div><input type='checkbox' onChange={gameChoiseHandler} value='Volleyball'/> Volleyball</div>
                        <div><input type='checkbox' onChange={gameChoiseHandler} value='Badminton'/> Badminton</div>
                    </div>

                    <div className='w-6/12 h-[150px] flex flex-col justify-center text-white text-lg font-bold gap-2'>
                        <div><input type='checkbox' onChange={gameChoiseHandler} value='Tennis'/> Tennis</div> 
                        <div><input type='checkbox' onChange={gameChoiseHandler} value='Basketball'/> Basketball</div>
                        <div><input type='checkbox' onChange={gameChoiseHandler} value='Chess'/> Chess</div>
                    </div>
                   </fieldset>
                    <button type='submit' className='w-4/12 h-[55px] rounded-xl my-[20px] text-center bg-gradient-to-br from-[#d372f9] to-[#675576] shadow-xl
                     font-bold text-xl text-white hover:scale-105' >Submit</button>

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