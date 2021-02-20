import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons"
import './ProfessionalProfile.css';
import ProfileInfo from './ProfileInfo';

function ProfessionalProfile(props) {
    return(
        <div className="sectionContainer">
            <div className="section" style={{backgroundColor: "lightgray"}}>
                <ProfileInfo 
                name={props.name}
                location={props.location}
                profileImage={props.profileImage}
                description={props.description}
                instagramLink={props.instagramLink}
                youtubeLink={props.youtubeLink}
                />
            </div>
            <div className="section"></div>
            <div className="section"></div>
            <div className="section"></div>
        </div>

    );
}

export default ProfessionalProfile;

// Creates the Instagram icon with the associated
// instagram account page linked
function generateInstagramLink(link) {
    if (link !== undefined || link === "") {
        return <FontAwesomeIcon 
        className="socialIcon" 
        size="lg" 
        icon={faInstagram}
        onClick={() => {window.open(link);}}
        />;
    } 
}

// Creates the YouTube icon with the associated
// YouTube account page linked
function generateYoutubeLink(link) {
    if (link !== undefined || link === "") {
        return <FontAwesomeIcon 
        className="socialIcon" 
        size="lg" 
        icon={faYoutube} 
        onClick={() => { window.open(link); }}
        />
    }
}