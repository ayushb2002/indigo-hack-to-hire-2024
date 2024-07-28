import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";

import Landing from "./views/Landing.js";
import Profile from "views/Profile.js";

import { AuthProvider } from "context/authContext.js";
import { AnnouncementProvider } from "context/announcementContext.js";
import { FlightProvider } from "context/flightContext.js";
import { BookingProvider } from "context/bookingContext.js";
import PrivateRoute from "components/PrivateRoute.js";
import Logout from "components/logout.js";

import { Toaster } from "react-hot-toast";

ReactDOM.render(
  <AuthProvider>
    <AnnouncementProvider>
      <FlightProvider>
        <BookingProvider>
          <Toaster />
          <BrowserRouter>
            <Switch>
              {/* add routes with layouts */}
                <Route path="/auth" component={Auth} />
              {/* add routes without layouts */}
                <Route path="/" exact component={Landing} />
                <PrivateRoute path='/profile' component={Profile} />
                <PrivateRoute path="/admin" component={Admin} />
                <PrivateRoute path="/logout" component={Logout} />
              {/* add redirect for first page */}
                <Redirect from="*" to="/auth/login" />
            </Switch>
            </BrowserRouter>
        </BookingProvider>
      </FlightProvider>
    </AnnouncementProvider>
  </AuthProvider>,
  document.getElementById("root")
);