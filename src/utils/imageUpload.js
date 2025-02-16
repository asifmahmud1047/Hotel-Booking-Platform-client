/**
 * Uploads an image to ImgBB and returns the URL
 * @param {File} image - The image file to upload
 * @returns {Promise<string>} The URL of the uploaded image
 */
export const imageUpload = async (image) => {
  const formData = new FormData();
  formData.append("image", image);

  try {
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMGBB_API_KEY
      }`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (data.success) {
      return data.data.url;
    }

    throw new Error("Image upload failed");
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
