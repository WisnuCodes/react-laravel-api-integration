import { useState, useEffect } from 'react';
import { apiRequest } from '../api/client';

export function useFetch(endpoint, defaultValue = [], pollingInterval = 0) {
  const [data, setData] = useState(defaultValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!endpoint) {
      setLoading(false);
      return;
    }

    let isMounted = true;
    let intervalId = null;

    const fetchData = async (isSilent = false) => {
      try {
        if (!isSilent) setLoading(true);
        const response = await apiRequest(endpoint);

        if (isMounted) {
          const resultData = response.data !== undefined ? response.data : response;
          setData(resultData);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          console.error(`Error fetching ${endpoint}:`, err);
          if (!isSilent) setError(err.message || 'Terjadi kesalahan jaringan.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    if (pollingInterval > 0) {
      intervalId = setInterval(() => {
        fetchData(true); // silent fetch
      }, pollingInterval);
    }

    return () => {
      isMounted = false;
      if (intervalId) clearInterval(intervalId);
    };
  }, [endpoint, pollingInterval]);

  return { data, loading, error, setData };
}
