import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { deleteRoom, getAllRooms, getRoom } from "../../features/roomsSlice";

import { SpinnerLoader } from "../Reusables/SpinnerLoader";
import { DeleteSpinner } from "../Reusables/DeleteSpinner";

import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";

import { MainContainer } from "../Reusables/MainContainer";
import { Tabla } from "../Reusables/Tabla";
import { AsideContext } from "../Context/ToggleAsideContext";
import { StatusParagraph } from "../Reusables/StatusParagraph";

export const RoomsList = () => {

    const {asideState} = useContext(AsideContext);

    const [isActiveButton, setIsActiveButton] = useState('allRooms');
    const [selectData, setSelectData] = useState('');
    const [dataRooms, setDataRooms] = useState([]);

    const allRooms = isActiveButton === 'allRooms';
    const statusAvailable = isActiveButton === 'statusAvailable';
    const statusBooked = isActiveButton === 'statusBooked';

    const roomsData = useSelector((state) => state.rooms.data);
    const roomsDataUpdated = useSelector((state) => state.rooms.updatedDataRoom);

    const status = useSelector((state) => state.rooms.status);
    const statusDelete = useSelector((state) => state.rooms.statusDelete);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleTab = (activeButton) => {
        setIsActiveButton(activeButton);
    }

    const handleSelect = (e) => {
        setSelectData(e.target.value);
    }

    const handleDelete = (id) => {
        dispatch(deleteRoom(id));
    }

    const handleEdit = (id) => {
        dispatch(getRoom(id));
        navigate(`/rooms/update-room/${id}`);
    }

    useEffect(() => {

        let dataArray = roomsDataUpdated.length !== 0 ? [ ...roomsDataUpdated] : [...roomsData];

        if (status === 'fulfilled') {
            setDataRooms(dataArray);
        }

        switch (isActiveButton) {
            case 'statusAvailable':
                dataArray = dataArray.filter(data => data.state === 'available');
                break;
            case 'statusBooked':
                dataArray = dataArray.filter(data => data.state === 'booked');
                break;
            case 'allRooms':
                dataArray.sort((a, b) => a.room_number - b.room_number);
                break;
            default:
                dataArray.sort((a, b) => a.room_number - b.room_number);
        }

        switch (selectData) {
            case 'Price':
                dataArray = dataArray.sort((a, b) => b.price - a.price);
                break;
            case 'Room Type':
                dataArray = dataArray.sort((a, b) => a.room_type.localeCompare(b.room_type));
                break;
            default:
                dataArray.sort((a, b) => a.room_number - b.room_number);
        }

        setDataRooms(dataArray);

    }, [isActiveButton, setDataRooms, selectData, roomsData, status, roomsDataUpdated])

    useEffect(() => {
        dispatch(getAllRooms());
    }, [dispatch]);

    const cols = [
        {
            property: 'image', label: 'Room Photo', display: ({ image }) => (
                <TableContainerBodyContent>
                    <img src={image || 'https://assets-global.website-files.com/5c6d6c45eaa55f57c6367749/65045f093c166fdddb4a94a5_x-65045f0266217.webp'} alt="imagen" />
                </TableContainerBodyContent>
            )
        },
        {
            property: 'room_number', label: 'Room Info', display: ({ id, room_number }) => (
                <TableContainerBodyContent>
                    <div>
                        <IDparagraph>{id}</IDparagraph>
                        <p>N. {room_number}</p>
                    </div>
                </TableContainerBodyContent>
            )
        },
        {
            property: 'room_type', label: 'Room Type'
        },
        {
            property: 'amenities', label: 'Amenities', display: ({ amenities }) => (
                <AmenitiesContainer>
                    <p>{amenities !== undefined ? amenities?.join(', ') : ''}</p>
                </AmenitiesContainer>
            )
        },
        {
            property: 'price', label: 'Price', display: ({ price, offer_price }) => (
                <PriceParagraph darkmode={asideState.darkMode.toString()}>
                    {offer_price ? <><del>{price}</del><small>/Night</small></> : <>{price}<small>/Night</small></>}
                </PriceParagraph>
            )
        },
        {
            property: 'offer_price', label: 'Offer Price', display: ({ offer_price, discount, price }) => (
                <Discount darkmode={asideState.darkMode.toString()}>{offer_price === false ? <del>No Offer</del> : (price - (discount * price / 100))}</Discount>
            )
        },
        {
            property: 'status', label: 'Status', display: ({ state, id }) =>
                <StatusContent>
                    <StatusParagraph status={state}>{state}</StatusParagraph>
                    <OptionsButton>
                        <BsTrash onClick={() => handleDelete(id)} />
                        <FiEdit onClick={() => handleEdit(id)} /> 
                    </OptionsButton>
                </StatusContent>
        }
    ]

    return (
        <>
            <MainContainer>
                <RoomsContainer>
                    <FilterContainer>
                    {statusDelete === 'pending' && <DeleteSpinner/>}
                        <TabsContainer>
                            <ButtonTabs darkmode={asideState.darkMode.toString()} actived={allRooms} onClick={() => handleTab('allRooms')}>
                                All Rooms
                            </ButtonTabs>
                            <ButtonTabs darkmode={asideState.darkMode.toString()} actived={statusAvailable} onClick={() => handleTab('statusAvailable')}>
                                All Available
                            </ButtonTabs>
                            <ButtonTabs darkmode={asideState.darkMode.toString()} actived={statusBooked} onClick={() => handleTab('statusBooked')}>
                                All Booked
                            </ButtonTabs>
                        </TabsContainer>
                        <Filters>
                            <ButtonCreateRoom onClick={() => navigate('/rooms/add-room')}>
                                + New Room
                            </ButtonCreateRoom>
                            <Select onChange={handleSelect}>
                                <Option>Price</Option>
                                <Option>Room Type</Option>
                            </Select>
                        </Filters>
                    </FilterContainer>
                    {status === 'fulfilled' || status === 'loading'
                        ? <Tabla cols={cols} data={dataRooms} totalCols={7} totalHeaders={7} />
                        : status === 'rejected' ? <p>Ha habido un error (pendiente de meter el Toast)</p> 
                            : <SpinnerLoader></SpinnerLoader>
                    }
                </RoomsContainer>
            </MainContainer>
        </>

    )
}

