const salesarray = [
    { value: "chocolate", label: "Art, craft & E-book" },
    { value: "strawberry", label: "Fashion & Sport" },
    { value: "gym", label: "Gym & Equipment" },
    { value: "homes", label: "Home & office" },
    { value: "mobile", label: "Mobile Phones" },
    { value: "cars", label: "Cars" },
    { value: "electronic", label: "Electronic,games & toy" },
    { value: "construction", label: "Construction" },
    { value: "jewelries", label: "Jewelries and accessories" },
    { value: "mobility", label: "Mobility" },
    { value: "groceries", label: "Groceries & Agro sales" },
    { value: "animals", label: "Animal & pets" },
]
const employarray = [
    { value: "fulltime", label: "Full-time" },
    { value: "parttime", label: "Part-Time" },
    { value: "apprentice", label: "Apprenticeship" },
    { value: "traineeship", label: "Traineeship" },
    { value: "internship", label: "Internship" },
    { value: "casual", label: "Casual employment" },
    { value: "commision", label: "Commission based" },
    { value: "contract", label: "Contract" },
    { value: "probation", label: "Probation" },
    { value: "seasonal", label: "Seasonal employment" },
    { value: "leased", label: "Leased" },
    { value: "contigency", label: "Contigency" },
]
const servicesarray = [
    { value: "consumer", label: "Consumer services" },
    { value: "business", label: "Business services" },
    { value: "public", label: "Public services" },
    { value: "charity", label: "Charity" },
]

const hospitalarray = [
    { value: "joints", label: "Joints" },
    { value: "events", label: "Events" },
    { value: "tourism", label: "Tourism" },
    { value: "recreation", label: "Recreation" },
    { value: "accomodation", label: "Accomodation" },
]


export default function Arrays(props) {
    if (props === null) {
        return
    }
    else if (props === 'sales') {
        return salesarray
    }
    else if (props === 'services') {
        return servicesarray
    }
    else if (props === 'hospitality') {
        return hospitalarray
    }
    else if (props === 'employment') {
        return employarray
    }
}