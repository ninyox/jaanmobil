export default function Test( email, password) {
    if (email === '' || email.length < 4, password === '' || password.length < 4) {
        return false
    }
    else {
        return true
    }
}