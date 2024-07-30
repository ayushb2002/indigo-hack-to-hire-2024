import React, { useContext } from "react";
import { createPopper } from "@popperjs/core";
import { BookingContext } from "context/bookingContext";
import toast from "react-hot-toast";
import emailjs from '@emailjs/browser';

const NotificationDropdown = ({ bookingId, userEmail, flightNumber }) => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const { updateStatus, cancelBooking } = useContext(BookingContext);
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "left-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const updateStatusToBoarded = (e) => {
    e.preventDefault();
    updateStatus(bookingId).then(async (res) => {
      toast.success(res.message);
      console.log(res);
      var subject = `Successfully boarded flight - ${flightNumber}!`;
      var message = "Congratulations. You have successfully boarded your flight! Enjoy the world class service provided by Air Indigo and do leave a feedback for us.";
      await sendStatusMail(subject, message, userEmail);
      window.location.href = "/admin";
    }).catch(err => {
      console.error(err);
      toast.error("Cannot update status!");
    })
  }

  const sendStatusMail = async (subject, message, to_mail) => {
    try {
      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        {
          "subject": subject,
          "message": message,
          "to_email": to_mail
        },
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );
      toast.success("Mailed status successfully!");
    }
    catch (err) {
      console.error(err);
      toast.error('Could not send status mail!');
    }
  }

  const updateStatusToCancelled = (e) => {
    e.preventDefault();
    cancelBooking(bookingId).then(async (res) => {
      toast.success(res.message);
      console.log(res);
      var subject = `Successfully cancelled flight - ${flightNumber}!`;
      var message = "Congratulations. You have successfully cancelled your flight! Please leave a feedback for us.";
      await sendStatusMail(subject, message, userEmail);
      window.location.href = "/admin";
    }).catch(err => {
      console.error(err);
      toast.error("Cannot update status!");
    })
  }

  return (
    <>
      <a
        className="text-blueGray-500 py-1 px-3"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <i className="fas fa-ellipsis-v"></i>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={updateStatusToBoarded}
        >
          Boarded Successfully
        </a>
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={updateStatusToCancelled}
        >
          Cancel boarding
        </a>
      </div>
    </>
  );
};

export default NotificationDropdown;
