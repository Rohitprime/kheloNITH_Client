
import sports from '../../assets/homebg.png'

const Home = () => {
    return (
        <div className=' w-screen h-screen flex flex-col md:flex-row bg-gradient-to-br from-[#6e3ba4] to-[#493852]
          md:mt-0 mt-[150px]'>
            <div className="w-full md:w-5/12 md:h-full h-[200px] flex justify-center md:justify-end items-center  md:ml-16
               mt-10">
                <img src={sports} className="md:w-[1200px] md:h-[560px] w-[250px] h-[250px]" />
            </div>
            <div className='w-full md:w-7/12 h-full flex flex-col z-[1] backdrop-blur-lg
             animate-slidedown   items-center mt-[70px]' >
                <h1 className='md:text-[150px] font-bold bg-clip-text  md:mt-[100px] text-transparent bg-gradient-to-br from-[#ce6d30] to-[#c3a041]
                   text-[70px] text-center '>KheloNITH</h1>
               <h1 className=' font-bold text-white md:text-2xl text-xl ml-[250px] p-1'> BE A PART OF THE <b className='text-[#ff1515]'>GAME</b>  </h1> 
              
               <div className='w-full md:w-7/12 h-[300px] mt-10 rounded-3xl opacity-75 flex flex-wrap p-4'>
                   <h1 className='flex flex-wrap text-white text-xl font-bold text-center'>
                    As a player, get noticed and increase your chances of being one of the best in numerous players.<br/> Boost your college life with sports and make it a better one.</h1>
               </div>
              
            </div>
        </div>
    )
}

export default Home