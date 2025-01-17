import React from "react";
import { Switch, Redirect } from "react-router-dom";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";
import Dashboard from "views/admin/Dashboard.js";
import Settings from "views/admin/Settings.js";
import PrivateRoute from "components/PrivateRoute.js";
import Logout from "components/logout.js";
import Profile from "views/Profile";
import FlightEntry from "views/admin/FlightEntry";
import SearchFlights from "views/admin/SearchFlights";
import BroadcastHandler from "realTimeHandlers/broadcastHandler";
import HeaderStats from "components/Headers/HeaderStats";

export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header added */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <PrivateRoute path="/admin/dashboard" component={Dashboard} />
            <PrivateRoute path="/admin/flightEntry" component={FlightEntry} />
            <PrivateRoute path="/admin/settings" component={Settings} />
            <PrivateRoute path='/admin/searchFlights' component={SearchFlights} />
            <PrivateRoute path="/admin/broadcast" component={BroadcastHandler} />
            <PrivateRoute path='/profile' component={Profile} />
            <PrivateRoute path="/logout" component={Logout} />

            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
