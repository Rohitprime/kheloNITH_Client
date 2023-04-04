
import { Link } from "react-router-dom"

const InTeam = ({inTeam})=>{

    const deleteHandler = ()=>{

    }
      
    return(
        <div className="w-full md:w-10/12 h-[100px] bg-[#32104b] rounded-lg flex-none flex 
                    md:flex-row flex-col" key={inTeam._id}>
            <div className='w-full md:w-9/12 h-full flex items-center justify-evenly'>
                    <Link to={`/specific/oneTeam/${inTeam._id}`} className="font-bold text-2xl text-white font-serif
                                hover:bg-[#de7bfc] px-2 rounded-lg">{inTeam?.teamName}
                    </Link>
                    <h1 className="font-bold text-2xl text-white font-serif">{inTeam?.type}</h1>
                    <h1 className="font-bold text-2xl text-white font-serif">{inTeam?.date}</h1>
             </div>
            <div className='w-full md:w-3/12 h-full  flex items-center justify-center gap-3 '>
                    <input type='button' value='Leave' name={inTeam?._id} className='w-3/12 md:w-5/12 h-[35px] md:h-[50px]  flex justify-center items-center
                    text-white text-lg bg-rose-600 rounded-lg cursor-pointer hover:scale-105' onClick={deleteHandler} />
             </div>
        </div>
    )
}


export default InTeam