import React, { useState } from "react";

import Dialog from "@material-ui/core/Dialog";
import { DialogContent, Input } from "@material-ui/core";

import Event from "../components/Event";
import Header from "../components/Header";
import { getAllEventsForHome } from "../lib/contentful";
import { sendCodeToPhone, verifyCode } from "lib/twilio";
import { TOTAL_CATEGORIES } from "utils/constants";
import { isSameDate } from "utils/dateUtils";
import { createCalendarEvent } from "lib/calendar";
import { saveReminder } from "lib/firebase";
import _ from "lodash";

type Props = {
  preview?: boolean;
  allEvents?: any;
};

export default function Home(props: Props) {
  const { allEvents } = props;
  const [isLive, setIsLive] = useState(true);
  const [isAlwaysOn, setAlwaysOn] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openVerifyModal, setOpenVerifyModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [eventId, setEventId] = useState("");
  const [categories, setCategories] = useState<string[]>([
    "MOVEMENT",
    "MINDFULNESS",
    "HEALING",
    "MORE",
  ]);

  const filteredEvents = (allEvents: object[]) => {
    if (isAlwaysOn) {
      return allEvents.filter((event: any) => {
        return event.eventType === "ALWAYS ON";
      });
    }

    return allEvents.filter((event: any) => {
      if (isLive)
        return (
          _.includes(categories, event.category) &&
          isLiveEvent(new Date(event.start))
        );
      else return _.includes(categories, event.category);
    });
  };

  const clickLive = () => {
    setIsLive(true);
    setAlwaysOn(false);
  };

  const clickAlwaysOn = () => {
    setAlwaysOn(true);
    setIsLive(false);
  };

  const isLiveEvent = (eventDate: Date) => {
    const today = new Date();
    const nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + 1);

    return isSameDate(today, eventDate) || isSameDate(nextDay, eventDate);
  };

  const handleNext = async () => {
    let result = await sendCodeToPhone(phoneNumber);
    if (result.success) {
      setOpenLoginModal(false);
      setOpenVerifyModal(true);
    }
  };

  const handleFinish = async () => {
    let result = await verifyCode(phoneNumber, verificationCode);
    if (result.success) {
      if (eventId) {
        let event = allEvents.filter((event) => event.id == eventId);
        await saveReminder(phoneNumber, event[0].start, true, eventId);
      }
      setOpenVerifyModal(false);
    }
  };

  const handleClose = () => {
    setOpenLoginModal(false);
    setOpenVerifyModal(false);
  };

  const handleCategoryClick = (category: string) => {
    if (!_.includes(categories, category)) {
      setCategories([...categories, category]);
    } else {
      const newCategories = _.remove(categories, function (item: string) {
        return item !== category;
      });

      setCategories(newCategories);
    }
  };

  return (
    <div className="col full-height">
      <Header />
      <div className="col events-content flex-1">
        <div className="row font-md justify-center filter-btn-group">
          <div
            className={`filter-btn pointer ${
              isLive ? "filter-btn1" : "filter-btn2"
            }`}
            onClick={clickLive}
          >
            LIVE
          </div>
          <div
            className={`filter-btn pointer ${
              isAlwaysOn ? "filter-btn1" : "filter-btn2"
            }`}
            onClick={clickAlwaysOn}
          >
            ALWAYS ON
          </div>
        </div>

        <div className="row justify-center sub-filter-btn-group">
          {TOTAL_CATEGORIES.map((item, idx) => (
            <div
              key={idx}
              className={`sub-filter-btn pointer ${
                _.includes(categories, item) ? "underline" : ""
              }`}
              onClick={() => handleCategoryClick(item)}
            >
              {item}
            </div>
          ))}
        </div>

        <div className="col justify-between align-center">
          {filteredEvents(allEvents).length > 0 &&
            filteredEvents(allEvents).map((event: any) => (
              <Event
                data={event}
                key={event.name}
                setOpenLoginModal={setOpenLoginModal}
                setEventId={setEventId}
              />
            ))}
        </div>
      </div>

      <div className="row justify-between footer">
        <div className="row">
          <a
            href="https://outerreach.com/pages/privacy-and-terms"
            target="_blank"
            className="pointer footer-link"
          >
            PRIVACY AND TERMS
          </a>
          <div className="mobile-hide">
            <a
              href="https://outerreach.com/pages/contact"
              target="_blank"
              className="pointer footer-link"
            >
              CONTACT
            </a>
            <a
              href="https://www.instagram.com/outer.reach/?hl=en"
              target="_blank"
              className="pointer footer-link"
            >
              INSTAGRAM
            </a>
          </div>
        </div>
      </div>
      <Dialog onClose={handleClose} color="primary" open={openLoginModal}>
        <DialogContent className="login-modal-content">
          <div className="login-modal-title">Enter Your Number</div>
          <p className="modal-note1">
            We’ll text you when events you’re interested in are starting.
          </p>
          <Input onChange={(e) => setPhoneNumber(e.target.value)} />
          <br />
          <div className="login-modal-btn pointer" onClick={handleNext}>
            Next
          </div>
        </DialogContent>
      </Dialog>

      <Dialog onClose={handleClose} color="primary" open={openVerifyModal}>
        <DialogContent className="login-modal-content">
          <div className="login-modal-title">Enter Security Code</div>
          <p className="modal-note1">
            Enter the security code you were sent, click Finish, and enjoy
            virtual reality.
          </p>
          <Input onChange={(e) => setVerificationCode(e.target.value)} />
          <br />
          <div className="login-modal-btn pointer" onClick={handleFinish}>
            Finish
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export async function getStaticProps({ preview = false }) {
  const allEvents = await getAllEventsForHome(preview);

  allEvents.forEach(async (event) => {
    await createCalendarEvent(event);
  });
  return {
    props: { preview, allEvents },
  };
}
