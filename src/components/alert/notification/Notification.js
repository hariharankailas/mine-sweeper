import React, { useEffect } from "react";
import PropTypes from "prop-types";

const Notification = ({ gameNotificationMsg, setGameNotificationMsg }) => {
  useEffect(() => {
    document.body.scrollTop = 0;
    let main = document.querySelector(".close");
    if (main !== undefined && main !== null) {
      main.focus();
    }
  }, []);
  return (
    <div className="alert alert-danger text-center" role="alert">
      {gameNotificationMsg}
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
        onClick={() => setGameNotificationMsg("")}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

Notification.propTypes = {
  gameNotificationMsg: PropTypes.string.isRequired,
  setGameNotificationMsg: PropTypes.func.isRequired,
};

export default Notification;
