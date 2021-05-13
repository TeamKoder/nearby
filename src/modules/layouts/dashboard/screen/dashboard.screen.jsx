import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { HiSearch } from "react-icons/hi";
import { locationService } from "../../../../redux/_services/location.services";
import Cards from "../../components/cards";
import { FaBuysellads, FaHospital } from "react-icons/fa";
import { FcInTransit } from "react-icons/fc";
import { RiCommunityFill } from "react-icons/ri";
import { MdSchool } from "react-icons/md";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import Navbar from "../../components/navbar";

const DashboardScreen = () => {
  const location = useLocation();
  const { search } = queryString.parse(location.search);
  const [school, setSchool] = useState([]);
  const [market, setMarket] = useState([]);
  const [transit, setTransit] = useState([]);
  const [hospital, setHospital] = useState([]);
  const [amusementAreas, setAmusementAreas] = useState([]);

  useEffect(() => {
    getLoc();
  }, []);

  
  const getLoc = async () => {
    const name = Cookies.get("userName") || "";
    const email = Cookies.get("userEmail") || "";
    const mobile = Cookies.get("userPhoneNo") || "";
    await locationService
      .getLocations({
        location: search, // "598%20Old%20Tecumseh,%20Lakeshore",
        email,
        name,
        mobile,
      })
      .then(
        (res) => {
          const {
            market,
            hospital,
            "kids area": kidsarea,
            "train stop": trainstop,
            "transit stop": transitstop,
            "middle school": middleschool,
            "primary school": primaryschool,
            "community center": communitycenter,
            "secondary school": secondaryschool,
            "catholic primary school": catholicprimaryschool,
            "catholic secondary school": catholicsecondaryschool,
          } = res.nearby.amenities;

          const amenitie = {
            market,
            hospital,
            kidsarea,
            trainstop,
            transitstop,
            primaryschool,
            middleschool,
            communitycenter,
            secondaryschool,
            catholicprimaryschool,
            catholicsecondaryschool,
          };

          const keysToKeep = Object.keys(amenitie).filter((key) => (key) => {
            if (amenitie[key] !== "No Response") {
              return amenitie[key];
            }
          });

          let markets = [];
          let hospitals = [];
          let transits = [];
          let schools = [];
          let amusementareas = [];

          const d = {};
          keysToKeep.forEach((key) => {
            d[key] = amenitie[key];
          });

          if (d.hasOwnProperty("market")) {
            if (d.market !== "No Response") {
              markets.push(...d.market);
            }
          }
          if (d.hasOwnProperty("hospital") && d.hospital !== "No Response") {
            if (d.hospital !== "No Response") {
              hospitals.push(...d.hospital);
            }
          }
          if (d.hasOwnProperty("trainstop") && d.trainstop !== "No Response") {
            transits.push(...d.trainstop);
          }
          if (
            d.hasOwnProperty("transitstop") &&
            d.transitstop !== "No Response"
          ) {
            transits.push(...d.transitstop);
          }
          if (d.hasOwnProperty("primaryschool")) {
            if (d.primaryschool !== "No Response") {
              schools.push(...d.primaryschool);
            }
          }
          if (d.hasOwnProperty("middleschool")) {
            if (d.middleschool !== "No Response") {
              schools.push(...d.middleschool);
            }
          }
          if (d.hasOwnProperty("secondaryschool")) {
            if (d.secondaryschool !== "No Response") {
              schools.push(...d.secondaryschool);
            }
          }
          if (d.hasOwnProperty("catholicprimaryschool")) {
            if (d.catholicprimaryschool !== "No Response") {
              schools.push(...d.catholicprimaryschool);
            }
          }
          if (d.hasOwnProperty("catholicsecondaryschool")) {
            if (d.catholicsecondaryschool !== "No Response") {
              schools.push(...d?.catholicsecondaryschool);
            }
          }
          if (d.hasOwnProperty("kidsarea")) {
            if (d.kidsarea !== "No Response") {
              amusementareas.push(...d.kidsarea);
            }
          }
          if (d.hasOwnProperty("communitycenter")) {
            if (d.kidsarea !== "No Response") {
              amusementareas.push(...d.kidsarea);
            }
          }

          setHospital(hospitals);
          setSchool(schools);
          setAmusementAreas(amusementareas);
          setTransit(transits);
          setMarket(markets);
        },
        (err) => console.log("error", err)
      );
  };

  return (
    <>
      <Navbar searchAmi={getLoc} />
      <div className="container-fluid">
        <div className="row _dashboard-main">
          <div className="_dashboard-bg"></div>
          <div className="col-lg-12 my-3">
            <div className="nav-search-bar text-white rounded-pill p-2 d-md-none d-flex">
              <span className="mx-2 d-flex">
                <HiSearch size="1.5rem" />
              </span>
              <input type="text" placeholder="Search" className="w-100" />
            </div>
          </div>
          {/* --------------------market---------------------- */}
          {market.length < 1 ? (
            ""
          ) : (
            <div className="col-md-12 mt-4">
              <span className="amenities-title">Market</span>
            </div>
          )}
          {market?.map((item, i) => {
            const mode = item?.travel?.distance < 1200 ? "walk" : "car";
            return (
              <Cards
                key={i}
                icons={<FaBuysellads size="2.3em" className="mr-1" />}
                category="Market"
                name={item?.name}
                location={item?.location}
                distance={item?.travel?.distance}
                time={item?.travel?.time}
                mode={mode}
              />
            );
          })}

          {/* --------------------hospital---------------------- */}

          {hospital.length < 1 ? (
            ""
          ) : (
            <div className="col-md-12 mt-4">
              <span className="amenities-title">Hospital</span>
            </div>
          )}
          {hospital?.map((item, i) => {
            const mode = item?.travel?.distance < 1200 ? "walk" : "car";
            return (
              <Cards
                key={i}
                icons={<FaHospital size="2.3em" className="mr-1" />}
                category="Hospital"
                name={item?.name}
                location={item?.location}
                distance={item?.travel?.distance}
                time={item?.travel?.time}
                mode={mode}
              />
            );
          })}

          {/* --------------------kids area---------------------- */}
          {school.length < 1 ? (
            ""
          ) : (
            <div className="col-md-12 mt-4">
              <span className="amenities-title">School</span>
            </div>
          )}
          {school?.map((item, i) => {
            const mode = item?.travel?.distance < 1200 ? "walk" : "car";
            return (
              <Cards
                key={i}
                icons={<MdSchool size="2.3em" className="mr-1" />}
                category="School"
                name={item?.name}
                location={item?.location}
                distance={item?.travel?.distance}
                time={item?.travel?.time}
                mode={mode}
              />
            );
          })}

          {/* --------------------train stop---------------------- */}
          {transit.length < 1 ? (
            ""
          ) : (
            <div className="col-md-12 mt-4">
              <span className="amenities-title">Transit</span>
            </div>
          )}
          {transit?.map((item, i) => {
            const mode = item?.travel?.distance < 1200 ? "walk" : "car";
            return (
              <Cards
                key={i}
                icons={<FcInTransit size="2.3em" className="mr-1" />}
                category="Transit"
                name={item?.name}
                location={item?.location}
                distance={item?.travel?.distance}
                time={item?.travel?.time}
                mode={mode}
              />
            );
          })}

          {/* --------------------transit stop---------------------- */}
          {amusementAreas.length < 1 ? (
            ""
          ) : (
            <div className="col-md-12 mt-4">
              <span className="amenities-title">Amusement Areas</span>
            </div>
          )}
          {amusementAreas?.map((item, i) => {
            const mode = item?.travel?.distance < 1200 ? "walk" : "car";
            return (
              <Cards
                key={i}
                icons={<RiCommunityFill size="2.3em" className="mr-1" />}
                category="Amusement Areas"
                name={item?.name}
                location={item?.location}
                distance={item?.travel?.distance}
                time={item?.travel?.time}
                mode={mode}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export const Dashboard = DashboardScreen;
