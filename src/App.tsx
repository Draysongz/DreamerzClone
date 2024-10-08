import { Box, ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import customTheme from "./components/theme"
import './index.css'
import HomePage from "./pages/HomePage";
import Game from "./pages/Game";
import Gamelist from "./components/Gamelist";
import Task from "./pages/Task";
import Friends from "./pages/Friends";
import Minigames from "./pages/Minigames";
import Profile from "./pages/Profile";
import { useUserLogin } from "./hooks/useAuth";
import WebApp from "@twa-dev/sdk";
import { useState, useEffect } from "react";
import Admin from "./pages/Admin"

function App() {
  const [telegramInitData, setTelegramInitData] = useState<string>("");
  const queryString = window.location.search; // Get the query string
  const urlParams = new URLSearchParams(queryString);
  const referralId = urlParams.get("referralCode")!
  

 
  // const telegramInitData  = "query_id=AAElBO5_AAAAACUE7n9PiZPp&user=%7B%22id%22%3A2146305061%2C%22first_name%22%3A%22Crypto%22%2C%22last_name%22%3A%22Dray%22%2C%22username%22%3A%22Habibilord%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1728202077&hash=8bf1e3cd6f0f4fdda851de17b4ae1e697086bd662c4e5eccbafdcc15441719a3"



  // Effect to set Telegram init data
  useEffect(() => {
    WebApp.expand();
    const initData = WebApp.initData;
    setTelegramInitData(initData);
  }, []);

  const {loading, userData} = useUserLogin(telegramInitData, referralId)
  console.log("userdata from app.tx", userData)








  if (loading) {
    return <div>Loading...</div>; // Better loading indication
  }

  return (
    <ChakraProvider theme={customTheme}>
    <Box width={'100vw'} overflowX={'hidden'}>
      <Router>
          <Routes>
            <Route index element={<HomePage userData={userData} />}  />
            <Route path="/gamelist" element={<Gamelist />}/>
            <Route path="/minigames" element={<Minigames userData={userData}/>}/>
            <Route path="/game/:gameType" element={<Game userData={userData} />} />
            <Route path="/tasks" element={<Task userData={userData}/>}/>
            <Route path="/friends" element={<Friends userData={userData}/>}/>
            <Route path="/profile" element={<Profile userData={userData} />}/>
            <Route path="/admin" element={<Admin />}/>
          </Routes>
        </Router>
    </Box>
    </ChakraProvider>
  )
}

export default App
