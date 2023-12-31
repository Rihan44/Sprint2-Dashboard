import styled from "styled-components";
import Swal from 'sweetalert2';

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';

import { AiOutlineCheckCircle } from "react-icons/ai";
import { AiOutlineFullscreen } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { ContactInterface } from "../../interfaces/contactInterface";
import { archiveMessage } from "../../features/slices/contacts/contactThunk";

interface LastetReviewProps {
    darkMode: boolean | undefined,
    dataDashboard: ContactInterface[]
}

export const LastestReview: React.FC<LastetReviewProps> = ({ darkMode, dataDashboard }) => {

    const [modalInfo, setModalInfo] = useState({
        emailSubject: '',
        emailUser: '',
        emailInfo: ''
    });
    const [modalOpen, setModalOpen] = useState(false);

    const dispatch = useAppDispatch();

    const handleOpen = (data: ContactInterface, id: string | undefined | number) => {
        const MessageChecked = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 2000,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        setModalInfo({emailInfo: data.email_description, emailSubject: data.email_subject, emailUser: data.email});
        setModalOpen(true);

        const dataMessage = {
            id: id,
            isArchived: true
        }

        if(id !== undefined){
            dispatch(archiveMessage(dataMessage));
            if(!data.isArchived) {
                MessageChecked.fire({
                    icon: 'success',
                    title: 'Message Checked!'
                })
            }
        }

    }

    const handleCloseModal = () => {
        setModalOpen(false);
    }

    return (
        <>
            <Modal modalopen={modalOpen}>
                <ModalInfo>
                    <ButtonModalClose onClick={handleCloseModal}>
                        <AiOutlineCloseCircle />
                    </ButtonModalClose>
                    <h4>{modalInfo.emailSubject}</h4>
                    <p>{modalInfo.emailUser}</p>
                    <p>{modalInfo.emailInfo}</p>
                </ModalInfo>
            </Modal>
            <ContainerReview darkmode={darkMode ? 0 : 1}>
                <Title darkmode={darkMode ? 0 : 1}>Latest Review by Customers</Title>
                <CardContainer> 
                    <SwiperContainer
                        modules={[Navigation, A11y]}
                        spaceBetween={40}
                        slidesPerView={3}
                        navigation
                    >
                        {dataDashboard.map((data, index) => (
                            <SwiperSlide key={index}>
                                <Card darkmode={darkMode ? 0 : 1}>
                                    <EmailSubject darkmode={darkMode ? 0 : 1}>
                                        {data?.email_subject}
                                    </EmailSubject>
                                    <ReviewComent darkmode={darkMode ? 0 : 1}>
                                        {data?.email_description}
                                    </ReviewComent>
                                    <InnerCard>
                                        <ImgProfile src={'https://robohash.org/'+data?.name}/>
                                        <ProfileContainer darkmode={darkMode ? 0 : 1}>
                                            <h4>{data?.name}</h4>
                                            <p>{data?.email}</p>
                                            <p>{data?.phone}</p>
                                        </ProfileContainer>
                                        <ButtonContainer>
                                            <Button view={data?.isArchived ? 0 : 1}><AiOutlineCheckCircle /></Button>
                                            <ButtonOpen onClick={() => handleOpen(data, data?._id)}><AiOutlineFullscreen /></ButtonOpen>
                                        </ButtonContainer>
                                    </InnerCard>
                                </Card>
                            </SwiperSlide>
                        ))}
                    </SwiperContainer>
                </CardContainer>
            </ContainerReview>
        </>
    );
}

const Modal = styled.div<{modalopen: boolean}>`
    display: ${props => props.modalopen === true ? 'block' : 'none'};
    position: fixed; 
    left: 0;
    top: 0;
    width: 100%; 
    height: 100%; 
    overflow: auto; 
    background-color: rgb(0,0,0); 
    background-color: rgba(0,0,0,0.4); 
    transition: 0.5s;
    z-index: 10;
`;

const SwiperContainer = styled(Swiper) `
    padding: 20px;
    min-width: 1400px;
    z-index: 1;
    
    div.swiper-button-next {
        width: 56px;
        height: 56px;
        background-color:#135846;
        border-radius: 12px;
        transition: 0.5s;
        
        &::after {
            font-size: 22px;
            color: #ffff;
        }

        &:hover {
            background-color:#799283;
        }
    }

    div.swiper-button-prev {
        width: 56px;
        height: 56px;
        background-color:#135846;
        border-radius: 12px;
        transition: 0.5s;
        
        &::after {
            font-size: 22px;
            color: #ffff;
        }

        &:hover {
            background-color:#799283;
        }
    }
`;

