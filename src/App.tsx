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

function App() {
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
