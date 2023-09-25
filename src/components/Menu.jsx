import styles from "styled-components";

import { LuCalendarCheck2 } from "react-icons/lu";
import { BiKey } from "react-icons/bi";
import { LuLayoutDashboard } from "react-icons/lu";
import { LuUser2 } from "react-icons/lu";
import { HiOutlinePuzzle } from "react-icons/hi";
import { FaHotel } from "react-icons/fa6"

import { NavLink } from "react-router-dom";
import { ProfileCompontent } from "./Profile";

export const Menu = ({setHeaderTitle}) => {
    const handleHeaderTitle = (titleName) => {
        setHeaderTitle(titleName);
    }

    return(
        <AsideMenu id="aside_menu">
            <NavLink to="/" style={{
                textDecoration: "none",
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "40px",
                marginBottom: "85px"
            }}>
                <FaHotel style={{ fontSize: "40px", color: "#135846", marginLeft: "50px" }}/>
                <SubTitle>
                    travl
                    <span>Hotel admin dashboard</span>
                </SubTitle>
            </NavLink>
            <List>
                <ItemsList onClick={() =>handleHeaderTitle('Dashboard')}>
                    <LuLayoutDashboard/>
                    <LinkStyled
                        to='/dashboard'>Dashboard
                    </LinkStyled>
                </ItemsList>
                <ItemsList  onClick={() =>handleHeaderTitle('Rooms')}>
                    <BiKey 
                        style={
                            {
                                transform: "rotate(90deg) rotateX(-180deg)",
                                fontSize: "32px",
                                marginLeft: "50px"
                            }
                    } />
                    <LinkStyled
                        to="/rooms">
                        Rooms
                    </LinkStyled>
                </ItemsList>
                <ItemsList  onClick={() =>handleHeaderTitle('Bookings')}>
                    <LuCalendarCheck2/>
                    <LinkStyled
                        to="/bookings">
                        Bookings
                    </LinkStyled>
                </ItemsList>
                <ItemsList  onClick={() =>handleHeaderTitle('Guest')}>
                    <LuUser2/>
                    <LinkStyled
                        to='/guest'>
                        Guest
                    </LinkStyled>
                </ItemsList>
                <ItemsList  onClick={() =>handleHeaderTitle('Concierge')}>
                    <HiOutlinePuzzle />
                    <LinkStyled
                        to='/concierge'>
                        Concierge
                    </LinkStyled>
                </ItemsList>
            </List>
            <ProfileCompontent/>
            <ContainerFooter>
                <TitleFooter>Travl Hotel Admin Dashboard</TitleFooter>
                <ParagraphFooter>© 2023 All Rights Reserved</ParagraphFooter>
            </ContainerFooter>
            <CreatorParagraph>Made with ♥ by ASDev</CreatorParagraph>
        </AsideMenu>

    );
}

const AsideMenu = styles.aside`
    height: 120vh;
    width: 345px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 13px 3px 40px #00000005;
    float: left;
`;

const ContainerFooter = styles.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 67px;
    align-items: baseline;
`;

const TitleFooter = styles.h4`
    color: #212121;
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
`;

const ParagraphFooter = styles.p`
    color: #799283;
    font-size: 14px;
    font-family: 'Poppins', sans-serif;
`;

const CreatorParagraph = styles.p`
    color: #799283;
    font-size: 14px; 
    font-family: 'Poppins', sans-serif;
    margin-bottom: 40px;
    align-self: baseline;
    margin-left: 40px;
`;

const List = styles.ul`
    display: flex;
    flex-direction: column;
    width: 100%;
    list-style: none;
`;

const ItemsList = styles.li`
    display: flex;
    width: 100%;
    margin-bottom: 30px;
    padding: 10px;
    border-radius: 0 6px 6px 0;
    transition: 0.3s;

    &.active {
        border-left: 4px solid #E23428;
        svg {
            color: #E23428;
        }
    }

    &:hover {
        border-left: 4px solid #E23428;
        color: #E23428;

        svg {
            color: #E23428;
        }
        
    }

    svg {
        font-size: 27px;
        color: #799283;
        margin-left: 50px;
    }
`;

const LinkStyled = styles(NavLink)`
    font-size: "16px";
    font-family: 'Poppins', sans serif;
    color: #799283;
    text-decoration: none;
    margin-left: 30px;

    &:hover {
        color: #E23428;
        transition: color 0.3s ease-in-out;
    }

    &.active {
        color: #E23428;
    }
`;


const SubTitle = styles.h2`
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 23px;
    font-weight: bold;
    color: #212121;
    font-family: 'Poppins', sans-serif;
    margin-right: 30px;
    margin-left: 30px;
    span {
        font-size: 12px;
        color: #5D5449;
        font-weight: 300;
    }
`;

