import { useEffect } from "react";
import axios from "axios";

const getDefaultPersons = (setPersons) => {

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_PERSONS_SERVICE_URL);
        setPersons(response.data);
      } catch (error) {
        console.error("Failed fetching persons data:", error);
      }
    };

    fetchData();

  }, [setPersons]);
};

export default getDefaultPersons;
