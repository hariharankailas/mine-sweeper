import React, { useEffect, useState } from "react";

const Timer = () => {
  const [time, setTime] = useState(0);
  let duration = 0;
  const startTime = new Date();
  let endTime;
  let seconds;
  let minutes;
  let hours;
  let endDate = new Date();
  useEffect(() => {
    seconds = ("0" + (Math.floor(endDate.getTime() / 1000) % 60)).slice(-2);
    minutes = ("0" + (Math.floor(endDate.getTime() / 60000) % 60)).slice(-2);
    hours = ("0" + Math.floor(endDate.getTime() / 3600000)).slice(-2);
    setInterval(() => {
      setTime(seconds);
    }, 1000);
  });

  return <div>{`${hours} : ${minutes} : ${seconds}`}</div>;
};

export default Timer;
