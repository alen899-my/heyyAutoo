import "../styles/drivercard.css";
import React, { useState } from "react";
import BookBooking from "./BookBooking";
import { toast } from "react-hot-toast";

const DriverCard = ({ ele }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const handleModal = () => {
    if (token === "") {
      return toast.error("You must log in first");
    }
    setModalOpen(true);
  };

  return (
    <div className={`card`}>
      <div className={`card-img flex-center`}>
        <img
          src={
            ele?.userId?.pic ||
            "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
          }
          alt="profile"
        />
      </div>
      <h3 className="card-name">
         {ele?.userId?.firstname + " " + ele?.userId?.lastname}
      </h3>
      <p className="LicenseNumber">
        <strong>License Number: </strong>
        {ele?.LicenseNumber}
      </p>
      <p className="VehicleNUmber">
        <strong>Vehicle NUmber: </strong>
        {ele?.VehicleNUmber}yrs
      </p>
      <p className="Charge">
        <strong>Charge per km: </strong> {ele?.Charge}
      </p>
      <p className="place" >
        <strong>Place: </strong>
        {ele?.place}
      </p>
      <p className="phone">
        <strong>Phone: </strong>
        {ele?.userId?.mobile}
      </p>
      <button
        className="btn booking-btn"
        onClick={handleModal}
      >
        Book 
      </button>
      {modalOpen && (
        <BookBooking
          setModalOpen={setModalOpen}
          ele={ele}
        />
      )}
    </div>
  );
};

export default DriverCard;
