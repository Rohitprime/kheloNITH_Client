
import { RiUserReceivedFill } from 'react-icons/ri'
import { BsFillSendFill } from 'react-icons/bs'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import NotisReceive from './NotisReceive'
import NotisApply from './NotisApply'


const TeamNotis = () => {

    const [noti, setNoti] = useState({ received: true, send: false })
    const user = useSelector(state => state.profile.user)
   

    const sendOpenHandler = () => {
        setNoti({ received: false, send: true })
    }

    const receivedOpenHandler = () => {
        setNoti({ send: false, received: true })
    }

    return (
        <div className="w-full md:h-full  flex flex-col relative gap-3 bg-white/10">
            <div className="w-full h-[50px] md:h-[80px]  flex flex-row px-3 md:gap-8 gap-3 mt-2">
                <div className='w-6/12 h-full flex justify-center items-center hover:scale-105 cursor-pointer
                  bg-white/30 rounded-lg' onClick={receivedOpenHandler}>
                    <RiUserReceivedFill className='text-lg md:text-3xl font-serif font-bold text-white' />
                    <span className='text-lg md:text-3xl font-serif font-bold text-white ml-2'>Requests</span>
                </div>
                <div className='w-6/12 h-full flex justify-center items-center hover:scale-105 cursor-pointer
                  bg-white/30 rounded-lg' onClick={sendOpenHandler}>
                    <BsFillSendFill className='text-lg md:text-3xl font-serif font-bold text-white' />
                    <span className='text-lg md:text-3xl font-serif font-bold text-white ml-2'>Applied</span>
                </div>
            </div>

            {
                noti.received &&
                <div className='w-full flex flex-col justify-center items-center gap-6 mt-3 overflow-y-scroll scrollbar-hide'>
                   <h1 className='text-white/80 font-bold text-xl my-2'>All Your Received</h1>
                    {user?.notifications?.map(notis => (
                        <>
                            {
                                notis?.to?._id == user?._id && notis?.typeOfNotis=='team' &&
                                <NotisReceive notis={notis}/>
                            }
                        </>
                    ))}

                </div>
            }
            {
                noti.send &&
                <div className='w-full flex flex-col justify-center items-center gap-3 mt-3 overflow-y-scroll scrollbar-hide'>
                    <h1 className='text-white/80 font-bold text-xl my-2'>All Your Applied </h1>
                      {user?.notifications?.map(notis => (
                        <>
                            {
                                notis?.from?._id == user?._id && notis?.typeOfNotis=='team' &&
                                <NotisApply notis={notis}/>
                            }
                        </>
                    ))}
                </div>
            }
        </div>
    )
}

export default TeamNotis