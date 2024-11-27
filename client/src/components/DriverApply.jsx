import React, { useState } from "react";
import toast from "react-hot-toast";
import "../styles/driverapply.css";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

function DriverApply() {
  const [formDetails, setFormDetails] = useState({
    LicenseNumber: "",
    VehicleNUmber: "",
    Charge: "",
    place: "",
    timing: "Timing",
  });

  const inputChange = (e) => {
    const { name, value } = e.target;
    return setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const formSubmit = async (e) => {
    try {
      e.preventDefault();
      const { LicenseNumber, VehicleNUmber, Charge,place, timing } = formDetails;

      if (!LicenseNumber || !VehicleNUmber || !Charge || !place || !timing) {
        return toast.error("Input field should not be empty");
      }
      const { data } = await toast.promise(
        axios.post(
          "/driver/applyfordriver",

          {
            LicenseNumber,
            VehicleNUmber,
            Charge,
            timing,
          },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          pending: "Submitting application...",
          success: "Thank You for submitting the apllication.",
          error: "Unable to submit application",
          loading: "Submitting application...",
        }
      );
    } catch (error) {
      return error;
    }
  };

  return (
    <section className="apply-driver-section flex-center">
      <div className="apply-driver-container flex-center">
        <h2 className="form-heading">Apply For Driver</h2>
        <form onSubmit={formSubmit} className="register-form">
          <input
            type="text"
            name="LicenseNumber"
            className="form-input"
            placeholder="Enter your LicenseNumber"
            value={formDetails.LicenseNumber}
            onChange={inputChange}
          />
          <input
            type="text"
            name="VehicleNUmber"
            className="form-input"
            placeholder="Enter your VehicleNUmber in years"
            value={formDetails.VehicleNUmber}
            onChange={inputChange}
          />
          <input
            type="text"
            name="Charge"
            className="form-input"
            placeholder="Enter your Charge per consultation in rupees"
            value={formDetails.Charge}
            onChange={inputChange}
            defaultChecked="Timings"
          />
          <input
            type="text"
            name="place"
            className="form-input"
            placeholder="Enter your place"
            value={formDetails.place}
            onChange={inputChange}
          />
          <select
            name="timing"
            value={formDetails.timing}
            className="form-input"
            id="timing"
            onChange={inputChange}
          >
            <option disabled>Timings</option>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
            <option value="night">Night</option>
          </select>
          <button type="submit" className="btn form-btn">
            apply
          </button>
        </form>
      </div>
    </section>
  );
}

export default DriverApply;
