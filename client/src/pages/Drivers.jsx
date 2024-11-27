import React, { useEffect, useState } from "react";
import DriverCard from "../components/DriverCard";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles/drivers.css";
import fetchData from "../helper/apiCall";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/reducers/rootSlice";
import Empty from "../components/Empty";

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [searchPlace, setSearchPlace] = useState({ from: "", to: "" });
  // State to hold the search input
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);

  const fetchAllDocs = async () => {
    dispatch(setLoading(true));
    const data = await fetchData(`/driver/getalldrivers`);
    setDrivers(data);
    dispatch(setLoading(false));
  };

  const fetchDriversByPlace = async () => {
    const { from, to } = searchPlace;
  
    if (!from?.trim() || !to?.trim()) {
      alert("Please provide both 'From' and 'To' locations.");
      return;
    }
  
    dispatch(setLoading(true));
    try {
      const response = await fetchData(
        `/driver/getdriversbyplace?from=${encodeURIComponent(
          from
        )}&to=${encodeURIComponent(to)}`
      );
      setDrivers(response);
    } catch (error) {
      console.error("Error fetching drivers:", error);
      alert("Failed to fetch drivers. Please try again.");
    }
    dispatch(setLoading(false));
  };
  
  useEffect(() => {
    fetchAllDocs();
  }, []);

  return (
    <>
  <Navbar />
  {loading && <Loading />}
  {!loading && (
    <section className="container drivers">
      <h2 className="page-heading">Find Drivers</h2>
      <div className="drivers-container">
        {/* Search Section */}
        <div className="search-section">
          <h3>Search Drivers</h3>
          <div className="search-bar">
            <div className="search-input">
              <label htmlFor="from">From:</label>
              <input
                type="text"
                id="from"
                placeholder="Enter departure place"
                value={searchPlace.from}
                onChange={(e) =>
                  setSearchPlace((prev) => ({ ...prev, from: e.target.value }))
                }
              />
            </div>
            <div className="search-input">
              <label htmlFor="to">To:</label>
              <input
                type="text"
                id="to"
                placeholder="Enter destination place"
                value={searchPlace.to}
                onChange={(e) =>
                  setSearchPlace((prev) => ({ ...prev, to: e.target.value }))
                }
              />
            </div>
            <button className="search-btn" onClick={fetchDriversByPlace}>
              Search
            </button>
          </div>
        </div>

        {/* Drivers List */}
        <div className="drivers-list">
          <h3>Available Drivers</h3>
          {drivers.length > 0 ? (
            <div className="drivers-card-container">
              {drivers.map((ele) => {
                return <DriverCard ele={ele} key={ele._id} />;
              })}
            </div>
          ) : (
            <Empty />
          )}
        </div>
      </div>
    </section>
  )}
  <Footer />
</>
  );
};

export default Drivers;
