import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "./Loading";
import { setLoading } from "../redux/reducers/rootSlice";
import { useDispatch, useSelector } from "react-redux";
import Empty from "./Empty";
import fetchData from "../helper/apiCall";
import "../styles/user.css";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const AdminDrivers = () => {
  const [drivers, setDrivers] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);

  const getAllDrivers = async (e) => {
    try {
      dispatch(setLoading(true));
      const temp = await fetchData(`/driver/getalldrivers`);
      setDrivers(temp);
      dispatch(setLoading(false));
    } catch (error) {}
  };

  const deleteUser = async (userId) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete?");
      if (confirm) {
        await toast.promise(
          axios.put(
            "/driver/deletedriver",
            { userId },
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          ),
          {
            success: "Driver deleted successfully",
            error: "Unable to delete Driver",
            loading: "Deleting Driver...",
          }
        );
        getAllDrivers();
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getAllDrivers();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className="user-section">
          <h3 className="home-sub-heading">All Drivers</h3>
          {drivers.length > 0 ? (
            <div className="user-container">
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Pic</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Mobile No.</th>
                    <th>VehicleNUmber</th>
                    <th>LicenseNumber</th>
                    <th>Charge</th>
                    <th>place</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {drivers?.map((ele, i) => {
                    return (
                      <tr key={ele?._id}>
                        <td>{i + 1}</td>
                        <td>
                          <img
                            className="user-table-pic"
                            src={ele?.userId?.pic}
                            alt={ele?.userId?.firstname}
                          />
                        </td>
                        <td>{ele?.userId?.firstname}</td>
                        <td>{ele?.userId?.lastname}</td>
                        <td>{ele?.userId?.email}</td>
                        <td>{ele?.userId?.mobile}</td>
                        <td>{ele?.VehicleNUmber}</td>
                        <td>{ele?.LicenseNumber}</td>
                        <td>{ele?.Charge}</td>
                        <td>{ele?.place}</td>
                        <td className="select">
                          <button
                            className="btn user-btn"
                            onClick={() => {
                              deleteUser(ele?.userId?._id);
                            }}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <Empty />
          )}
        </section>
      )}
    </>
  );
};

export default AdminDrivers;
