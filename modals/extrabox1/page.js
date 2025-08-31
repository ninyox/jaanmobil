import { useState, useEffect } from "react";
import Product from "@/components/productbox/page";
import getLabelFromValue from "@/components/catmodal/array.js";
import { router } from "expo-router";
import {Log} from "./log.js"
import { MaterialIcons } from "@expo/vector-icons";
export default function Extraone ({value}) {
   
    const [text, setText] = useState("");
    const [product, setProduct] = useState([]);
    const [load, setLoad] = useState(true);
    const fetchAds = async () => {
        
        setLoad(true);
        try {
          const response = await Log(value || "trending",'','');
          //console.log(response)
          if (response.success) {
            const productDa = response.data;
            //console.log(productDa,"see response")
              setProduct(productDa.slice(0,4));
          }
        } catch (error) {
          //console.log(error);
        } finally {
          setLoad(false);
        }
      };
    
      useEffect(() => {
        fetchAds();
      }, []);
      const handleRedirect = (text) => {
        router.push(`/advert?category=${text}`);
      };
    return(
        <>
       <main className="w-full h-auto mt-3">
        <div className="w-full px-3">
        <span className="flex w-full h-auto items-center py-2 px-2 bg-mycolor bg-opacity-20 rounded-md justify-between cursor-pointer " onClick={() => handleRedirect(value)}>
         <p className="font-interbold text-sm rounded-full px-2">{value ? getLabelFromValue(value) : "For you"}</p>
         <MaterialIcons name="arrow-front-ios" size={20} className="md:hidden" />
         <button className="underline md:block hidden text-mycolor text-sm font-intermedium">more</button>
        </span>
        </div>
        
        <div className="flex-grow pb-5">
              <Product items={product} load={load} />
            </div>
        </main>
        </>
    )
}