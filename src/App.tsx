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
import { useUserLogin } from "./hooks/useAuth";
import WebApp from "@twa-dev/sdk";
import { useState, useEffect } from "react";

function App() {
  const [telegramInitData, setTelegramInitData] = useState<string>("");
  const [photoUrl, setPhotoUrl] = useState<string>("")

 
  // const hash  = "query_id=AAElBO5_AAAAACUE7n9PiZPp&user=%7B%22id%22%3A2146305061%2C%22first_name%22%3A%22Crypto%22%2C%22last_name%22%3A%22Dray%22%2C%22username%22%3A%22Habibilord%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1728202077&hash=8bf1e3cd6f0f4fdda851de17b4ae1e697086bd662c4e5eccbafdcc15441719a3"

  const {loading, userData} = useUserLogin(telegramInitData, photoUrl)

  // Effect to set Telegram init data
  useEffect(() => {
    WebApp.expand();
    const initData = WebApp.initData;
    const unsafeInit = WebApp.initDataUnsafe
      if (unsafeInit && unsafeInit.user && unsafeInit.user.photo_url) {
      setPhotoUrl(unsafeInit.user.photo_url);
    }
    setTelegramInitData(initData);
  }, []);










  if (loading) {
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
            <Route path="/profile" element={<Profile userData={userData} />}/>
          </Routes>
        </Router>
    </Box>
    </ChakraProvider>
  )
}

export default App
