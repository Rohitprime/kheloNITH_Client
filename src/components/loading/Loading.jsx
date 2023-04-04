import loadin from '../../assets/gif/Ripple.gif'

const Loading = ()=>(
    <div className="w-screen h-screen bg-[#210732] flex justify-center">
          <img src={loadin} className="w-[400px] h-[400px]" />
    </div>
)

export default Loading