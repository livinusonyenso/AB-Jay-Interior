import React from 'react';
import { useDashboard } from '../../../hooks/useDashboard';
import { StatsCard } from '../../../components/StatsCard';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import { 
  FolderOpen, 
  FileText, 
  AlertCircle, 
  TrendingUp 
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { stats, loading, error } = useDashboard();
  const navigate = useNavigate()

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
        Error loading dashboard: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Overview of your admin panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Projects"
          value={stats?.totalProjects || 0}
          icon={<FolderOpen className="h-8 w-8" />}
          trend={{
            value: "+12% from last month",
            isPositive: true,
          }}
        />
        
        <StatsCard
          title="Form Submissions"
          value={stats?.totalSubmissions || 0}
          icon={<FileText className="h-8 w-8" />}
        />
        
        <StatsCard
          title="Unreviewed"
          value={stats?.unreviewed || 0}
          icon={<AlertCircle className="h-8 w-8" />}
        />
        
        <StatsCard
          title="Recent Projects"
          value={stats?.recentProjects || 0}
          icon={<TrendingUp className="h-8 w-8" />}
          trend={{
            value: "+5 this week",
            isPositive: true,
          }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">New project "Modern Office Complex" created</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Contact form submission received</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Project "Residential Tower" updated</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
          <button 
  onClick={() => {navigate("/admin/projects/create")}}
  className="w-full text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
>
  <div className="font-medium text-blue-900">Create New Project</div>
  <div className="text-sm text-blue-600">Add a new project to your portfolio</div>
</button>

<button 
  onClick={() => {navigate("/admin/submissions")}}
  className="w-full text-left px-4 py-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
>
  <div className="font-medium text-green-900">Review Submissions</div>
  <div className="text-sm text-green-600">Check latest form submissions</div>
</button>

          </div>
        </div>
      </div>
    </div>
  );
};