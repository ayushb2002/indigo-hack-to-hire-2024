import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "context/authContext";
import toast from "react-hot-toast";
import { AnnouncementContext } from "context/announcementContext";
import BoardPassengers from "components/boardPassengers";
import { BookingContext } from "context/bookingContext";
import MyBookings from "components/myBookings";

export default function Dashboard() {

  const { currentUser, updateRole } = useContext(AuthContext);
  const [isChecked, setIsChecked] = useState(false);
  const { broadcast, notifications } = useContext(AnnouncementContext);
  const [passengerData, setPassengerData] = useState([]);
  const { searchPendingByFlightNumber, searchAllByUsername, searchPendingByUsername, searchBoardedByUsername } = useContext(BookingContext);
  const [bookingData, setBookingData] = useState([]);  

  const handleCheckboxChange = (e) => {
    e.preventDefault();
    setIsChecked(e.target.checked);
  };

  const handleRoleUpdate = (e) => {
        e.preventDefault();
    const user = document.getElementById('adminUser').value;
    const role = document.getElementById('adminRole').value;
    updateRole(user, role).then((res) => {
      if (res['status'] === 'success'){
        toast.success(res['message']);
        document.getElementById('adminUser').value = '';
        document.getElementById('adminRole').value = '';
      }
      else
        toast.error('Failed to update role!');
        }).catch(error => {
            console.error('There was an error updating the role!', error);
            toast.error('Failed to update role!');
        });
  };
  
  const handleAnnouncement = (e) => {
    e.preventDefault();
    const subject = document.getElementById('adminSubject').value;
    const announcement = document.getElementById('adminAnnouncement').value;
    if (isChecked) {
      broadcast(subject, announcement).then((res) => {
        toast.success(res.message);
        document.getElementById('adminSubject').value = '';
        document.getElementById('adminAnnouncement').value = '';
      }).catch((err) => {
        toast.error('Error encountered!');
        console.log(err);
      })
    }
    else {
      const flightNumber = document.getElementById('adminFlightNumber').value;
      notifications(flightNumber, subject, announcement).then((res) => {
        toast.success(res.message);
        document.getElementById('adminSubject').value = '';
        document.getElementById('adminAnnouncement').value = '';
        document.getElementById('adminFlightNumber').value = '';
      }).catch((err) => {
        toast.error('Error encountered!');
        console.log(err);
      })
    }
  };

  const handleBoarding = (e) => {
    e.preventDefault();
    const flightNumber = document.getElementById('staffFlightNumber').value;
    searchPendingByFlightNumber(flightNumber).then((res) => {
      console.log(res);
      setPassengerData(res);
    }).catch((err) => {
      toast.error('Error encountered!');
      console.log(err);
    })
  };

  const loadAllBookings = (e) => {
    e.preventDefault();

    searchAllByUsername(currentUser.username).then((res) => {
      console.log(res);
      setBookingData(res);
      toast.success("Loaded all booking!");
    }).catch((err) => {
      console.error(err);
      toast.error('Could not load data!');
    })
  };

  const loadPendingBookings = (e) => {
    e.preventDefault();

    searchPendingByUsername(currentUser.username).then((res) => {
      console.log(res);
      setBookingData(res);
      toast.success("Loaded active bookings!");
    }).catch((err) => {
      console.error(err);
      toast.error('Could not load data!');
    })
  };

  const loadBoardedBookings = (e) => {
    e.preventDefault();

    searchBoardedByUsername(currentUser.username).then((res) => {
      console.log(res);
      setBookingData(res);
      toast.success("Loaded past bookings!");
    }).catch((err) => {
      console.error(err);
      toast.error('Could not load data!');
    })
  }

  const CustomerDashboard = () => {
    return (
      <>
      <div className="flex flex-wrap">
        <div className="lg:w-4/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
            <div className="rounded-t mb-0 px-6 py-6"></div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={loadAllBookings}>
                  <button
                  className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="submit" >
                    Load all bookings
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="lg:w-4/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
            <div className="rounded-t mb-0 px-6 py-6"></div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={loadPendingBookings}>
                  <button
                  className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="submit" >
                    Load active bookings
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="lg:w-4/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
            <div className="rounded-t mb-0 px-6 py-6"></div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={loadBoardedBookings}>
                  <button
                  className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="submit" >
                    Load boarded bookings
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center content-center h-full">
          <div className="lg:w-12/12 px-4">
            <MyBookings color={'dark'} data={bookingData} />
          </div>
        </div>
      </>
    )
  };

  const StaffDashboard = () => {
    return (
      <>
        <div className="flex flex-wrap">
          
          <div className="lg:w-4/12 px-4"></div>
          <div className="lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                <div className="rounded-t mb-0 px-6 py-6">
                  <div className="text-center mb-3">
                    <h4 className="text-blueGray-500 text-lg font-bold">
                      Commence Boarding
                    </h4>
                  </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={handleBoarding}>
                  
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Flight Number
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Flight Number"
                        id="staffFlightNumber"
                      />
                    </div>

                    <div className="text-center mt-6">
                      <button
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Board passengers
                      </button>
                    </div>
                  </form>
                </div>
              </div>
          </div>
          <div className="lg:w-4/12 px-4"></div>
        </div>
        
        <div className="flex justify-center items-center content-center h-full">
            <div className="lg: w-12/12 px-4">
            <BoardPassengers color={'dark'} data={passengerData} />
            </div>
        </div>
      </>
    )
  };

  const AdminDashboard = () => {
    return (
      <>
        <div className="flex flex-wrap">
        <div className="lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h4 className="text-blueGray-500 text-lg font-bold">
                    Update Roles
                  </h4>
                </div>
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={handleRoleUpdate}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Username"
                      id="adminUser"
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Role
                    </label>
                    <select className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" id="adminRole">
                        <option value="" disabled>Select Role</option>
                        <option value="staff">Staff</option>
                        <option value="admin">Admin</option>
                    </select>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Update role!
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="lg:w-2/12 px-4">

          </div>
          <div className="lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                <div className="rounded-t mb-0 px-6 py-6">
                  <div className="text-center mb-3">
                    <h4 className="text-blueGray-500 text-lg font-bold">
                      Announcements
                    </h4>
                  </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={handleAnnouncement}>
                
                  <div className="relative w-full mb-3">
                    <label
                        className="uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password" >
                        Broadcast {" "}
                      </label>
                      <input
                        type="checkbox"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
                      id="adminBroadcast"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                    />
                  </div>
                  
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Flight Number
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Flight Number"
                      id="adminFlightNumber"
                    disabled={isChecked}
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Subject
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Subject of announcement"
                      id="adminSubject"
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Type your message here
                      </label>
                      <textarea className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" rows={5} id="adminAnnouncement" />
                    </div>

                    <div className="text-center mt-6">
                      <button
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Send Announcement
                      </button>
                    </div>
                  </form>
                </div>
              </div>
          </div>
        </div>
      </>
    )
  };

  if (!currentUser){
    return <Redirect to='/login' />;
  }

  if (currentUser.role === 'admin') {
    return <AdminDashboard />;
  }
  else if (currentUser.role === 'staff') {
    return <StaffDashboard />;
  }
  else {
    return <CustomerDashboard />;
  }
}
