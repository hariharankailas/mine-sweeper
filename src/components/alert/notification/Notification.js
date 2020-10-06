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
    <div class="alert alert-danger text-center" role="alert">
      {gameNotificationMsg}
      <button
        type="button"
        class="close"
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
};

export default Notification;
