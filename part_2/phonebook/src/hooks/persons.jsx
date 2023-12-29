import { useEffect } from "react";
import personService from "../services/persons";

const defaultPersons = (setPersons) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const defaultPersons = await personService.getAll();
        setPersons(defaultPersons);
      } catch (error) {
        console.error("Failed fetching default persons data:", error);
      }
    };
    fetchData();
  }, [setPersons]);
};

export default defaultPersons;
