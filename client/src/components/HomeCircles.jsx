import React from "react";
import CountUp from "react-countup";
import "../styles/homecircles.css";

const HomeCircles = () => {
  return (
    <section className="container circles">
      <div className="circle">
        <CountUp
          start={0}
          end={1000}
          delay={0}
          enableScrollSpy={true}
          scrollSpyDelay={500}
        >
          {({ countUpRef }) => (
            <div className="counter">
              <span ref={countUpRef} />+
            </div>
          )}
        </CountUp>
        <span className="circle-name">
          Satisfied
          <br />
          Users
        </span>
      </div>
      <div className="circle">
        <CountUp
          start={0}
          end={250}
          delay={0}
          enableScrollSpy={true}
          scrollSpyDelay={500}
        >
          {({ countUpRef }) => (
            <div className="counter">
              <span ref={countUpRef} />+
            </div>
          )}
        </CountUp>
        <span className="circle-name">
          Verified
          <br />
          Drivers
        </span>
      </div>
     
    </section>
  );
};

export default HomeCircles;