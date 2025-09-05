import React from 'react';
import { useSubmissions } from '../../../hooks/useSubmissions';
import { Button } from '../../../components/Button';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
// import { FormSubmission } from '../../types';
import { 
  Mail, 
  Calendar, 
  CheckCircle, 
  AlertCircle,
  User,
  MessageSquare
} from 'lucide-react';

export const SubmissionsPage: React.FC = () => {
  const { submissions, loading, error, markReviewed } = useSubmissions();

  const handleMarkReviewed = async (id: string) => {
    try {
      await markReviewed(id);
    } catch (error) {
      console.error('Failed to mark as reviewed:', error);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        Error loading submissions: {error}
      </div>
    );
  }

  const unrevievedCount = submissions.filter(s => !s.reviewed).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Form Submissions</h1>
          <p className="text-gray-600">
            {unrevievedCount > 0 && (
              <span className="text-orange-600 font-medium">
                {unrevievedCount} unreviewed • 
              </span>
            )} {submissions.length} total submissions
          </p>
        </div>
      </div>

      {submissions.length === 0 ? (
        <div className="text-center py-12">
          <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No submissions yet</h3>
          <p className="mt-2 text-gray-500">Form submissions will appear here when received.</p>
        </div>
      ) : (
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Message
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {submissions.map((submission) => (
                  <tr key={submission.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-gray-600" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {submission.name}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Mail className="h-3 w-3 mr-1" />
                            {submission.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        submission.type === 'quote' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {submission.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {submission.message}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(submission.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {submission.reviewed ? (
                          <div className="flex items-center text-green-600">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            <span className="text-sm">Reviewed</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-orange-600">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            <span className="text-sm">Pending</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {!submission.reviewed && (
                        <Button
                          size="sm"
                          onClick={() => handleMarkReviewed(submission.id)}
                        >
                          Mark Reviewed
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};