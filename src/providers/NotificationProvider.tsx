import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import {
  type NotificationPosition,
  type LogEntry,
  Notification,
  DEFAULT_MAX_ENTRIES,
  DEFAULT_DURATION,
} from '../components';

export interface NotificationContextValue {
  addNotification: (entry: Omit<LogEntry, 'id' | 'timestamp'>) => void;
  removeNotification: (id: number) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
};

export interface NotificationProviderProps {
  children: React.ReactNode;
  position?: NotificationPosition;
  maxEntries?: number;
  defaultDuration?: number;
}

export function NotificationProvider({
  children,
  position = 'bottom-right',
  maxEntries = DEFAULT_MAX_ENTRIES,
  defaultDuration = DEFAULT_DURATION,
}: NotificationProviderProps) {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const addNotification = useCallback(
    (entry: Omit<LogEntry, 'id' | 'timestamp'>) => {
      const newEntry: LogEntry = {
        ...entry,
        id: Date.now() + Math.random(),
        timestamp: new Date(),
      };
      setLogs(prev => [newEntry, ...prev].slice(0, maxEntries));
    },
    [maxEntries]
  );

  const removeNotification = useCallback((id: number) => {
    setLogs(prev => prev.filter(log => log.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setLogs([]);
  }, []);

  // Auto-remove po duration
  useEffect(() => {
    logs.forEach(log => {
      // Instead of: if (log?.duration) { ... }
      // Use explicit checks to handle nullish, zero, and NaN cases
      if (
        log?.duration !== null &&
        log?.duration !== undefined &&
        !isNaN(log.duration) &&
        log.duration > 0
      ) {
        const timer = setTimeout(() => removeNotification(log.id), log.duration);
        return () => clearTimeout(timer);
      }
    });
  }, [logs, removeNotification]);

  const value: NotificationContextValue = {
    addNotification,
    removeNotification,
    clearAll,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <Notification
        position={position}
        maxEntries={maxEntries}
        defaultDuration={defaultDuration}
        logs={logs}
        onRemove={removeNotification}
      />
    </NotificationContext.Provider>
  );
}
