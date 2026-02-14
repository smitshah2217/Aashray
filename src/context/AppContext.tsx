import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AppState, Listing, Amenity, Tenant, Match, RaiseQueryRequest } from '../types';
import {
  initialListings,
  initialAmenities,
  initialTenants,
  initialRoommateProfiles,
} from '../data/mockData';

export interface RentNotification {
  id: string;
  tenantName: string;
  amount: number;
  timestamp: Date;
}

interface AppContextType extends AppState {
  toggleAmenity: (amenityId: string) => void;
  toggleRentPaid: (tenantId: string) => void;
  toggleBookmark: (listingId: string) => void;
  addMatch: (profileId: string) => void;
  toggleTheme: () => void;
  rentNotifications: RentNotification[];
  dismissNotification: (id: string) => void;
  raiseQuery: (query: Omit<RaiseQueryRequest, 'id' | 'timestamp' | 'status'>) => void;
  respondToQuery: (queryId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [listings] = useState<Listing[]>(initialListings);
  const [amenities, setAmenities] = useState<Amenity[]>(initialAmenities);
  const [tenants, setTenants] = useState<Tenant[]>(initialTenants);
  const [roommateProfiles] = useState(initialRoommateProfiles);
  const [matches, setMatches] = useState<Match[]>([]);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [rentNotifications, setRentNotifications] = useState<RentNotification[]>([]);
  const [queries, setQueries] = useState<RaiseQueryRequest[]>([]);

  const toggleAmenity = (amenityId: string) => {
    setAmenities((prev) =>
      prev.map((amenity) =>
        amenity.id === amenityId
          ? { ...amenity, enabled: !amenity.enabled }
          : amenity
      )
    );
  };

  const toggleRentPaid = (tenantId: string) => {
    setTenants((prev) =>
      prev.map((tenant) => {
        if (tenant.id === tenantId) {
          const newStatus = !tenant.isPaid;
          // Create notification when marking as paid
          if (newStatus) {
            setRentNotifications((notifs) => [
              ...notifs,
              {
                id: `notif-${Date.now()}`,
                tenantName: tenant.name,
                amount: tenant.rentAmount,
                timestamp: new Date(),
              },
            ]);
          }
          return { ...tenant, isPaid: newStatus };
        }
        return tenant;
      })
    );
  };

  const dismissNotification = (id: string) => {
    setRentNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const raiseQuery = (query: Omit<RaiseQueryRequest, 'id' | 'timestamp' | 'status'>) => {
    const newQuery: RaiseQueryRequest = {
      ...query,
      id: `query-${Date.now()}`,
      timestamp: new Date(),
      status: 'pending',
    };
    setQueries((prev) => [...prev, newQuery]);
  };

  const respondToQuery = (queryId: string) => {
    setQueries((prev) =>
      prev.map((q) => (q.id === queryId ? { ...q, status: 'responded' as const } : q))
    );
  };

  const toggleBookmark = (listingId: string) => {
    setBookmarks((prev) =>
      prev.includes(listingId)
        ? prev.filter((id) => id !== listingId)
        : [...prev, listingId]
    );
  };

  const addMatch = (profileId: string) => {
    setMatches((prev) => [...prev, { profileId, timestamp: new Date() }]);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <AppContext.Provider
      value={{
        listings,
        amenities,
        tenants,
        roommateProfiles,
        matches,
        bookmarks,
        theme,
        queries,
        toggleAmenity,
        toggleRentPaid,
        toggleBookmark,
        addMatch,
        toggleTheme,
        rentNotifications,
        dismissNotification,
        raiseQuery,
        respondToQuery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