const RoomsContainer = styled.div`
    margin-top: 50px;
    margin-left: 70px;
    min-width: 1400px;
    display: flex;
    flex-direction: column;
    margin-bottom: 50px;
`;

const FilterContainer = styled.div`
    width: 100%;
    display: flex;
    height: 70px;
    max-width: 1400px;
`;

const TabsContainer = styled.div`
    width: 40%;
    display: flex;
    border-bottom: 1px solid #00000010;
    align-self: center;
`;


const Buttons = styled.button`
    border: none;
    background: none;
    cursor: pointer;
`;

const ButtonTabs = styled(Buttons)`
    color: ${props => props.actived ? "#135846" : "#6E6E6E"};
    border-bottom: ${props => props.actived ? "2px solid #135846" : "none"};
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
    height: 30px;
    width: 30%;

    &:hover {
        color: #135846;
        border-bottom: 2px solid #135846;
    }

`;

const ButtonCreateRoom = styled(Buttons)`
    background: #135846;
    color: #FFFFFF;
    width: 213px;
    height: 49px;
    border-radius: 12px;
    margin-right: 20px;
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
    transition: 0.3s;
    box-shadow: 0px 3px 10px #00000030;
    cursor: pointer;

    &:hover {
        background: #799283;
    }
`;

const Filters = styled.div`
    width: 60%;
    display: flex;
    justify-content: flex-end;
    align-items: end;

    input {
        width: 427px;
        height: 50px;
        margin-right: 20px;
        outline: #135846;
        border: none;
        background: #135846 0% 0% no-repeat padding-box;
        border-radius: 12px;
        color: #ffffff;
        font-size: 16px;
        font-family: 'Poppins', sans-serif;
        padding-left: 10px;
    }
`;

const Select = styled.select`
    width: 129px; 
    height: 50px;
    border: 1px solid #135846;
    border-radius: 12px;
    color: #135846;
    background: none;
    text-align: center;
    font-size: 16px;
    cursor: pointer;
    
`;

const Option = styled.option`
    background: #ffffff;
`;

const TableBodyContent = styled.div`
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
    position: relative;
    display: flex;
    flex-direction: column;

    div {
        height: 80px;
        width: 140px;
        position: absolute;
        background: #ffffff;
        top: -20px;
        left: -30px;
        box-shadow: 0px 4px 4px #00000010;
        border-radius: 10px;
        transition: 0.5s;
    }

`;

const StatusContent = styled(TableBodyContent)`
    display: flex;
    flex-direction: row;
    
    p {
        display: flex;
        align-items: center;
    }
`;

const OptionsButton = styled(Buttons)`
    font-size: 30px;
    color:#393939;
    display: flex;
    flex-direction: column;

    svg:nth-child(1) {
        color: #E23428;
        margin-left: 10px;
        transition: 0.5s;
        font-size: 1.05em;

        &:hover {
            transform: scale(1.1, 1.1);
        }
    }

    svg:nth-child(2) {
        color: #5AD07A;
        margin-left: 13px;
        margin-top: 8px;
        transition: 0.5s;
        font-size: 0.9em;

        &:hover {
            transform: scale(1.1, 1.1);
        }
    }
`;


const TableContainerBodyContent = styled.div`
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
    position: relative;
    display: flex;
    justify-content: center;
    padding: 10px;

    p {
        font-family: inherit;
        font-size: 1.1em;
    }

    img {
        width: 100%;
        height: 120px;
        background: #C5C5C5;
        border-radius: 10px;
    }

    div {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-left: 20px;
    }

`;
const IDparagraph = styled.p`
    color: #799283;
    font-size: 16px;
`;

const AmenitiesContainer = styled.div`
    width: 100%;
    font-size: 14px;
    padding: 10px;
`;

const PriceParagraph = styled.p`
    color: ${props => props.darkmode === 'true' ? '#fff' : '#212121'};
    font-weight: bold;
    font-size: 20px;
    transition: 0.5s;

    small {
        color: #799283;
        font-size: 14px;
        margin-left: 5px;
    }
`;

const Discount = styled.div`
    font-weight: bold;
    font-size: 20px;
    color: ${props => props.darkmode === 'true' ? '#fff' : '#212121'};
    transition: 0.5s;
`;

