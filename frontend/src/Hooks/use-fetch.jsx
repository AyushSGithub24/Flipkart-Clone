import { useEffect, useState } from "react"
import { useAuth } from "../Contexts/AuthContext";
export default function useFetch(url, method = "GET", body = null, autoFetch = true) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const { accessToken } = useAuth(); // Get access token
  
    const fetchData = async (customBody = null) => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
          },
          body: method !== "GET" ? JSON.stringify(customBody || body) : null,
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
  
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      if (autoFetch && method === "GET") {
        fetchData();
      }
    }, [url, method, accessToken]);
  
    return { data, loading, error, fetchData };
  }