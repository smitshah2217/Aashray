import React from 'react';

interface RentNotification {
  id: string;
  tenantName: string;
  amount: number;
  timestamp: Date;
}

interface RentNotificationPanelProps {
  notifications: RentNotification[];
  onDismiss: (id: string) => void;
}

const RentNotificationPanel: React.FC<RentNotificationPanelProps> = ({ notifications, onDismiss }) => {
  return (
    <div className="fixed top-20 right-4 z-40 space-y-3 max-w-sm">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl p-4 shadow-2xl animate-slideIn"
        >
          <div className="flex items-start gap-3">
            <div className="text-3xl">💰</div>
            <div className="flex-1">
              <div className="font-bold text-lg mb-1">Rent Payment Received!</div>
              <div className="text-green-100 text-sm">
                Your rent of ₹{notification.amount.toLocaleString()} has been marked as paid by the owner.
              </div>
              <div className="text-xs text-green-200 mt-2">
                {new Date(notification.timestamp).toLocaleTimeString()}
              </div>
            </div>
            <button
              onClick={() => onDismiss(notification.id)}
              className="text-white hover:text-green-100 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RentNotificationPanel;
