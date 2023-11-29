import React from 'react';
import Image from 'next/image';
import defaultProfilePic from '../../../public/user-icon.png';

interface ProfileModalProps {
    username: string;
    onLogout: () => void;
    onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ username, onLogout, onClose }) => {

    return (
        <div className="profile-modal">
            <div className="profile-modal-content">
                <div className="modal-close-button" onClick={onClose}>×</div>
                <Image src={defaultProfilePic} alt="Profile" width={80} height={80} className="modal-profile-pic" />
                <div className="modal-username">{username}</div>
                <div className='buttons-container'>
                    <a href='https://github.com/Skeegan123/web-dev-chatgpt' target='_blank'>
                        <button className='logout-button'>Github</button>
                    </a>
                    <button className="logout-button" onClick={onLogout}>Logout</button>
                </div>
            </div>
        </div>
    );
};

export default ProfileModal;
