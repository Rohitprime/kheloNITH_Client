import bg from '../../assets/events/bg1.png'
import ece from '../../assets/dummy/ece.png'
import cse from '../../assets/dummy/cse.png'

const UpcomingEvents = ({ eventName = "InterBranch", place = "SportGround", time = '10:30', sportType='Cricket' }) => {
    return (
        <>
            <h1 className="text-white font-bold text-6xl text-center my-5 py-2 font-serif">Upcoming Events</h1>
            <div className="w-full h-[500px] relative">
                <div className="absolute w-full h-full">
                    <img src={bg} alt="" className="w-full h-full bg-gradient-to-br from-[#32104b] to-[#2b0a3d]" />
                </div>
                <div className="absolute w-full h-full flex flex-row items-center px-24 gap-14 overflow-x-scroll  opacity-90
        backdrop-blur-2xl bg-transparent snap-x snap-mandatory scrollbar-hide">

                    <div className="w-screen sm:w-[1200px] h-[450px] bg-gradient-to-br from-[#61397d] to-[#918895] flex-none  rounded-xl animate-slideleft  
                          shadow-lg shrink-0 snap-center" >
                        <div className="w-full h-full flex flex-col p-4 gap-1  relative">
                            <div className="w-full h-[80px]  flex justify-center items-center text-6xl font-bold text-white font-serif
                         bg-clip-text  text-transparent bg-gradient-to-br from-[#ce6d30] to-[#c3a041]">{eventName}</div>
                            <div className="w-full h-[300px] flex px-10">
                                <div className='w-5/12 h-full rounded-2xl flex flex-col items-center'>
                                    <img src={ece} alt="" className='w-[250px] h-[250px]'/>
                                    <h1 className='text-center font-bold text-5xl bg-gradient-to-br from-[#ce6d30] to-[#c3a041]
                                     bg-clip-text  text-transparent'>ECE</h1>

                                </div>
                                <div className='w-2/12 h-full flex justify-center items-center text-[100px] text-[#e2e4e7] font-serif
                                bg-clip-text  text-transparent bg-gradient-to-br from-[#ce6d30] to-[#c3a041]'>Vs</div>
                                <div className='w-5/12 h-full rounded-2xl flex flex-col items-center'>
                                     <img src={cse} alt="" className='w-[250px] h-[250px]' />
                                     <h1 className='text-center font-bold text-5xl bg-gradient-to-br from-[#ce6d30] to-[#c3a041]
                                      bg-clip-text  text-transparent'>CSE</h1>
                                </div>
                            </div>
                            <div className="w-full h-[50px] flex justify-center items-center flex-row gap-1 ">
                               <h1 className='w-full h-full text-center font-bold text-[#fb8b35] text-5xl font-serif '>{sportType}</h1>
                            </div>
                               <h1 className='w-[300px] h-[50px] rounded-xl flex justify-center items-center -top-4 right-3 font-bold text-[#be0303] text-2xl font-serif absolute 
                               bg-[#e1f503]'>{place} -- {time}</h1>
                        </div>
                    </div>
                    <div className="w-screen sm:w-[1200px] h-[450px] bg-gradient-to-br from-[#61397d] to-[#918895] flex-none  rounded-xl animate-slideleft  
                          shadow-lg shrink-0 snap-center" >
                        <div className="w-full h-full flex flex-col p-4 gap-1  relative">
                            <div className="w-full h-[80px]  flex justify-center items-center text-6xl font-bold text-white font-serif
                         bg-clip-text  text-transparent bg-gradient-to-br from-[#ce6d30] to-[#c3a041]">{eventName}</div>
                            <div className="w-full h-[300px] flex px-10">
                                <div className='w-5/12 h-full rounded-2xl flex flex-col items-center'>
                                    <img src={ece} alt="" className='w-[250px] h-[250px]'/>
                                    <h1 className='text-center font-bold text-5xl bg-gradient-to-br from-[#ce6d30] to-[#c3a041]
                                     bg-clip-text  text-transparent'>ECE</h1>

                                </div>
                                <div className='w-2/12 h-full flex justify-center items-center text-[100px] text-[#e2e4e7] font-serif
                                bg-clip-text  text-transparent bg-gradient-to-br from-[#ce6d30] to-[#c3a041]'>Vs</div>
                                <div className='w-5/12 h-full rounded-2xl flex flex-col items-center'>
                                     <img src={cse} alt="" className='w-[250px] h-[250px]' />
                                     <h1 className='text-center font-bold text-5xl bg-gradient-to-br from-[#ce6d30] to-[#c3a041]
                                      bg-clip-text  text-transparent'>CSE</h1>
                                </div>
                            </div>
                            <div className="w-full h-[50px] flex justify-center items-center flex-row gap-1 ">
                               <h1 className='w-full h-full text-center font-bold text-[#fb8b35] text-5xl font-serif '>{sportType}</h1>
                            </div>
                               <h1 className='w-[300px] h-[50px] rounded-xl flex justify-center items-center -top-4 right-3 font-bold text-[#be0303] text-2xl font-serif absolute 
                               bg-[#e1f503]'>{place} -- {time}</h1>
                        </div>
                    </div>
                   
                    </div>
                    

                </div>
        </>
    )
}

export default UpcomingEvents