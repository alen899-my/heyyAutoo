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
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);

  const fetchAllDocs = async () => {
    dispatch(setLoading(true));
    const data = await fetchData(`/driver/getalldrivers`);
    setDrivers(data);
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
          <h2 className="page-heading">Our Drivers</h2>
          {drivers.length > 0 ? (
            <div className="drivers-card-container">
              {drivers.map((ele) => {
                return (
                  <DriverCard
                    ele={ele}
                    key={ele._id}
                  />
                );
              })}
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

export default Drivers;
