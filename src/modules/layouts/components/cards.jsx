import React from "react";
import Chart from "react-apexcharts";
import distance from "../../../assets/img/distance.png";
import walk from "../../../assets/img/walk.png";

const Cards = (props) => {
  return (
    <div className="col-xl-3 col-lg-4 col-md-6 my-3 d-flex flex-column justify-content-end">
      <div className="box bg-light shadow py-2 px-2 rounded">
        <div className="box-title d-flex justify-content-between">
        </div>
        <div className="d-flex justify-content-between">
          <div className="d-flex flex-column justify-content-between">
            <div className="box-title d-flex flex-column">
              <span className="d-flex align-items-center">{props.icons} {props.category}</span>
              <span>{props.name}</span>
              <p>{props.location}</p>
            </div>
            <span className="box-destination">
              <span className="box-distance-content">
                <img src={distance} className="img-fluid rounded" alt="" />
                <span>{(props.distance/1000).toFixed(1)} km</span>
              </span>
              <span className="box-duration-content ml-3">
                <img src={walk} className="img-fluid rounded" alt="" />
                <span>{Math.floor(props.distance * 60 / (props.mode === "car" ? 30000 : 10000))}mins</span>
              </span>
            </span>
          </div>
          <span className="ml-1 d-flex align-items-center" style={{fontSize: "5px !important"}}>
            <Chart
              options={{
                  plotOptions: {
                    radialBar: {
                      hollow: {
                        size: "35%",
                      },
                      dataLabels: {
                        name: {
                          show: true,
                        },
                        value: {
                          show: false,
                          fontSize: "14px",
                          formatter: function (val) {
                            return val + "%";
                          },
                        },
                        total: {
                          show: true,
                          fontSize:"12px",
                          label: `${(props.distance/1000).toFixed(1)} km`,
                        },
                      },
                    },
                  },
                  // labels: [`${(props.distance/1000).toFixed(1)} km`]
              }}
              series={[Math.floor(props.distance * 100 / (props.mode === "car" ? 30000 : 10000))]}
              type="radialBar"
              height={180}
              width={120}
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Cards;
