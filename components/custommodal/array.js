const house = require("@/assets/images/house.png")

export const salesarray = [
    { value: "homes", label: "Home & office",icon:house},
    { value: "mobile", label: "Mobile Phones",icon:require("@/assets/images/iphone.png")},
    { value: "cars", label: "Cars",icon:require("@/assets/images/car.png")},
    { value: "electronic", label: "Electronic,games & toy",icon:require("@/assets/images/gamepad.png")},
    { value: "art", label: "Art, craft & E-book",icon:require("@/assets/images/idol.png")},
    { value: "fashion", label: "Fashion & Sport",icon:require("@/assets/images/fashion.png")},
    { value: "gym", label: "Gym & Equipment",icon:require("@/assets/images/dumbbell.png")},
  // @/assets/images/@/assets/images/ { value: "furniture", label: "Furnitures",icon:require(<MdChair size={25}  @/assets/images/> },
    { value: "construction", label: "Construction",icon:require("@/assets/images/cone.png")},
    { value: "jewelries", label: "Jewelries and accessories",icon:require("@/assets/images/jewelry.png")},
    { value: "mobility", label: "Mobility",icon:require("@/assets/images/bike.png")},
    { value: "groceries", label: "Groceries & Agro sales",icon:require("@/assets/images/grocery.png")},
    { value: "animals", label: "Animals & pets",icon:require("@/assets/images/animal.png")},
];
export const employarray = [
    { value: "fulltime", label: "Full-time",icon:require( "@/assets/images/employ.png")},
    { value: "parttime", label: "Part-Time",icon:require(  "@/assets/images/employ.png")},
    { value: "apprentice", label: "Apprenticeship",icon:require(  "@/assets/images/employ.png")},
    { value: "traineeship", label: "Traineeship",icon:require(  "@/assets/images/employ.png")},
    { value: "internship", label: "Internship",icon:require(  "@/assets/images/employ.png")},
    { value: "casual", label: "Casual employment",icon:require(  "@/assets/images/employ.png")},
    { value: "commision", label: "Commission based",icon:require(  "@/assets/images/employ.png")},
    { value: "contract", label: "Contract",icon:require(  "@/assets/images/employ.png")},
    { value: "probation", label: "Probation",icon:require(  "@/assets/images/employ.png")},
    { value: "seasonal", label: "Seasonal employment",icon:require(  "@/assets/images/employ.png")},
    { value: "leased", label: "Leased",icon:require(  "@/assets/images/employ.png")},
    { value: "contigency", label: "Contigency",icon:require(  "@/assets/images/employ.png")},
]
export const servicesarray = [
    { value: "consumer", label: "Consumer services",icon:require( "@/assets/images/cart.png")},
    { value: "business", label: "Business services",icon:require("@/assets/images/business.png")},
    { value: "public", label: "Public services",icon:require("@/assets/images/taxi.png")},
    { value: "charity", label: "Charity",icon:require( "@/assets/images/charity.png")},
]

export const hospitalarray = [
    { value: "joints", label: "Joints",icon:require(  "@/assets/images/employ.png")},
    { value: "events", label: "Events",icon:require(  "@/assets/images/ticket.png")},
    { value: "tourism", label: "Tourism",icon:require(  "@/assets/images/travel.png")},
    { value: "recreation", label: "Recreation",icon:require(  "@/assets/images/ball.png")},
    { value: "accomodation", label: "Accomodation",icon:require(  "@/assets/images/bed.png")},
]

export default function getLabelFromValue(value) {
    const foundItem = Array.find(item => item.value === value);
    return foundItem ? foundItem.label : 'For you';
}