
const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export default function Test(first, last, email, phone, password,verifypassword) {
    if (first === '' || first.length < 3) {
        const load = {
            fact:false,
            text:"Name input is empty or less than 3 digits"
        }
        return load;
    }
    if (last === '' || last.length < 3) {
        const load = {
            fact:false,
            text:"Username input is empty or less than 3 digits"
        }
        return load;
    }
    if (!validEmail.test(email)) {
        const load = {
            fact:false,
            text:"Email address provided is Invalid"
        }
        return load;
    }
    if (phone === '' || phone.length < 10) {
        const load = {
            fact:false,
            text:"Phone Number provided is invalid"
        }
        return load;
    }
    if (password === '' || password.length < 6) {
        const load = {
            fact:false,
            text:"Password input is empty or less than 6 digits"
        }
        return load;
    }
    if (password !== verifypassword) {
        const load = {
            fact:false,
            text:"Your provided passwords do not match!"
        }
        return load;
    }
    else {
            const load = {
                fact:true,
                text:"Last name input is empty or less than 6 digits"
            }
            return load;
    }
};