const ModalInfo = styled.div`
    background:#ffff;
    position: absolute; 
    top: 25%;
    left: 40%;
    width: 450px;
    height: 350px;
    border: 1px solid #EBEBEB;
    border-radius: 20px;
    padding: 30px;
    box-shadow: 0px 4px 4px #00000010;
    word-wrap: break-word;
    overflow: scroll;

    p {
        width: 90%;
        margin: auto;
        margin-top: 30px;
        color: #4E4E4E;
        font-family: 'Poppins', sans-serif;
        font-size: 16px;
        margin-bottom: 30px;
        max-height: 300px;
        overflow: auto;
        text-align: center;
    }

    p:first-of-type {
        color: #799283; 
        font-size: 14px;
    }

    h4 {
        margin: auto;
        width: 60%;
        font-family: 'Poppins', sans-serif;
        font-size: 22px;
        color: #135846;
        text-align: center;
    }
`;

const ButtonModalClose = styled.button`
    color: #aaa;
    position: absolute;
    top: 15px;
    right: 20px;
    cursor: pointer;
    font-size: 24px;
    transition: 0.4s;
    border: none;
    background: none;

    &:hover {
        color: black;
    }
`;

const ContainerReview = styled.div<{darkmode: number}>`
    box-shadow: 0px 4px 4px #00000010;
    border-radius: 20px;
    width: 1450px;
    height: 433px;
    margin-left: 50px;
    margin-top: 40px;
    max-width: 1450px;
    padding: 30px;
    background-color: ${props => props.darkmode === 0 ? '#202020' : '#ffff'};
    transition: 0.5s;
`;

const Title = styled.h3<{darkmode: number}>`
    color: ${props => props.darkmode === 0 ? '#fff' : '#393939'};
    transition: 0.5s;
    font-size: 20px;
    font-family: 'Poppins', sans-serif;
`;

const CardContainer = styled.div`
    margin-top: 10px;
`;

const Card = styled.div<{darkmode: number}>`
    width: 431px;
    height: 275px;
    border: ;
    border: ${props => props.darkmode === 0 ? '1px solid #3D3D3D' : '1px solid #EBEBEB'};
    border-radius: 20px;
    padding: 30px;
    box-shadow: 0px 3px 10px #00000030;
    transition: 0.5s;

    &:hover {
        transform: scale(1.02);
    }
`;

const EmailSubject = styled.h4<{darkmode: number}>`
    color: #393939;
    color: ${props => props.darkmode === 0 ? '#FFE' : '#393939'};
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
    margin-bottom: 10px;
    transition: 0.5s;
`;

const ReviewComent = styled.p<{darkmode: number}>`
    transition: 0.5s;
    color: ${props => props.darkmode === 0 ? '#fff' : '#4E4E4E'};
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    margin-bottom: 30px;
    overflow: hidden;
    height: 70px;

    &::before {
        content: "...";
    }
`;

const InnerCard = styled.div`
    display:flex;
    align-items: center;

    img {
        width: 56px;
        height: 56px;
        border-radius: 8px;
    }
`;

const ProfileContainer = styled.div<{darkmode: number}>` 
    width: 80%;

    h4 {
        color: ${props => props.darkmode === 0 ? '#FFE' : '#262626'};
        font-family: 'Poppins', sans-serif;
        font-size: 16px;
        margin-bottom: 10px;
        transition: 0.5s;
    }

    p {
        color: #799283;
        font-family: 'Poppins', sans-serif;
        font-size: 12px;
        margin-bottom: 10px;
    }

`;

const ButtonContainer = styled.div`
    width: 20%;
    align-self: end;
    display: flex;
    justify-content: space-between;
`;

const Button = styled.button<{view: number}>`
    border: none;
    background: none;
    font-size: 24px;
    cursor: pointer;
    color: ${props => props.view === 0 ? '#5AD07A' : '#E23428'};
`;

const ButtonOpen = styled.button<{darkmode?: number, children?: any}>`
    border: none;
    background: none;
    font-size: 24px;
    cursor: pointer;
    color: ${props => props.darkmode === 0 ? '#FFE' : '#575757'};
    transition: 0.5s;
`;

const ImgProfile = styled.img`
    width: 56px;
    height: 56px;
    border-radius: 8px;
    margin-right: 20px;
`;