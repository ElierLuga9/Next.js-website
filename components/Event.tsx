import React, { useState } from "react";
import { getGoogleCalendarUrl } from "lib/calendar";
import { CATEGORY_COLORS, SUB_CATEGORY_COLORS } from "utils/constants";

type Props = {
  data?: any;
  setOpenLoginModal?: any;
  setEventId?: any;
};

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function Event(props: Props) {
  const { data } = props;
  const [isClicked, setIsClicked] = useState(false);

  const startDay = new Date(data.start);
  const endDay = new Date(data.end);
  const d = startDay.getDay();
  const date = startDay.getDate();
  const m = startDay.getMonth();

  const startTime = startDay.getHours();
  const startMin = startDay.getMinutes();
  const endTime = endDay.getHours();
  const endMin = endDay.getMinutes();

  let start;
  let end;

  if (startTime > 12) {
    start = `${startTime - 12}:${startMin ? startMin : "00"} pm`;
  } else if (startTime === 12) {
    start = `${startTime}:${startMin ? startMin : "00"} pm`;
  } else {
    start = `${startTime}:${startMin ? startMin : "00"} am`;
  }

  if (endTime > 12) {
    end = `${endTime - 12}:${endMin ? endMin : "00"} pm`;
  } else if (endTime === 12) {
    end = `${endTime}:${endMin ? endMin : "00"} pm`;
  } else {
    end = `${endTime}:${endMin ? endMin : "00"} am`;
  }

  let showdate;

  const getShowdate = (date) => {
    switch (date % 10) {
      case 1:
        showdate = date + "st";
        return showdate;
      case 2:
        showdate = date + "nd";
        return showdate;
      default:
        showdate = date + "th";
        return showdate;
    }
  };

  const handleClick = () => {
    if (!isClicked) {
      return;
    }

    props.setEventId(data.id);
    props.setOpenLoginModal(true);
  };

  return (
    <div className="row event-group">
      <div className="img-view">
        <img src={data.thumbImage.fields.file.url} className="image-size" />
        <div
          className={`pointer remind-btn ${
            isClicked ? "clk-remind-btn-color" : "remind-btn-color"
          }`}
          onClick={() => setIsClicked(!isClicked)}
        >
          REMIND ME
        </div>
        <div
          className={`reminder-box font-sm ${isClicked ? "open-reminder" : ""}`}
        >
          <div className="reminder-option pointer" onClick={handleClick}>
            TEXT ME A REMINDER
          </div>
          <div className="reminder-option pointer">
            <a
              href={getGoogleCalendarUrl(data)}
              target="_blank"
              className="reminder-option pointer"
              rel="noopener noreferrer"
            >
              ADD TO GOOGLE CALENDAR
            </a>
          </div>
          <div className="reminder-option pointer">
            <a
              href={`/calendar/event_${data.id}.ics`}
              className="reminder-option pointer"
              target="_blank"
            >
              ADD TO APPLE CALENDAR
            </a>
          </div>
          <div className="reminder-option pointer">
            <a
              href={`/calendar/event_${data.id}.ics`}
              className="reminder-option pointer"
              target="_blank"
            >
              ADD TO OUTLOOK CALENDAR
            </a>
          </div>
        </div>
      </div>

      <div className="col img-desc">
        <div className="event-date font-platin">{`${days[d]} ${
          months[m]
        } ${getShowdate(date)}`}</div>
        <div className="event-date font-platin">{`${start} - ${end} on ${data.platform}`}</div>
        <div className="event-name">{data.name}</div>
        <div className="entity-name">{data.nameOfEntity}</div>
        <div className="event-description font-maison">{`${data.description.slice(
          0,
          150
        )} `}</div>
        <a href={data.eventLink} target="_blank" className="learn-more-link">
          Learn More
        </a>
        <div className="row font-sm event-btn-group">
          <div
            className="event-btn event-btn-1"
            style={{
              backgroundColor: `${
                CATEGORY_COLORS[data.category]
                  ? CATEGORY_COLORS[data.category][0]
                  : "#adc6ac"
              }`,
              color: `${
                CATEGORY_COLORS[data.category]
                  ? CATEGORY_COLORS[data.category][1]
                  : "#000000"
              }`,
            }}
          >
            {data.category}
          </div>
          <div
            className="event-btn event-btn-2"
            style={{
              backgroundColor: `${
                SUB_CATEGORY_COLORS[data.subcategory]
                  ? SUB_CATEGORY_COLORS[data.subcategory][0]
                  : "#E5E5E5"
              }`,
              color: `${
                SUB_CATEGORY_COLORS[data.subcategory]
                  ? SUB_CATEGORY_COLORS[data.subcategory][1]
                  : "#000000"
              }`,
            }}
          >
            {data.subcategory}
          </div>
        </div>
      </div>
    </div>
  );
}
