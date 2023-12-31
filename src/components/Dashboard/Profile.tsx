import styled from "styled-components";
import Swal from 'sweetalert2';

import { AiOutlineCloseCircle } from "react-icons/ai";
import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContainer";
import { AsideContext } from "../Context/ToggleAsideContext";

export const ProfileCompontent = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const { auth, authDispatch } = useContext(AuthContext);
    const [imgSrc, setImgSrc] = useState(`${auth.imageSrc}` || '');
    const [email, setEmailUpdate] = useState(`${auth.email}` || '');
    const [user, setUserUpdate] = useState(`${auth.username}` || '');

    const { asideState } = useContext(AsideContext);
    let darkMode: boolean = asideState?.darkMode || false;

    const handleOpen = () => {
        setModalOpen(true);
    }

    const handleCloseModal = () => {
        setModalOpen(false);
    }

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (e && e.target && e.target.files) {
            const fileImage = URL.createObjectURL(e.target.files?.[0] || null);
            setImgSrc(fileImage);
            authDispatch({ type: 'UPDATE', payload: { imageSrc: imgSrc } })
        }
    }

    const handleUser = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const newUser = e.target.value;
        setUserUpdate(newUser);
        authDispatch({ type: 'UPDATE', payload: { username: user } })
    }

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const newEmail = e.target.value;
        setEmailUpdate(newEmail);
        authDispatch({ type: 'UPDATE', payload: { email: email } })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        const ToastUpdated = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 2000,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        e.preventDefault();
        setModalOpen(false);

        if (user !== '' || email !== '' || imgSrc !== '') {
            ToastUpdated.fire({
                icon: 'success',
                title: 'Profile updated successfully!'
            })
        }
    }

    const handleGitHub = () => {
        console.log('ey');

        Swal.fire({
            title: "Submit your Github username",
            input: "text",
            inputAttributes: {
                autocapitalize: "off"
            },
            showCancelButton: true,
            confirmButtonText: "Look up",
            showLoaderOnConfirm: true,
            preConfirm: async (login) => {
                try {
                    const githubUrl = `
                  https://api.github.com/users/${login}
                `;
                    const response = await fetch(githubUrl);
                    if (!response.ok) {
                        return Swal.showValidationMessage(`
                    ${JSON.stringify(await response.json())}
                  `);
                    }
                    return response.json();
                } catch (error) {
                    Swal.showValidationMessage(`
                  Request failed: ${error}
                `);
                }
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                setImgSrc(result.value.avatar_url);
                setUserUpdate(result.value.login);
                authDispatch({ type: 'UPDATE', payload: {username: result.value.login, email: email, imageSrc: result.value.avatar_url} })

                Swal.fire({
                    title: `${result.value.login}'s avatar`,
                    imageUrl: result.value.avatar_url
                });
            }
        });
    }

    return (
        <ProfileContainer darkmode={darkMode ? 0 : 1}>
            <Modal modalopen={modalOpen}>
                <ModalInfo>
                    <ButtonModalClose onClick={handleCloseModal}>
                        <AiOutlineCloseCircle />
                    </ButtonModalClose>
                    <ImageUpdate src={imgSrc === '' ? `https://robohash.org/${auth.username}` : imgSrc} alt="imgProfile" />
                    <form onSubmit={handleSubmit} method="post" encType="multipart/form-data" target="_blank">
                        <Input type="file" name="img" multiple onChange={handleFile} />
                        <Input type="text" placeholder={auth.username} onChange={handleUser} />
                        <Input type="text" placeholder={auth.email} onChange={handleEmail} />
                        <ContainerButton>
                            <ButtonGitHub type="button" onClick={handleGitHub}>GitHub Photo</ButtonGitHub>
                            <ButtonSave type="submit">Save</ButtonSave>
                        </ContainerButton>
                    </form>
                </ModalInfo>
            </Modal>
            <ImageProfile src={imgSrc === '' ? `https://robohash.org/${user}` : imgSrc} />
            <ProfileTitle darkmode={darkMode ? 0 : 1}>{user}</ProfileTitle>
            <ProfileParagraph>{email}</ProfileParagraph>
            <ProfileButton onClick={handleOpen}>Edit</ProfileButton>
        </ProfileContainer>
    )
}

const Modal = styled.div<{ modalopen: boolean }>`
    display: ${props => props.modalopen === true ? 'block' : 'none'};
    position: fixed; 
    z-index: 10; 
    left: 0;
    top: 0;
    width: 100%; 
    height: 100%; 
    overflow: auto; 
    background-color: rgb(0,0,0); 
    background-color: rgba(0,0,0,0.4); 
    transition: 0.5s;
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
    display: flex;
    flex-direction: column;
    align-items: center;

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

const ButtonSave = styled.button` 
    background: #EBF1EF 0% 0% no-repeat padding-box;
    border-radius: 8px;
    color: #135846;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    width: 158px;
    height: 47px;
    border: none;
    cursor: pointer;
    transition: .4s;
    margin: 20px 30px;

    &:hover {
        background: #799283 0% 0% no-repeat padding-box;
        color: #EBF1EF;
    }
`;

const ButtonGitHub = styled(ButtonSave)`
    background: grey 0% 0% no-repeat padding-box;
    color: #FFFF;

    &:hover {
        background: black;
    }
`;

const Input = styled.input<{ placeholder?: any, type: string }>`
    width: 90%;
    height: 30px;
    border: none;
    outline: gray;
    padding-right: 20px;
    border-radius: 5px;
    box-shadow: 0px 3px 10px #00000030;
    padding: 10px;
    margin: 20px 20px;
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

const ImageUpdate = styled.img`
    width: 100px;
    height: 100px;
    position: absolute;
    top: -75px;
    left: 38%;
    border-radius: 10px;
    color: #C5C5C5;
`;


const ProfileContainer = styled.div<{ darkmode: number }>`
    width: 233px;
    height: 170px;
    box-shadow: 0px 20px 30px #00000014;
    text-align: center;
    position: relative;
    margin-top: 40px;
    margin-bottom: 40px;
    background-color: ${props => props.darkmode === 0 ? '#292828' : '#ffff'};
    border-radius: 18px;
    transition: 0.5s;
`;

const ImageProfile = styled.img`
    width: 60px;
    height: 60px; 
    position: absolute;
    top: -35px;
    left: 38%;
    border-radius: 10px;
`;

const ProfileTitle = styled.h3<{ darkmode: number }>`
    color: ${props => props.darkmode === 0 ? '#ffff' : '#393939'};
    font-size: 16px;
    font-family: 
    font-family: 'Poppins', sans-serif;
    font-weight: medium;
    padding-top: 40px;
    margin-bottom: 9px;
    transition: color 0.5s;
`;

const ProfileParagraph = styled.p`
    color: #B2B2B2;
    font-size: 12px;
    font-family: 'Poppins', sans-serif;
    margin-bottom: 16px;
`;

const ProfileButton = styled.button`
    background: #EBF1EF 0% 0% no-repeat padding-box;
    border-radius: 8px;
    color: #135846;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    width: 158px;
    height: 47px;
    border: none;
    cursor: pointer;
    transition: .4s;
    margin-bottom: 30px;

    &:hover {
        background: #799283 0% 0% no-repeat padding-box;
        color: #EBF1EF;
    }
`;

const ContainerButton = styled.div`
    display: flex;
`;