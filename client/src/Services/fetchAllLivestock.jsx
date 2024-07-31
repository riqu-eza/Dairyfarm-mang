export const fetchAllLivestock = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/Livestock/getall");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching livestock:", error);
      throw error; // Rethrow the error to handle it in the component
    }
  };