import { useState, useEffect } from 'react';
import { FormSubmission } from '../src/types';
import { submissionsAPI } from '../src/lib/api';

export const useSubmissions = () => {
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await submissionsAPI.getAll();
      setSubmissions(response.submissions);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch submissions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const markReviewed = async (id: string) => {
    try {
      const response = await submissionsAPI.markReviewed(id);
      setSubmissions(prev => 
        prev.map(s => s.id === id ? response.submission : s)
      );
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to mark as reviewed');
    }
  };

  return {
    submissions,
    loading,
    error,
    markReviewed,
    refetch: fetchSubmissions,
  };
};