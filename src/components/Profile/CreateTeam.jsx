import { Link, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authAction } from "../../store/auth";
import { notificationAction } from "../../store/notfications";
import { profileAction } from "../../store/profile";
import backendURl from "../helpers/backendUrl";

const CreateTeam = () => {
  const dispatch = useDispatch();
  const [team, setTeam] = useState({
    name: "",
    emailOfPlayers: [],
    notp: 2,
    type: "",
    letApply:'no'
  });
  const [emailOfOnePlayer, setEmailOfOnePlayer] = useState("");
  const [arrayOfPlayer, setArrayOfPlayer] = useState([]);
  const [teamError, setTeamError] = useState({
    ename: false,
    eemailOfPlayers: false,
    enotp: false,
    etype: false,
  });
  let emailArray = useMemo(() => {
    return [];
  }, []);

  const nameHandler = (e) => {
    setTeamError({ ...teamError, ename: false });
    setTeam({ ...team, name: e.target.value });
  };

  const typeHandler = (e) => {
    setTeamError({ ...teamError, etype: false });
    setTeam({ ...team, type: e.target.value });
  };

  const notpHandler = (e) => {
    const value = e.target.value;
    setTeamError({ ...teamError, enotp: false });
    setTeam({ ...team, notp: value });

    emailArray.length = value;

    for (let i = 0; i < value; i++) {
      emailArray[i] = 0;
    }
    setArrayOfPlayer(emailArray);
  };

  const emailOfPlayersHandler = (e) => {
    const { value, name } = e.target;
    setTeamError({ ...teamError, eemailOfPlayers: false });
    setEmailOfOnePlayer(e.target.value);
    emailArray[name] = value;
    setTeam({ ...team, emailOfPlayers: emailArray });
  };

  const applyHandler = (e)=>{
      const applyChoise = e.target.value
      
      setTeam({...team,letApply:applyChoise})
  }

  const submintHandler = async (e) => {
    e.preventDefault();

    if (team.type === "") {
      setTeamError({ ...teamError, etype: true });
      return;
    }

    if (team.name === "") {
      setTeamError({ ...teamError, ename: true });
      return;
    }

    if (team.notp < 2 || team.notp > 15) {
      setTeamError({ ...teamError, enotp: true });
      return;
    }
    
    dispatch(notificationAction.setFunction({functionMessage:'creating Team'}))

    try {
      const token = await localStorage.getItem("token");
      const res = await axios.post(
        `${backendURl}/kheloNITH/team/createTeam`,
        { ...team, token }
      );

      if (res.data.error) {
        dispatch(notificationAction.setNotification({type: "error",message: res.data.error,}));
        dispatch(notificationAction.setDontFunction())
        return;
      }
      dispatch(profileAction.setReRun());
      dispatch(notificationAction.setNotification({type: "success",message: res.data.message,}));
      dispatch(notificationAction.setDontFunction())
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className=" overflow-y-scroll w-screen h-screen scrollbar-hide">
      <div className="w-full h-full  flex flex-col items-center z-[1] backdrop-blur-sm">
        <form
          className="w-11/12 md:w-5/12  bg-gradient-to-b from-[#d577fd] to-[#dfe5eb] backdrop-blur-2xl rounded-3xl mt-[80px] 
                animate-slideup flex flex-col items-center shadow-2xl"
          onSubmit={submintHandler}
        >
          <h1 className="font-bold text-[50px] text-[#062147] mt-[15px] font-serif">
            Create Team
          </h1>

          <select
            type=""
            className={`w-9/12 h-[55px]  mt-[10px] text-start shadow-xl font-bold text-2xl focus:outline-none
                    border-b-[5px] text-black bg-transparent  ${
                      teamError.etype &&
                      "border-b-8 border-b-rose-900 placeholder-rose-900"
                    }`}
            placeholder="Name"
            onChange={typeHandler}
          >
            <option value=''></option>
            <option value="cricket">cricket</option>
            <option value="football">football</option>
            <option value="chess">chess</option>
            <option value="vollyball">vollyball</option>
          </select>

          <input
            type="text"
            className={`w-9/12 h-[55px]  mt-[10px] text-start shadow-2xl font-bold text-2xl focus:outline-none
                    border-b-[5px] text-white bg-transparent placeholder-[#062147] ${
                      teamError.ename &&
                      "border-b-8 border-b-rose-900 placeholder-rose-900"
                    }`}
            placeholder="Team Name"
            onChange={nameHandler}
          />

          <input
            type="number"
            className={`w-9/12 h-[55px] mt-[20px] text-start placeholder-[#031732] bg-transparent shadow-2xl focus:outline-none
                     border-b-[5px] font-bold text-2xl ${
                       teamError.enotp &&
                       "border-b-8 border-b-rose-900 placeholder-rose-900"
                     }`}
            placeholder="Number Of Team Player"
            onChange={notpHandler}
            min="2"
            max="15"
          />

          {arrayOfPlayer.map((arr, i) => (
            <div className="w-9/12 flex flex-row mt-[20px]" key={i}>
              <input
                type="email"
                className={`w-full h-[55px]   text-start shadow-2xl font-bold text-2xl focus:outline-none
                            border-b-[5px] text-white bg-transparent placeholder-[#062147] ${
                              teamError.eemailOfPlayers &&
                              "border-b-8 border-b-rose-900 placeholder-rose-900"
                            }`}
                placeholder={`Email Of ${i + 1}rd Player`}
                onChange={emailOfPlayersHandler}
                name={i}
                required
              />
            </div>
          ))}
           

           <div className={`w-9/12 p-2  mt-[30px] text-start shadow-2xl font-bold text-2xl 
                    border-b-[5px] bg-transparent text-[#000000] flex flex-col gap-2 ${
                      teamError.ename &&
                      "border-b-8 border-b-rose-900 placeholder-rose-900"
                    }`}
                >
              <h1 className="flex p-2">Can a player send you a request for joining, this team ?</h1>
              <div className="flex w-full justify-center gap-5">
                  <input type="radio" id="html" name="fav_language" value="yes" onClick={applyHandler}/>
                  <label for="html">Yes</label><br/>
                  <input type="radio" id="css" name="fav_language" value="no" defaultChecked='true' onClick={applyHandler}/>
                  <label for="css">No</label>
              </div>
         </div>
  

          <button
            type="submit"
            className="w-4/12 h-[55px] rounded-xl my-[40px] text-center bg-gradient-to-br  from-[#cf83ff] to-[#6f118c] shadow-2xl
                     font-bold text-xl text-white hover:scale-105"
          >
            submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTeam;
