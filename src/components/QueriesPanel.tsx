import React from 'react';
import { RaiseQueryRequest } from '../types';

interface QueriesPanelProps {
  queries: RaiseQueryRequest[];
  onRespond: (queryId: string) => void;
}

const QueriesPanel: React.FC<QueriesPanelProps> = ({ queries, onRespond }) => {
  const pendingQueries = queries.filter(q => q.status === 'pending');
  const respondedQueries = queries.filter(q => q.status === 'responded');

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <h3 className="font-bold text-xl text-gray-800 mb-6">Student Queries</h3>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
          <div className="text-sm text-orange-600 font-semibold mb-1">Pending</div>
          <div className="text-3xl font-bold text-orange-700">{pendingQueries.length}</div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
          <div className="text-sm text-green-600 font-semibold mb-1">Responded</div>
          <div className="text-3xl font-bold text-green-700">{respondedQueries.length}</div>
        </div>
      </div>

      {/* Queries List */}
      <div className="space-y-4 max-h-[500px] overflow-y-auto">
        {queries.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <div className="text-5xl mb-3">📭</div>
            <p>No queries yet</p>
          </div>
        ) : (
          queries.map((query) => (
            <div
              key={query.id}
              className={`p-4 rounded-xl border-2 transition-all ${
                query.status === 'pending'
                  ? 'border-orange-200 bg-orange-50'
                  : 'border-green-200 bg-green-50'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-bold text-gray-800">{query.studentName}</h4>
                  <p className="text-sm text-gray-600">{query.listingTitle}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    query.status === 'pending'
                      ? 'bg-orange-500 text-white'
                      : 'bg-green-500 text-white'
                  }`}
                >
                  {query.status === 'pending' ? 'PENDING' : 'RESPONDED'}
                </span>
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-600">📧</span>
                  <a href={`mailto:${query.studentEmail}`} className="text-blue-600 hover:underline">
                    {query.studentEmail}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-600">📱</span>
                  <a href={`tel:${query.studentPhone}`} className="text-blue-600 hover:underline">
                    {query.studentPhone}
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-lg p-3 mb-3">
                <p className="text-sm text-gray-700">{query.message}</p>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  {new Date(query.timestamp).toLocaleString()}
                </span>
                {query.status === 'pending' && (
                  <button
                    onClick={() => onRespond(query.id)}
                    className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold text-sm hover:shadow-lg transition-all"
                  >
                    Mark as Responded
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default QueriesPanel;
