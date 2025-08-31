import axios from "axios";
import * as FileSystem from "expo-file-system"

export const SaveImages = async (images) => {
    try {
        const formData = new FormData();
        const info = await FileSystem.getInfoAsync(images.uri)
        const fileType = selectedImageUri.substring(selectedImageUri.lastIndexOf('.') + 1).toLowerCase()
        formData.append("file", {
          url:images.uri,
          mimetype:`image/${fileType}`,
          fieldname:'files',
          originalname:`image_${index}.${fileType}`,
          encoding:'7bit',
          buffer: await FileSystem.readAsStringAsync(images.uri,{encoding:FileSystem.EncodingType.Base64}),
          size:info.size
        });
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
  