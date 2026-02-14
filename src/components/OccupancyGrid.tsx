import React from 'react';
import { Room } from '../types';
import { calculateOccupancyPercentage } from '../utils/helpers';
import { useApp } from '../context/AppContext';

interface OccupancyGridProps {
  rooms: Room[];
}

const OccupancyGrid: React.FC<OccupancyGridProps> = ({ rooms }) => {
  const { theme } = useApp();
  const totalBeds = rooms.reduce((sum, room) => sum + room.beds.length, 0);
  const occupiedBeds = rooms.reduce(
    (sum, room) => sum + room.beds.filter((bed) => bed.isOccupied).length,
    0
  );
  const occupancyPercentage = calculateOccupancyPercentage(totalBeds, occupiedBeds);

  return (
    <div className={`rounded-2xl p-6 shadow-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-purple-900/30' : 'bg-purple-50'}`}>
            <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </div>
          <div>
            <h3 className={`font-bold text-xl ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Occupancy Status</h3>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{occupiedBeds} of {totalBeds} beds occupied</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            {occupancyPercentage}%
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className={`h-3 rounded-full overflow-hidden mb-6 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 transition-all duration-500"
          style={{ width: `${occupancyPercentage}%` }}
        />
      </div>

      {/* Rooms Grid */}
      <div className="space-y-4">
        {rooms.map((room) => (
          <div key={room.id} className={`rounded-xl p-4 ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <div className="flex items-center justify-between mb-3">
              <h4 className={`font-semibold flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                </svg>
                Room {room.roomNumber}
              </h4>
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${theme === 'dark' ? 'bg-gray-600 text-gray-200' : 'bg-white text-gray-600'}`}>
                {room.beds.filter(b => !b.isOccupied).length}/{room.beds.length} Available
              </span>
            </div>
            <div className="grid grid-cols-6">
              {room.beds.map((bed) => (
                <div key={bed.id} className="relative group">
                  <div
                    className={`w-14 h-14 rounded-lg transition-all duration-300 flex flex-col items-center justify-center cursor-pointer transform hover:scale-105 ${bed.isOccupied
                        ? 'bg-gradient-to-br from-red-400 to-red-600 shadow-lg hover:shadow-xl'
                        : 'bg-gradient-to-br from-green-400 to-green-600 shadow-lg hover:shadow-xl'
                      }`}

                  >
                    <svg className="w-5 h-5 text-white mb-0.5" fill="currentColor" viewBox="0 0 20 20">
                      {bed.isOccupied ? (
                        <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                      ) : (
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      )}
                    </svg>
                    <div className="text-white text-[10px] font-bold">Bed {bed.bedNumber}</div>
                  </div>

                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                    <div className={`rounded-lg px-3 py-2 whitespace-nowrap shadow-xl text-xs ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-900 text-white'}`}>
                      {bed.isOccupied ? (
                        <>
                          <div className="font-semibold">{bed.tenantName}</div>
                          <div className="text-red-300 mt-1">Occupied</div>
                        </>
                      ) : (
                        <>
                          <div className="font-semibold">Bed {bed.bedNumber}</div>
                          <div className="text-green-300 mt-1">Available</div>
                        </>
                      )}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className={`flex items-center justify-center gap-6 mt-6 pt-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gradient-to-br from-green-400 to-green-600 rounded" />
          <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gradient-to-br from-red-400 to-red-600 rounded" />
          <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Occupied</span>
        </div>
      </div>
    </div>
  );
};

export default OccupancyGrid;
