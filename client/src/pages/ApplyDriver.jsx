import React, { useState } from "react";
import "../styles/contact.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const ApplyDriver = () => {
  const navigate = useNavigate();
  const [formDetails, setFormDetails] = useState({
    LicenseNumber: "",
    VehicleNUmber: "",
    Charge: "",
    
    place: "",
  });

  const inputChange = (e) => {
    const { name, value } = e.target;
    return setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const btnClick = async (e) => {
    e.preventDefault();
    try {
      await toast.promise(
        axios.post(
          "/driver/applyfordriver",
          {
            formDetails,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          success: "Driver application sent successfully",
          error: "Unable to send Driver application",
          loading: "Sending driver application...",
        }
      );

      navigate("/");
    } catch (error) {
      return error;
    }
  };

  return (
    <>
      <Navbar />
      <section
        className="register-section flex-center apply-driver"
        id="contact"
      >
        <div className="register-container flex-center contact">
          <h2 className="form-heading">Apply for Driver</h2>
          <form className="register-form ">
            <input
              type="text"
              name="LicenseNumber"
              className="form-input"
              placeholder="Enter your LicenseNumber"
              value={formDetails.LicenseNumber}
              onChange={inputChange}
            />
            <input
              type="number"
              name="VehicleNUmber"
              className="form-input"
              placeholder="Enter your VehicleNUmber"
              value={formDetails.VehicleNUmber}
              onChange={inputChange}
            />
            <input
              type="number"
              name="Charge"
              className="form-input"
              placeholder="Enter your Charge  "
              value={formDetails.Charge}
              onChange={inputChange}
            />
            <input
              type="text"
              name="place"
              className="form-input"
              placeholder="Enter your place"
              value={formDetails.place}
              onChange={inputChange}
            />
            <button
              type="submit"
              className="btn form-btn"
              onClick={btnClick}
            >
              apply
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ApplyDriver;
