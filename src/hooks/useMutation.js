import { useState, useCallback } from 'react';
import { apiRequest } from '../api/client';

export function useMutation(endpoint, method = 'POST') {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const mutate = useCallback(async (body, options = {}) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const url = options.url || endpoint;
      const httpMethod = options.method || method;

      const response = await apiRequest(url, {
        method: httpMethod,
        body: body ? JSON.stringify(body) : undefined,
      });

      setSuccess(options.successMessage || 'Berhasil!');
      return response;
    } catch (err) {
      const errorMsg = err.message || 'Terjadi kesalahan.';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [endpoint, method]);

  const reset = useCallback(() => {
    setError('');
    setSuccess('');
  }, []);

  return { mutate, loading, error, success, reset };
}
