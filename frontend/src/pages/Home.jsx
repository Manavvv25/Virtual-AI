import React, { useContext, useEffect, useState } from 'react'
import { userDataContext } from '../context/userContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import ai from "../assets/ai.gif"
import user from "../assets/user.gif"
import { BiMenuAltRight } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";

function Home() {
  const { userData, serverurl, setUserData, getGeminiResponse } = useContext(userDataContext)
  const [messages, setMessages] = useState([]);
  const [listening, setListening] = useState(false);
  const[ham,setham]=useState(false);
  const [userText, setuserText] = useState("");
  const [aiText, setaiText] = useState("");
  const isSpeakingRef = React.useRef(false);
  const recognitionRef = React.useRef(null);
  const synth = window.speechSynthesis;

  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      const result = await axios.get(`${serverurl}/api/auth/logout`, { withCredentials: true });
      setUserData(null);
      navigate("/signup");
    } catch (error) {
      setUserData(null);
      console.log(error);
    }
  };
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);

    isSpeakingRef.current = true;
    utterance.onend=()=>{
      setaiText("");
      isSpeakingRef.current=false;
      
    }
    synth.speak(utterance);
  }
  const handleCommand = (data) => {
    const { type, userInput, response } = data;
    speak(data.response);
    if(type==="google_search"){
      const query = encodeURIComponent(userInput);
      window.open(`https://www.google.com/search?q=${query}`, '_blank');
    }
    if(type==="youtube_search"){
  const query = encodeURIComponent(userInput);
  window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
}

if(type==="youtube_play"){
  const query = encodeURIComponent(userInput);

  // Use YouTube's search API to get first video
  fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${query}&key=AIzaSyAVF3tXJDXThuD9N8ezaQ4WnmvHVLRwDW4`)
    .then(res => res.json())
    .then(data => {
      if(data.items && data.items.length > 0){
        const videoId = data.items[0].id.videoId;
        window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
      } else {
        speak("Sorry, I couldn't find that video on YouTube.");
      }
    })
    .catch(err => {
      console.error(err);
      speak("There was an error fetching the video.");
    });
}

    
    if(type==="weather_show"){
      window.open(`https://www.weather.com`, '_blank');
    }
    if(type==="calculator_open"){
      window.open(`https://www.google.com/search?q=calculator`, '_blank');
    }
    if(type==="instagram_open"){
      const query = encodeURIComponent(userInput);
      window.open(`https://www.instagram.com`, '_blank');
    }
    if(type==="facebook_open"){
      const query = encodeURIComponent(userInput);
      window.open(`https://www.facebook.com`, '_blank');
    }
  }

    useEffect(() => {
  if (!userData?.assistantName) return;

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.lang = "en-US";
  recognitionRef.current = recognition;

  const isRecognizingRef = { current: false };

  const safeRecognition = () => {
    if (!isSpeakingRef.current && !isRecognizingRef.current) {
      try {
        recognition.start();
      } catch (error) {
        if (error.name !== "InvalidStateError") {
          console.error("Error starting recognition:", error);
        }
      }
    }
  };

  recognition.onstart = () => {
    isRecognizingRef.current = true;
    setListening(true);
  };

  recognition.onend = () => {
    isRecognizingRef.current = false;
    setListening(false);

    if (!isSpeakingRef.current) {
      setTimeout(() => {
        safeRecognition();
      }, 1000);
    }
  };

  recognition.onerror = (event) => {
    console.warn("Recognition error:", event.error);
    isRecognizingRef.current = false;
    setListening(false);

    if (event.error !== "aborted" && !isSpeakingRef.current) {
      setTimeout(() => {
        safeRecognition();
      }, 1000);
    }
  };

  recognition.onresult = async (e) => {
    const transcript = e.results[e.results.length - 1][0].transcript.trim();
    console.log("User said: " + transcript);

    if (userData?.assistantName && transcript.toLowerCase().includes(userData.assistantName.toLowerCase())) {
      try {
        const data = await getGeminiResponse(transcript);
        setaiText("");
        setuserText(transcript);   
        if (data?.response) {
          handleCommand(data);
          setaiText(data.response);
          setuserText("");
          
        }

        setMessages((prev) => [
          ...prev,
          { role: "user", text: data.userInput },
          { role: "assistant", text: data.response }
        ]);
      } catch (error) {
        console.error(error);
      }
    }
  };

  recognition.start();

  // ✅ CLEANUP when leaving Home
  return () => {
    console.log("Cleaning up recognition...");
    recognition.onstart = null;
    recognition.onend = null;
    recognition.onerror = null;
    recognition.onresult = null;
    recognition.stop();
  };

}, [userData]);

  




    return (
      <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#02023d] flex justify-center items-center overflow-hidden flex-col'>
        <div className='w-[300px] h-[400px] flex justify-center
 items-center overflow-hidden rounded-4xl gap-15px'>
          <BiMenuAltRight className='lg:hidden cursor-pointer text-white absolute top-[20px] w-[25px] h-[25px] right-[20px]' onClick={() => setham(true)}/>
          <div className={`absolute top-0 lg:hidden w-full h-full bg-[#0000001f] backdrop-blur-lg p-[20px] flex flex-col gap-[10px] items-start ${ham?"translate-x-0":"translate-x-full"} transition-transform`}>

          <RxCross1 className=' text-white cursor-pointer absolute top-[20px] w-[25px] h-[25px] right-[20px]' onClick={() => setham(false)} />
           <button className="min-w-[150px] h-[60px] mt-[30px] text-black font-semibold bg-white rounded-full cursor-pointer text-[19px]" onClick={handleLogOut}>Log Out
          </button>
          <button className="min-w-[150px] h-[60px] mt-[30px] text-black font-semibold  bg-white  rounded-full cursor-pointer text-[19px] px-[20px] py-[20px]" onClick={() => navigate("/customize")}>Customize Your Assistant
          </button>
          </div>
          <button className="min-w-[150px] h-[60px] mt-[30px] text-black font-semibold absolute top-[20px] right-[20px] bg-white cursor-pointer rounded-full text-[19px] hidden lg:block" onClick={handleLogOut}>Log Out
          </button>
          <button className="min-w-[150px] h-[60px] mt-[30px] text-black font-semibold absolute top-[100px] right-[20px] bg-white cursor-pointer  rounded-full text-[19px] px-[20px] py-[20px] hidden lg:block" onClick={() => navigate("/customize")}>Customize Your Assistant
          </button>
          <img src={userData?.assistantImage}
            alt=""
            className="h-full object-cover font-semibold rounded-2xl shadow-2xl shadow-blue-950" />
        </div>
        <h1 className="text-white font-semibold">I'm {userData?.assistantName}</h1>
        {!aiText && <img src={user} alt="" className='w-[200px]'/>}
        {aiText && <img src={ai} alt="" className='w-[200px]'/>}
        <h1 className='text-white text-[18px] font-semibold text-center p-4'>
          {userText?userText:aiText?aiText:null}
        </h1>
      </div>
    )
  }

  export default Home