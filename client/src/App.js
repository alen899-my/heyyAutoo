import "./styles/app.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import { Protected, Public, Admin } from "./middleware/route";
import React, { lazy, Suspense, useState, useEffect } from "react";
import Loading from "./components/Loading";

const Home = lazy(() => import("./pages/Home"));
const AboutUs = lazy(() => import("./components/AboutUs"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Bookings = lazy(() => import("./pages/Bookings"));
const Drivers = lazy(() => import("./pages/Drivers"));
const Profile = lazy(() => import("./pages/Profile"));
const Notifications = lazy(() => import("./pages/Notifications"));
const ApplyDriver = lazy(() => import("./pages/ApplyDriver"));
const Error = lazy(() => import("./pages/Error"));

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay, such as fetching initial data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust the duration as needed
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />; // Render the loading animation during loading
  }

  return (
    <>
    <Router>
      <Toaster />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/register"
            element={
              <Public>
                <Register />
              </Public>
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/drivers" element={<Drivers />} />
          <Route
            path="/bookings"
            element={
              <Protected>
                <Bookings />
              </Protected>
            }
          />
          <Route
            path="/notifications"
            element={
              <Protected>
                <Notifications />
              </Protected>
            }
          />
          <Route
            path="/applyfordriver"
            element={
              <Protected>
                <ApplyDriver />
              </Protected>
            }
          />
          <Route
            path="/profile"
            element={
              <Protected>
                <Profile />
              </Protected>
            }
          />
          <Route
            path="/dashboard/users"
            element={
              <Admin>
                <Dashboard type={"users"} />
              </Admin>
            }
          />
          <Route
            path="/dashboard/drivers"
            element={
              <Admin>
                <Dashboard type={"drivers"} />
              </Admin>
            }
          />
          <Route
            path="/dashboard/bookings"
            element={
              <Protected>
                <Dashboard type={"bookings"} />
              </Protected>
            }
          />
          <Route
            path="/dashboard/applications"
            element={
              <Protected>
                <Dashboard type={"applications"} />
              </Protected>
            }
          />
          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>
    </Router>
    </>
  );
}

export default App;
