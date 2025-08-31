
const Array = [
    { value: "homes", label: "Home & office",icon:"@/assets/images/house.png"},
    { value: "mobile", label: "Mobile Phones",icon:"@/assets/images/iphone.png"},
    { value: "cars", label: "Cars",icon:"@/assets/images/car.png" },
    { value: "electronic", label: "Electronic,games & toy",icon:"@/assets/images/gamepad.png" },
    { value: "art", label: "Art, craft & E-book",icon: "@/assets/images/idol.png" },
    { value: "fashion", label: "Fashion & Sport",icon: "@/assets/images/fashion.png" },
    { value: "gym", label: "Gym & Equipment",icon: "@/assets/images/dumbbell.png" },
  // @/assets/images/@/assets/images/ { value: "furniture", label: "Furnitures",icon: <MdChair size={25}  @/assets/images/> },
    { value: "construction", label: "Construction",icon:"@/assets/images/cone.png" },
    { value: "jewelries", label: "Jewelries and accessories",icon: "@/assets/images/jewelry.png"},
    { value: "mobility", label: "Mobility",icon:"@/assets/images/bike.png" },
    { value: "groceries", label: "Groceries & Agro sales",icon:"@/assets/images/grocery.png" },
    { value: "animals", label: "Animals & pets",icon:"@/assets/images/animal.png" },

    { value: "fulltime", label: "Full-time",icon:  "@/assets/images/employ.png" },
    { value: "parttime", label: "Part-Time",icon:   "@/assets/images/employ.png"  },
    { value: "apprentice", label: "Apprenticeship",icon:   "@/assets/images/employ.png"  },
    { value: "traineeship", label: "Traineeship",icon:   "@/assets/images/employ.png"  },
    { value: "internship", label: "Internship",icon:   "@/assets/images/employ.png" },
    { value: "casual", label: "Casual employment",icon:   "@/assets/images/employ.png"  },
    { value: "commision", label: "Commission based",icon:   "@/assets/images/employ.png"  },
    { value: "contract", label: "Contract",icon:   "@/assets/images/employ.png"  },
    { value: "probation", label: "Probation",icon:   "@/assets/images/employ.png"  },
    { value: "seasonal", label: "Seasonal employment",icon:   "@/assets/images/employ.png"  },
    { value: "leased", label: "Leased",icon:   "@/assets/images/employ.png"  },
    { value: "contigency", label: "Contigency",icon:   "@/assets/images/employ.png"  },

    { value: "consumer", label: "Consumer services",icon:  "@/assets/images/cart.png" },
    { value: "business", label: "Business services",icon: "@/assets/images/Business.png" },
    { value: "public", label: "Public services",icon: "@/assets/images/taxi.png"  },
    { value: "charity", label: "Charity",icon:  "@/assets/images/charity.png" },

    { value: "joints", label: "Joints",icon:   "@/assets/images/employ.png"  },
    { value: "events", label: "Events",icon:   "@/assets/images/ticket.png" },
    { value: "tourism", label: "Tourism",icon:   "@/assets/images/travel.png"  },
    { value: "recreation", label: "Recreation",icon:   "@/assets/images/ball.png"  },
    { value: "accomodation", label: "Accomodation",icon:   "@/assets/images/bed.png"  },
]

export default function getLabelFromValue(value) {
    const foundItem = Array.filter(item => item.value === value);
    return foundItem ? foundItem.label : 'For you';
}