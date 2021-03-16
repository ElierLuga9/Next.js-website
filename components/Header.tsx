import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Divider, IconButton, InputBase, TextField } from "@material-ui/core";
import IosArrowRoundForward from "react-ionicons/lib/IosArrowRoundForward";
import MailchimpSubscribe from "react-mailchimp-subscribe";

import getConfig from "next/config";
import { submitClass } from "lib/email";

const { publicRuntimeConfig } = getConfig();

const styles = {
  root: {
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white",
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "white",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottomColor: "white",
    },
    "& .MuiInputBase-root": {
      color: "white",
    },
  },
};

export const Header = (props) => {
  const { classes } = props;
  const [isOpenAbout, setIsOpenAbout] = useState(false);
  const [isSubmitClass, setIsSubmitClass] = useState(false);
  const [openNavbarBox, setOpenNavbarBox] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const [emailLink, setEmailLink] = useState("");

  const url =
    "https://outerreach.us20.list-manage.com/subscribe/post?u=b2dbdd20d700b4b732527d7b5&amp;id=bf36c3c38d";

  const handleClick = () => {
    setOpenNavbarBox(true);
  };

  const submitEvent = async () => {
    const result = await submitClass(emailAddress, emailLink);
    if (result.success) {
      console.log("success");
    } else {
      console.log("error");
    }
    setIsSubmitClass(false);
  };

  const CustomForm = ({ status, message, onValidated }) => {
    const [email, setEmail] = useState("");
    const [localMessage, setLocalMessage] = useState("");

    const submit = () =>
      email &&
      email.indexOf("@") > -1 &&
      onValidated({
        EMAIL: email,
      });

    useEffect(() => {
      if (status === "sending") {
        setLocalMessage("sending...");
      } else {
        setEmail("");
        setLocalMessage(message);
        if (status === "success") {
          setTimeout(() => {
            setLocalMessage("");
          }, 1500);
        }
      }
    }, [status]);

    return (
      <div className="col align-center">
        <div className="row align-center email-input">
          <InputBase
            className="email-box"
            placeholder="Your Email Address"
            inputProps={{ "aria-label": "search outer reach" }}
            style={{ letterSpacing: "1px", color: "white" }}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Divider className="divider" orientation="vertical" />
          <IconButton
            color="primary"
            className="email-icobtn"
            aria-label="directions"
            onClick={submit}
          >
            <IosArrowRoundForward color="#ffffff" />
          </IconButton>{" "}
        </div>
        <br />
        <div className="row align-center local-message">
          <div
            style={{
              color:
                status === "sending"
                  ? "blue"
                  : status === "error"
                  ? "red"
                  : "white",
            }}
          >
            {localMessage}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="col header">
      {!isOpenAbout && !isSubmitClass && (
        <>
          <div className="navbar">
            <div className="row">
              <div
                className="pointer"
                style={{ marginRight: "40px" }}
                onClick={() => setIsOpenAbout(true)}
              >
                ABOUT
              </div>
              <div className="pointer" onClick={() => setIsSubmitClass(true)}>
                SUBMIT A CLASS
              </div>
            </div>
            <div className="row">
              <div className="pointer">
                <a href="https://outerreach.com" className="linktoouter">
                  <span className="toOuter">OUTERREACH.COM&nbsp;&nbsp;</span>
                  <img
                    className="toOuterArrow"
                    src={`${publicRuntimeConfig.basePath}/images/arrow.svg`}
                    alt=">"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="mobile-navbar">
            <img
              className="mobile-navbar-menu"
              src={`${publicRuntimeConfig.basePath}/images/menuIcon.png`}
              alt="menu icon"
              onClick={handleClick}
            />
            <img
              className="mobile-logo-img"
              src={`${publicRuntimeConfig.basePath}/images/mobile-logo.png`}
              alt="logo"
            />
          </div>

          <div className="col align-center logo">
            <img
              className="header-logo"
              src={`${publicRuntimeConfig.basePath}/images/logo.png`}
              alt="Header Logo"
            />
          </div>

          <div className="col align-center header-desc-font">
            <div className="col justify-between align-center header-description">
              <div>Wellness Now</div>
              <div>Ways to feel well, curated by Outer Reach.</div>
              <div>
                An edited compilation of free, affordable and donation-based
                teaching<br></br>and guidance to feel, heal, learn and connect.
              </div>
            </div>

            <MailchimpSubscribe
              url={url}
              render={({ subscribe, status, message }) => (
                <CustomForm
                  status={status}
                  message={message}
                  onValidated={(formData) => subscribe(formData)}
                />
              )}
            />

            <div className="bottom-desc">
              Sign up for access to exclusive workshops and special sessions
            </div>
          </div>

          {openNavbarBox && (
            <div className="font-bg mobile-header-nabvar">
              <div
                className="pointer"
                onClick={() => setOpenNavbarBox(false)}
                style={{ display: "inline-block" }}
              >
                X
              </div>

              <div className="col justify-between mobile-header-box">
                <div className="pointer" onClick={() => setIsOpenAbout(true)}>
                  ABOUT
                </div>
                <div className="pointer">SUBMIT AN EVENT</div>
                <div className="pointer">OUTERREACH.COM</div>
              </div>
            </div>
          )}
        </>
      )}

      {isOpenAbout && (
        <div className="header-about">
          <div className="row justify-between about-navbar">
            <div>ABOUT</div>
            <div
              className="pointer"
              onClick={() => setIsOpenAbout(false)}
              style={{ display: "inline-block" }}
            >
              X
            </div>
          </div>
          <div>
            <img
              className="arrow-to-left"
              src={`${publicRuntimeConfig.basePath}/images/arrowToLeft.png`}
              alt="Arrow Left"
              onClick={() => setIsOpenAbout(false)}
            />
          </div>
          <div className="about">
            <p>
              Maintaining your well-being is a valuable tool for healing and
              expansion and for finding joy. <br></br>We started this curation
              of offerings as a way to sustain the SELF, while navigating life,
              work, politics, and balance in a global pandemic.
            </p>
            <p>
              Protecting health and well-being feels like an imperative right
              now. <br></br>And never more so than with the more recent
              developments in the continued fight against systemic racism and
              learning to be true allies.
            </p>
            <p>
              Finding connection within and without through mindful movement
              gives us hope for a more equal and evolved society as we learn how
              best to heal ourselves and our communities. This is Wellness Now -
              ways to feel well, curated by Outer Reach.
            </p>
            <p>
              Our edited compilation of free, affordable and donation-based
              teaching and guidance to feel, heal, learn and connect.<br></br>{" "}
              Browse and set reminders for the events that will help you here
              and now.
            </p>
          </div>
        </div>
      )}

      {isSubmitClass && (
        <div className="header-submit-class">
          <div className="row justify-between submit-header-bar">
            <div>SUBMIT A CLASS</div>
            <div
              className="pointer"
              onClick={() => setIsSubmitClass(false)}
              style={{ display: "inline-block" }}
            >
              X
            </div>
          </div>
          <div className="col submit-group">
            <div className="row justify-between submit-field">
              <div>Your Email</div>
              <TextField
                id="standard-basic"
                className={classes.root}
                onChange={(e) => setEmailAddress(e.target.value)}
              />
            </div>
            <div className="row justify-between submit-field">
              <div>Link To Event</div>
              <TextField
                id="standard-basic"
                className={classes.root}
                onChange={(e) => setEmailLink(e.target.value)}
              />
            </div>
          </div>
          <div className="submit-class-btn" onClick={submitEvent}>
            SUBMIT
          </div>
        </div>
      )}
    </div>
  );
};

export default withStyles(styles)(Header);
