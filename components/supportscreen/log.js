import axios from "axios";

export const SaveImages = async (images) => {
    try {
        const formData = new FormData(); // Use FormData instead of URLSearchParams
        formData.append("file", images);
        const response = await axios.post(
          // Await the axios.post() call
          "https://pics.korakota.com/uploadadvert",
          formData
        );
        const result = response.data;
        if (result.success === true) {
          const link = `https://pics.korakota.com/${result.data}`;
          return link;
        }
    } catch (error) {
      throw error;
    }
  };
  