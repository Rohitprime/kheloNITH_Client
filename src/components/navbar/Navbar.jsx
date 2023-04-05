const nithLogo = 'https://res.cloudinary.com/diszakm5s/image/upload/v1680701156/kheloNIT/nithLogo_zn4tot.png'
import { Link,NavLink, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Notifications from '../helpers/Notifications'
import { authAction } from '../../store/auth'
import Message from '../helpers/Message'



const Navbar = ()=>{

  const  {available,functioning} = useSelector(state => state.notification)
  const login = useSelector(state => state.auth.authorize)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  


  const logoutHandler = ()=>{
       localStorage.clear()
       dispatch(authAction.setAuthorizetion(false))
       return navigate('/')
  }

    return (
      <div className="w-screen h-[150px] md:h-[80px] flex flex-col md:flex-row  absolute top-0  bg-gradient-to-b from-[#1e023d] to-[#513f60] z-[5]
      shadow-lg shadow-white/60  md:pb-0 pb-2">
       {available && <Notifications/>}
       {functioning && <Message/>}
        <div className="w-full md:w-2/12 h-full flex justify-center items-center">
         <Link  to='/'><img src={nithLogo} className="w-[60px] h-[60px] cursor-pointer hover:scale-105"/></Link>
        </div>
        <div className="w-full md:w-10/12 h-full flex flex-col md:flex-row gap-4">
           <div className='w-full md:w-9/12 flex flex-row justify-center gap-10 items-center '>
            <NavLink to='/sports'>
              <h1 className='text-white text-2xl md:text-[28px] font-serif font-bold px-4 
                cursor-pointer hover:mb-2 hover:scale-105'>Sports</h1>
            </NavLink>
              <NavLink to='/events'><h1 className='text-white text-2xl md:text-[28px] font-serif font-bold px-4 
                cursor-pointer hover:mb-2 hover:scale-105'>Events</h1>
              </NavLink>
             
           </div>
           <div className='w-full md:w-3/12 flex flex-row items-center justify-center gap-4 md:pb-0 pb-3'>
             { !login && <NavLink to='/login'><h1 className='text-3xl md:text-[25px] bg-white rounded-xl px-4 cursor-pointer opacity-70 font-serif 
              font-bold hover:opacity-100  hover:scale-105 hover:animate-buttonSlideUp'> Login</h1></NavLink>}
              { login && <h1 className='text-2xl md:text-[25px] bg-white rounded-xl px-4 cursor-pointer opacity-70 font-serif 
              font-bold hover:opacity-100  hover:scale-105 hover:animate-buttonSlideUp' onClick={logoutHandler}>Logout</h1>}
             {login && <NavLink to='/profile'><h1 className='text-2xl md:text-[25px] bg-white rounded-xl px-4 cursor-pointer opacity-70 font-serif 
              font-bold hover:opacity-100  hover:scale-105 hover:animate-buttonSlideUp'>Profile</h1></NavLink>}
           </div>
        </div>
      </div>
    )
}

export default Navbar