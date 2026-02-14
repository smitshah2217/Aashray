import React from 'react';
import { Room } from '../types';
import { calculateOccupancyPercentage } from '../utils/helpers';

interface OccupancyGridProps {
  rooms: Room[];
}

const OccupancyGrid: React.FC<OccupancyGridProps> = ({ rooms }) => {
  const totalBeds = rooms.reduce((sum, room) => sum + room.beds.length, 0);
  const occupiedBeds = rooms.reduce(
    (sum, room) => sum + room.beds.filter((bed) => bed.isOccupied).length,
    0
  );
  const occupancyPercentage = calculateOccupancyPercentage(totalBeds, occupiedBeds);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-xl text-gray-800">Occupancy Status</h3>
        <div className="text-right">
          <div className="text-3xl font-bold text-amber-600">
            {occupancyPercentage}%
          </div>
          <div className="text-sm text-gray-500">
            {occupiedBeds} / {totalBeds} beds occupied
          </div>
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="space-y-6">
        {rooms.map((room) => (
          <div key={room.id} className="border border-gray-200 rounded-xl p-4">
            <h4 className="font-semibold text-gray-800 mb-3">
              Room {room.roomNumber}
            </h4>
            <div className="grid grid-cols-4 gap-3">
              {room.beds.map((bed) => (
                <div key={bed.id} className="relative group">
                  <div
                    className={`aspect-square rounded-lg transition-all duration-300 ${
                      bed.isOccupied
                        ? 'bg-gradient-to-br from-red-400 to-red-600 shadow-md hover:from-red-500 hover:to-red-700'
                        : 'bg-gradient-to-br from-green-400 to-green-600 shadow-md hover:from-green-500 hover:to-green-700'
                    } flex flex-col items-center justify-center text-white font-bold cursor-pointer hover:scale-105 hover:shadow-xl`}
                  >
                    <div className="text-2xl mb-1">{bed.isOccupied ? '🔴' : '🟢'}</div>
                    <div className="text-sm">Bed {bed.bedNumber}</div>
                  </div>

                  {/* Enhanced Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                    <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-xl">
                      {bed.isOccupied ? (
                        <>
                          <div className="font-semibold text-sm">{bed.tenantName}</div>
                          <div className="text-gray-300 mt-1">Status: Occupied</div>
                          <div className="text-red-300 text-xs mt-1">🔴 Not Available</div>
                        </>
                      ) : (
                        <>
                          <div className="font-semibold text-sm">Bed {bed.bedNumber}</div>
                          <div className="text-green-300 mt-1">Status: Available</div>
                          <div className="text-green-300 text-xs mt-1">🟢 Ready to Book</div>
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
      <div className="flex items-center gap-6 mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gradient-to-br from-red-400 to-red-600 rounded" />
          <span className="text-sm text-gray-600">Occupied</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gradient-to-br from-green-400 to-green-600 rounded" />
          <span className="text-sm text-gray-600">Available</span>
        </div>
      </div>
    </div>
  );
};

export default OccupancyGrid;
