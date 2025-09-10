"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../../../components/Button";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import { quotesAPI } from "../../lib/api"; 

interface Quote {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
  hasPlans: boolean;
  newsletter: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export const AdminQuotes: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });

  // Fetch quotes using quotesAPI wrapper
  const fetchQuotes = async (page = 1, limit = 10) => {
    setLoading(true);
    setError(null);

    try {
      // quotesAPI.getAll will automatically include token from tokenStorage
      const data = await quotesAPI.getAll();
      if (!data?.quotes) throw new Error("No quotes returned from API.");

      // Handle pagination manually (since your backend returns it)
      setQuotes(data.quotes);
      //@ts-ignore
      if (data.pagination) {
            //@ts-ignore
        setPagination(data.pagination);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to load quotes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes(pagination.page, pagination.limit);
  }, [pagination.page, pagination.limit]);

  const handlePrevPage = () => {
    if (pagination.page > 1) {
      setPagination({ ...pagination, page: pagination.page - 1 });
    }
  };

  const handleNextPage = () => {
    if (pagination.page < pagination.pages) {
      setPagination({ ...pagination, page: pagination.page + 1 });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Quotes (New)</h1>

      {loading ? (
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : quotes.length === 0 ? (
        <div className="text-gray-500">No new quotes found.</div>
      ) : (
        <div className="space-y-4">
          {quotes.map((q) => (
            <div
              key={q._id}
              className="p-4 border border-gray-300 rounded-lg shadow-sm bg-white"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-900 font-semibold">
                    {q.firstName} {q.lastName}
                  </p>
                  <p className="text-gray-500 text-sm">{q.email}</p>
                  <p className="text-gray-500 text-sm">{q.phone}</p>
                  <p className="text-gray-500 text-sm">{q.location}</p>
                </div>
                <span className="text-sm text-blue-600 font-medium">{q.status}</span>
              </div>
              <div className="mt-2">
                <p className="text-gray-700">
                  <strong>Project Type:</strong> {q.projectType}
                </p>
                <p className="text-gray-700">
                  <strong>Budget:</strong> {q.budget}
                </p>
                <p className="text-gray-700">
                  <strong>Timeline:</strong> {q.timeline}
                </p>
                <p className="text-gray-700 mt-1">{q.description}</p>
              </div>
            </div>
          ))}

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <Button onClick={handlePrevPage} disabled={pagination.page === 1}>
              Previous
            </Button>
            <span>
              Page {pagination.page} of {pagination.pages}
            </span>
            <Button
              onClick={handleNextPage}
              disabled={pagination.page === pagination.pages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
