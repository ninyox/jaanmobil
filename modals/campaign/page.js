"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  FaEye,
  FaEyeSlash,
  FaMoneyBill,
  FaWallet,
  FaStar,
  FaWhatsapp,
  FaPerson,
  FaPeopleGroup,
  FaDeleteLeft,
  FaBasketShopping,
} from "react-icons/fa6";
import { FaCoins } from "react-icons/fa6";
import { MdArrowBackIos, MdHistory, MdInfo } from "react-icons/md";
import axios from "axios";
import { Log, Store, Totalfund } from "./log";
import { FaDumpster, FaPen, FaSearch } from "react-icons/fa";

export default function Campaign({ received, close }) {
  const [logger, setLogger] = useState("Submit");
  const [number, setnumber] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [address, setAddress] = useState("");
  const [advertid, setAdvertid] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (price === "" || number === "" || description === "" || address === "") {
      alert("A required input is empty");
      return;
    }

    setLogger("Submitting . .");
    try {
      const response = await Log(advertid, number, description, price, address);
      console.log("response o client", response);
      const { message, success } = response;
      if (success) {
        alert(message);
      } else {
        alert(message);
      }
    } catch (error) {
      console.log(error, "i see this error");
      alert("Unable to update, try again later");
    } finally {
      setLogger("Submit");
    }
  };
  const setData = async () => {
    try {
      setAdvertid(received.advertid);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setData();
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 1, x: 200 }}
      transition={{ duration: 0.5 }}
      className=" fixed z-[9999] inset-0 w-screen min-h-screen h-auto flex flex-col sm:mt-0 items-center backdrop-blur-md justify-center md:py-3"
    >
      <div className=" rounded-md w-full md:w-1/3 box-content sm:w-2/3 min-h-full h-auto flex flex-col items-center rounded-b-2xl bg-white dark:bg-gray-900 shadow-md px-2 ">
        <header aria-label="profile header" className="w-full h-10 flex justify-between items-center px-2 border-b py-2">
          <span className="flex items-center">
            <MdArrowBackIos
              size={20}
              className="fill-black dark:fill-white"
              onClick={() => router.back()}
            />
            <p className="text-md font-intermedium">Create Campaign</p>
          </span>
          <button
            onClick={() => Clearall()}
            className="w-auto h-auto bg-mycolor text-white font-intermedium text-sm rounded-full px-3 py-1 flex items-center"
          >
            <MdInfo size={16} className="fill-white mr-2" />
            Info
          </button>
        </header>

        <div className="dashboardtext w-full h-auto py-2 px-5 my-4 sm:mt-10">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="w-full h-auto sm:shadow-sm shadow-black font-inter flex flex-wrap flex-col mt-1 rounded-xl items-center justify-around border-2"
          >
            <label htmlFor="number" className=" w-full h-auto pl-5 mb-5">
              <span className="mb-0 text-sm font-intermedium ml-1 ">
                Amount of workers needed:
              </span>
              <input
                value={number}
                onChange={(value) => setnumber(value.target.value)}
                className=" border rounded-md focus:border-indigo-500 w-11/12 px-4 h-12 mx-auto text-sm inter"
                type="number"
                placeholder="300"
                required
              />
            </label>

            <label htmlFor="price" className=" w-full h-auto pl-5 mb-5">
              <span className="mb-0 text-sm font-intermedium ml-1  ">
                Preferred Price:
              </span>

              <input
                value={price}
                onChange={(value) => setprice(value.target.value)}
                className=" border rounded-md focus:border-mycolor w-11/12 px-4 h-12 mx-auto text-sm font-interbold"
                type="number"
                min={200}
                placeholder="1000"
                required
              />
            </label>

            <label htmlFor="address" className=" w-full h-auto pl-5 mb-5">
              <span className="mb-0 text-sm font-intermedium ml-1  ">
                Custom Address:
              </span>

              <input
                value={address}
                onChange={(value) => setAddress(value.target.value)}
                className=" border rounded-md focus:border-indigo-500 w-11/12 px-4 h-12 mx-auto text-md  "
                placeholder="Custom address"
                required
              />
            </label>

            <label htmlFor="Description" className=" w-full h-auto pl-5 mb-5 ">
              <span className="mb-0 text-sm font-intermedium ml-1  ">
                Additional info for workers:
              </span>

              <textarea
                value={description}
                onChange={(value) => setdescription(value.target.value)}
                className=" border rounded-md focus:border-indigo-500 w-11/12 px-4 h-28 mx-auto  text-sm font-inter"
                placeholder="More information"
              />
            </label>

            <div className="sm:w-full w-full h-auto flex rounded-lg p-2 justify-around">
              <button
                className="flex border border-slate-100 py-[5px] px-3 rounded-md bg-yellow-100 w-2/5 justify-center"
                onClick={() => close()}
              >
                <p className="font-intermedium text-md text-mycolor">Close</p>
              </button>

              <button
                className="flex border border-slate-300 rounded-[7px] bg-mycolor items-center justify-center font-intermedium w-2/5 py-[5px]"
                onClick={() => handleSubmit()}
              >
                <p className="font-intermedium text-md text-white ">Submit</p>
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
