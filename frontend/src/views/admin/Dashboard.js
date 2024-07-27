import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "context/authContext";
import toast from "react-hot-toast";

export default function Dashboard() {

  const { currentUser, updateRole } = useContext(AuthContext);
  const [isChecked, setIsChecked] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleRoleUpdate = (e) => {
        e.preventDefault();
    const user = document.getElementById('adminUser').value;
    const role = document.getElementById('adminRole').value;
    updateRole(user, role).then((res) => {
      if (res['status'] === 'success')
        toast.success(res['message']);
      else
        toast.error('Failed to update role!');
        }).catch(error => {
            console.error('There was an error updating the role!', error);
            toast.error('Failed to update role!');
        });
    };

  const CustomerDashboard = () => {
    return (
      <>
        <div className="flex flex-wrap">
          Customer
        </div>
      </>
    )
  };

  const StaffDashboard = () => {
    return (
      <>
        <div className="flex flex-wrap">
          Staff
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
                <form onSubmit={handleRoleUpdate}>
                
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
                      value={inputValue}
                    onChange={handleInputChange}
                    disabled={isChecked}
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Type your message here
                      </label>
                      <textarea className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
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

  if (currentUser.role === 'customer') {
    return <CustomerDashboard />;
  }
  else if (currentUser.role === 'staff') {
    return <StaffDashboard />;
  }
  else {
    return <AdminDashboard />;
  }
}
