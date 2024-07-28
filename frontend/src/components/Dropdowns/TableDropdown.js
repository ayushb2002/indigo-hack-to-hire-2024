import React, { useContext } from "react";
import { createPopper } from "@popperjs/core";
import { BookingContext } from "context/bookingContext";
import toast from "react-hot-toast";

const NotificationDropdown = ({ bookingId }) => {
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
    updateStatus(bookingId).then((res) => {
      toast.success(res.message);
      console.log(res);
      window.location.href = "/admin";
    }).catch(err => {
      console.error(err);
      toast.error("Cannot update status!");
    })
  }

  const updateStatusToCancelled = (e) => {
    e.preventDefault();
    cancelBooking(bookingId).then((res) => {
      toast.success(res.message);
      console.log(res);
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
