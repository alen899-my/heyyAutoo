import React from "react";
import AdminApplications from "../components/AdminApplications";
import AdminBookings from "../components/AdminBookings";
import AdminDrivers from "../components/AdminDrivers";
import Sidebar from "../components/Sidebar";
import Users from "../components/Users";

const Dashboard = (props) => {
  const { type } = props;
  return (
    <>
      <section className="layout-section">
        <div className="layout-container">
          <Sidebar />
          {type === "users" ? (
            <Users />
          ) : type === "drivers" ? (
            <AdminDrivers />
          ) : type === "applications" ? (
            <AdminApplications />
          ) : type === "bookings" ? (
            <AdminBookings />
          ) : (
            <></>
          )}
        </div>
      </section>
    </>
  );
};

export default Dashboard;
