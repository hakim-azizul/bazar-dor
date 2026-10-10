import { apiBaseUrl3 } from "@/Services/apiBaseUrl";

export const getCategories = async () => {
  try {
    const res = await fetch(`${apiBaseUrl3}/categories`);
    return await res.json();
  } catch (error) {
    console.error("Data fetching unsuccessful", error);
    return [];
  }
};