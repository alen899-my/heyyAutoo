import React, { useEffect, useState } from "react";
import Empty from "../components/Empty";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import fetchData from "../helper/apiCall";
import { setLoading } from "../redux/reducers/rootSlice";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/user.css";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);
  const { userId } = jwt_decode(localStorage.getItem("token"));

  const getAllAppoint = async (e) => {
    try {
      dispatch(setLoading(true));
      const temp = await fetchData(
        `/booking/getallbookings?search=${userId}`
      );
      setBookings(temp);
      dispatch(setLoading(false));
    } catch (error) {}
  };

  useEffect(() => {
    getAllAppoint();
  }, []);

  const complete = async (ele) => {
    try {
      await toast.promise(
        axios.put(
          "/booking/completed",
          {
            appointid: ele?._id,
            driverId: ele?.driverId?._id,
            drivername: `${ele?.userId?.firstname} ${ele?.userId?.lastname}`,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          success: "Booking booked successfully",
          error: "Unable to book booking",
          loading: "Booking booking...",
        }
      );

      getAllAppoint();
    } catch (error) {
      return error;
    }
  };

  return (
    <>
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <section className="container notif-section">
          <h2 className="page-heading">Your Bookings</h2>

          {bookings.length > 0 ? (
            <div className="bookings">
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Driver</th>
                    <th>User</th>
                    <th>Booking Date</th>
                    <th>Booking Time</th>
                    <th>Booking Date</th>
                    <th>Booking Time</th>
                    <th>Status</th>
                    {userId === bookings[0].driverId?._id ? (
                      <th>Action</th>
                    ) : (
                      <></>
                    )}
                  </tr>
                </thead>
                <tbody>
  {bookings?.map((ele, i) => {
    return (
      <tr key={ele?._id}>
        <td data-label="S.No">{i + 1}</td>
        <td data-label="Driver">
          {ele?.driverId?.firstname + " " + ele?.driverId?.lastname}
        </td>
        <td data-label="User">
          {ele?.userId?.firstname + " " + ele?.userId?.lastname}
        </td>
        <td data-label="Booking Date">{ele?.date}</td>
        <td data-label="Booking Time">{ele?.time}</td>
        <td data-label="Created At">{ele?.createdAt.split("T")[0]}</td>
        <td data-label="Updated At">
          {ele?.updatedAt.split("T")[1].split(".")[0]}
        </td>
        <td data-label="Status">{ele?.status}</td>
        {userId === ele?.driverId?._id && (
          <td data-label="Action">
            <button
              className={`btn user-btn accept-btn ${
                ele?.status === "Completed" ? "disable-btn" : ""
              }`}
              disabled={ele?.status === "Completed"}
              onClick={() => complete(ele)}
            >
              Complete
            </button>
          </td>
        )}
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
      <Footer />
    </>
  );
};
export default Bookings;
