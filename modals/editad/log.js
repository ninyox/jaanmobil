import axios from "axios";

const url = "https://api.korakota.com/api/v1/edit-ad";
const token =
  typeof window !== "undefined" ? window.localStorage.getItem("token") : false;
export const Log = async (advertid, title, description, price, address) => {
  try {
    const formData = new URLSearchParams();
    formData.append("advertid",advertid)
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("address", address);

    const response = await axios.post(url, formData.toString(), {
      headers: {
        Authorization: token,
      },
    });
    const result = response.data;
    if (result.success) {
      return result;
    } else {
      return result;
    }
  } catch (error) {
    throw error;
  }
};
