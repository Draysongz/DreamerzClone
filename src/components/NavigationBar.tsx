import { Box, Icon } from "@chakra-ui/react"
import { Link, useLocation } from "react-router-dom"
import { GoHomeFill } from "react-icons/go";
import { IoLogoGameControllerB } from "react-icons/io";
import { MdAdminPanelSettings } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";
// import { HiMiniTrophy } from "react-icons/hi2";
import { PiCoinsFill } from "react-icons/pi";
// import { TbTournament } from "react-icons/tb";

interface NavItemProps {
    icon: React.ReactNode;
    isActive?: boolean;
    to: string; 
}

const NavItem: React.FC<NavItemProps> = ({
    icon, isActive = false, to
}) => (
    <Link to={to}>
        <Box
        className={`flex ${ 
            isActive ? "text-black" : "text-gray-300"}`}
        >
            {icon}
        </Box>
    </Link>
)


const NavigationBar: React.FC = () => {
    const location = useLocation();
    const isGameActive = location.pathname.startsWith("/game");
    const isProfileActive = location.pathname.startsWith("/profile")
    return(
        <nav>
        <Box
        bgColor={'#fff'}
        width={'100%'}
        display={'flex'}
        height={'80px'}
        alignItems={'center'}
        justifyContent={'space-around'}
        position={'fixed'}
        bottom={0}
        right={0}
        boxShadow={'0px 0px 8px 8px #ffffff'}
        zIndex={
            80
        }
        // color={'rgba(0, 0, 0, 0.3)'}
        >
            <NavItem
                icon={
                    <Icon as={GoHomeFill} boxSize={8}/>
                }
                isActive={isProfileActive || location.pathname === "/"}
                to="/"
            />
            <NavItem
                icon={
                    <Icon as={IoLogoGameControllerB} boxSize={8}/>
                }
                isActive={isGameActive || location.pathname=="/minigames"}
                to="/minigames"
            />
            <NavItem
                icon={
                    <Icon as={PiCoinsFill} boxSize={8}/>
                }
                isActive={location.pathname === "/tasks"}
                to="/tasks"
            />
            <NavItem
                icon={
                    <Icon as={RiTeamFill} boxSize={8}/>
                }
                isActive={location.pathname === "/friends"}
                to="/friends"
            />
            <NavItem
                icon={
                    <Icon as={MdAdminPanelSettings} boxSize={8}/>
                }
                isActive={location.pathname === "/admin"}
                to="/admin"
            />
        </Box>
        </nav>
    )
}

export default NavigationBar