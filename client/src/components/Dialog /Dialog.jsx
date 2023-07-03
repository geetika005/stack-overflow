import React, { useEffect } from "react";
import "./Dialog.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { WhatsappIcon, FacebookIcon, LinkedinIcon } from "react-share";

export const Dialog = ({ children, isOpen = true, setIsOpen, url }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  });
  return (
    <>
      {isOpen && (
        <div className="dialog" onClick={() => setIsOpen(false)}>
          <div className="dialog-container">
            <div className="dialog-header">
              <h4>Social share</h4>
              <FontAwesomeIcon icon={faXmark} className="xmark-icon" />
            </div>
            <div className="social-share-container">
              <WhatsappIcon round size={35} url={url} />
              <FacebookIcon round size={35} url={url} />
              <LinkedinIcon round size={35} url={url} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
