import { useState, useEffect } from "react";
import {
  Marker,
  MapContainer,
  TileLayer,
  useMap,
  Popup,
  Circle,
} from "react-leaflet";
import { IoLocation } from "react-icons/io5";
import { MdArrowBack } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import "leaflet/dist/leaflet.css";
const Mapmodal = ({ close }) => {
  const [center, setCenter] = useState([51.505, -0.09]);
  const [lat,setLat] = useState('51.505')
  const [long,setLong] = useState('-0.09');
  const [radius, setRadius] = useState(500);
  



  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setLat(latitude)
          setLong(longitude);
          console.log("Latitude:", latitude);
          console.log("Longitude:", longitude);
        },
        function (error) {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };
  useEffect(() => {
   // getLocation();
  }, []);
  return (
    <>
      <main className="fixed top-0 left-0 w-screen min-h-screen h-auto bg-white">
        <header className="pb-2 h-auto w-full">
          <span className="w-full h-auto px-2 py-1 justify-between flex items-center my-2">
            <MdArrowBack size={25} className="" onClick={() => close()} />
            <p className="font-interbold text-md">Add Location</p>
            <IoLocation size={20} className="fill-blue-500" />
          </span>
          <div className="w-full h-auto flex flex-row items-center px-3">
            <div className="inputbox border border-slate-300 rounded-[30px] flex items-center py-2 h-auto px-2 w-full">
              <CiSearch size={20} className="fill-slate-700 mx-2" />
              <input
                type="search"
                //onChange={(e) => search(e.target.value)}
                className="outline-none font-inter w-full h-full text-sm"
                placeholder="Search for Location"
              />
            </div>
          </div>
        </header>
        <section className="w-100 h-auto">
        
        </section>
        <div className="w-full px-2 py-3 flex flex-col justify-between">
          <span className="flex w-full h-auto items-center my-3">
            <p className="font-inter">50</p>
            <input
              type="range"
              min={50}
              max={2000}
              onChange={(e) => setRadius(e.target.value)}
              value={radius}
              className="flex-grow mx-2 h-1"
            />
            <p className="font-inter">2000</p>
          </span>
          <button className="w-full h-10 bg-blue-500 text-white font-intermedium rounded-md">
            Apply
          </button>
        </div>
      </main>
    </>
  );
};

export default Mapmodal;
