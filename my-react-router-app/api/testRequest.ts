import axiosInstance from "./axiosInstance";
import { createAbortController } from "./cancelRequest";
export const createUser = async (data: {
  name: string;
  email: string;
}) => {
  const controller = createAbortController();

  try {
    const response = await axiosInstance.post(
      "/users",
      data,
      {
        signal: controller.signal,
      }
    );

    console.log("Created user:", response.data);
    return response.data;
  } catch (error: any) {
    // Handle cancellation
    if (error.name === "CanceledError") {
      console.log("Request canceled");
    } else {
      console.error("API Error:", error.response?.data || error.message);

      // Example: redirect if unauthorized
      if (error.response?.status === 401) {
        window.location.href = "/login";
      }
    }

    throw error;
  }
};