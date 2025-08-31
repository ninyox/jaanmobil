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
import { MdHistory } from "react-icons/md";
import axios from "axios";
import { Log, Store, Totalfund } from "./log";
import { FaDumpster, FaPen, FaSearch } from "react-icons/fa";

export default function Editadd({ received ,close}) {
  const [logger, setLogger] = useState("Submit");
  const [title, setTitle] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [address, setAddress] = useState("");
  const [advertid,setAdvertid] = useState("")
  const router = useRouter();



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (price === "" ||title === "" || description === "" || address === "") {
        alert("A required input is empty")
      return;
    }

    setLogger("Submitting . .");
      try {
        const response = await Log(advertid,title,description,price,address);
        console.log("response o client", response);
        const { message, success } = response;
        if (success) {
          alert(message);
        }else{
        alert(message)
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
      setTitle(received.title);
      setdescription(received.description);
      setAddress(received.address);
      setprice(received.price);
      setAdvertid(received.advertid)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setData();
  }, []);
  return (
    <div className=" fixed z-[9999] inset-0 w-screen h-screen flex flex-col sm:mt-0 items-center px-5 backdrop-blur-md justify-center">
      <div className=" rounded-md w-full md:w-1/3 box-content sm:w-2/3 h-auto flex flex-col items-center rounded-b-2xl bg-white dark:bg-gray-900 shadow-md border-mycolor">
        <div className="dashboardtext w-full h-auto py-2 px-5 rounded-xl my-4 sm:mt-10">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="w-full h-auto sm:shadow-sm shadow-black font-inter flex flex-wrap flex-col mt-1 rounded-xl items-center justify-around"
          >
            <label
              htmlFor="Title"
              className=" w-full h-auto pl-5 mb-5"
            >
              <span className="mb-0 text-sm font-intermedium ml-1 ">
                Title:
              </span>

              <input
                value={title}
                onChange={(value) => setTitle(value.target.value)}
                className=" border rounded-md focus:border-indigo-500 w-11/12 px-4 h-12 mx-auto text-sm inter"
                placeholder="Title"
                required
              />
            </label>

            <label
              htmlFor="price"
              className=" w-full h-auto pl-5 mb-5"
            >
              <span className="mb-0 text-sm font-intermedium ml-1  ">
                Price:
              </span>

              <input
                value={price}
                onChange={(value) => setprice(value.target.value)}
                className=" border rounded-md focus:border-mycolor w-11/12 px-4 h-12 mx-auto text-sm font-interbold"
                placeholder="Set price"
                required
              />
            </label>

            <label
              htmlFor="address"
              className=" w-full h-auto pl-5 mb-5"
            >
              <span className="mb-0 text-sm font-intermedium ml-1  ">
                Custom Address:
              </span>

              <input
                value={address || ""}
                onChange={(value) => setAddress(value.target.value)}
                className=" border rounded-md focus:border-indigo-500 w-11/12 px-4 h-12 mx-auto text-md  "
                placeholder="Custom address"
                required
              />
            </label>


            <label
              htmlFor="Description"
              className=" w-full h-auto pl-5 mb-5 "
            >
              <span className="mb-0 text-sm font-intermedium ml-1  ">
                Description:
              </span>

              <textarea
                value={description || ""}
                onChange={(value) => setdescription(value.target.value)}
                className=" border rounded-md focus:border-indigo-500 w-11/12 px-4 h-28 mx-auto  text-sm font-inter"
                placeholder="description"
              />
            </label>

            
            <div className="sm:w-full w-full h-auto flex rounded-lg p-2 justify-around">
            <button className="flex border border-slate-100 py-[5px] px-3 rounded-md bg-yellow-100 w-2/5 justify-center" onClick={() => close()}>
                <p className="font-intermedium text-md text-mycolor">Close</p>
              </button>

              <button className="flex border border-slate-300 rounded-[7px] bg-mycolor items-center justify-center font-intermedium w-2/5 py-[5px]" onClick={() => handleSubmit()}>
                <p className="font-intermedium text-md text-white ">Submit</p>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
