import { CgGym } from "react-icons/cg"
import { FaBook, FaBriefcase, FaGamepad, FaShoppingCart, FaUser } from "react-icons/fa"
import { GiClothes, GiHeartNecklace } from "react-icons/gi"
import { IoMdHome } from "react-icons/io"
import { IoCarSportSharp, IoConstruct, IoPhonePortrait } from "react-icons/io5"
import { MdChair, MdElectricBike, MdLocalGroceryStore, MdSportsGymnastics } from "react-icons/md"

export const salesarray = [
    { value: "homes", label: "Home & office",icon:<IoMdHome size={25} /> },
    { value: "mobile", label: "Mobile Phones",icon:<IoPhonePortrait size={25}  /> },
    { value: "cars", label: "Cars",icon:<IoCarSportSharp size={25} /> },
    { value: "electronic", label: "Electronic,games & toy",icon:<FaGamepad size={25} /> },
    { value: "art", label: "Art, craft & E-book",icon: <FaBook size={25}  /> },
    { value: "fashion", label: "Fashion & Sport",icon: <GiClothes size={25}  /> },
    { value: "gym", label: "Gym & Equipment",icon: <CgGym size={25}  /> },
   // { value: "furniture", label: "Furnitures",icon: <MdChair size={25}  /> },
    { value: "construction", label: "Construction",icon:<IoConstruct size={25}  /> },
    { value: "jewelries", label: "Jewelries and accessories",icon:<GiHeartNecklace /> },
    { value: "mobility", label: "Mobility",icon:<MdElectricBike size={25}  /> },
    { value: "groceries", label: "Groceries & Agro sales",icon:<MdLocalGroceryStore size={25}  /> },
]
export const employarray = [
    { value: "fulltime", label: "Full-time",icon:  <FaBriefcase size={25}  /> },
    { value: "parttime", label: "Part-Time",icon:  <FaBriefcase size={25}  /> },
    { value: "apprentice", label: "Apprenticeship",icon:  <FaBriefcase size={25}  /> },
    { value: "traineeship", label: "Traineeship",icon:  <FaBriefcase size={25}  /> },
    { value: "internship", label: "Internship",icon:  <FaBriefcase size={25}  />},
    { value: "casual", label: "Casual employment",icon:  <FaBriefcase size={25} /> },
    { value: "commision", label: "Commission based",icon:  <FaBriefcase size={25}  /> },
    { value: "contract", label: "Contract",icon:  <FaBriefcase size={25}  /> },
    { value: "probation", label: "Probation",icon:  <FaBriefcase size={25}  /> },
    { value: "seasonal", label: "Seasonal employment",icon:  <FaBriefcase size={25}  /> },
    { value: "leased", label: "Leased",icon:  <FaBriefcase size={25} /> },
    { value: "contigency", label: "Contigency",icon:  <FaBriefcase size={25}  /> },
]
export const servicesarray = [
    { value: "consumer", label: "Consumer services",icon:  <FaShoppingCart size={25}  /> },
    { value: "business", label: "Business services",icon:  <FaBriefcase size={25}  /> },
    { value: "public", label: "Public services",icon:  <FaUser size={25}  /> },
]

export const hospitalarray = [
    { value: "joints", label: "Joints",icon:  <FaBriefcase size={25} /> },
    { value: "events", label: "Events",icon:  <FaBriefcase size={25}  />},
    { value: "tourism", label: "Tourism",icon:  <FaBriefcase size={25}  /> },
    { value: "recreation", label: "Recreation",icon:  <FaBriefcase size={25}  /> },
    { value: "accomodation", label: "Accomodation",icon:  <FaBriefcase size={25}  /> },
]
