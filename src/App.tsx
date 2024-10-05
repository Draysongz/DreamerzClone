import { Box, ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import customTheme from "./components/theme"
import './index.css'
import HomePage from "./pages/HomePage";
import Game from "./pages/Game";
import Gamelist from "./components/Gamelist";
import Tournament from "./pages/Tournament";
import Friends from "./pages/Friends";
import Minigames from "./pages/Minigames";
import Profile from "./pages/Profile";
import { useAuth } from "./context/AuthContext";
import WebApp from "@twa-dev/sdk";
import { useState, useEffect } from "react";

function App() {
  const [telegramInitData, setTelegramInitData] = useState<string>("");

  const { login, user } = useAuth();
  // const telegramInitData ="query_id=AAElBO5_AAAAACUE7n-OXKaOuser=%7B%22id%22%3A2146305061%2C%22first_name%22%3A%22Crypto%22%2C%22last_name%22%3A%22Dray%22%2C%22username%22%3A%22Habibilord%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1728157663&hash=88abaf102c4ab57a7e55922b2cd25debd5361e81becf43e10e3625225a2c6345"

  // Effect to set Telegram init data
  useEffect(() => {
    const initData = WebApp.initData;
    setTelegramInitData(initData);
  }, []);

  useEffect(()=>{
    if(user){
      alert(user)
    }
  }, [user])

  // Call the login function when telegramInitData is available
  useEffect(() => {
    if (telegramInitData) {
      login(telegramInitData);
    }
  }, [telegramInitData, login]);

  if (!user) {
    return <div>Loading...</div>; // Better loading indication
  }

  return (
    <ChakraProvider theme={customTheme}>
    <Box width={'100vw'} overflowX={'hidden'}>
      <Router>
          <Routes>
            <Route index element={<HomePage />}  />
            <Route path="/gamelist" element={<Gamelist />}/>
            <Route path="/minigames" element={<Minigames />}/>
            <Route path="/game/:gameType" element={<Game />} />
            <Route path="/tournament" element={<Tournament />}/>
            <Route path="/friends" element={<Friends />}/>
            <Route path="/profile" element={<Profile />}/>
          </Routes>
        </Router>
    </Box>
    </ChakraProvider>
  )
}

export default App
