import { useState, useEffect } from 'react';
import { DashboardStats } from '../src/types';
// import { dashboardAPI } from '../src/lib/api';

export const useDashboard = () => {
  const [stats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        // const response = await dashboardAPI.getStats();
        // setStats(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch dashboard stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
};