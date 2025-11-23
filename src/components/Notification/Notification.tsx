
import type { ReactNode } from 'preact/compat';
import { useState, useCallback, useEffect } from 'preact/hooks';
import './Notification.scss';
import { notification, type LogLevel, type LogEntry, type NotificationPosition, DEFAULT_MAX_ENTRIES, DEFAULT_DURATION } from './notification';

export type NotificationProps = {
  position?: NotificationPosition;
  maxEntries?: number;
  defaultDuration?: number;
  showIcon?: boolean;
  showTimestamp?: boolean;
  template?: (entry: LogEntry) => ReactNode;
  logs?: LogEntry[];
  onRemove?: (id: number) => void;
};

export function Notification({
  position = 'bottom-right',
  maxEntries = DEFAULT_MAX_ENTRIES,
  defaultDuration = DEFAULT_DURATION,
  showIcon = true,
  showTimestamp = true,
  template,
  logs: externalLogs,
  onRemove,
}: NotificationProps) {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const isControlled = externalLogs !== undefined;
  const currentLogs = isControlled ? externalLogs : logs;

  const removeLog = useCallback((id: number) => {
    if (onRemove) {
      onRemove(id);
    } else if (!isControlled) {
      setLogs(prev => prev.filter(log => log.id !== id));
    }
  }, [onRemove, isControlled]);

  const addLog = useCallback(
    (entry: LogEntry) => {
      if (!isControlled) {
        setLogs(prev => {
          const newLogs = [entry, ...prev];
          return newLogs.slice(0, maxEntries);
        });

        const duration = entry.duration ?? defaultDuration;
        if (duration > 0) {
          setTimeout(() => {
            removeLog(entry.id);
          }, duration);
        }
      }
    },
    [maxEntries, defaultDuration, removeLog, isControlled]
  );

  useEffect(() => {
    if (!isControlled) {
      const unsubscribe = notification.subscribe(addLog);
      return unsubscribe;
    }
  }, [addLog, isControlled]);

  if (currentLogs.length === 0) return null;

  const getDefaultIcon = (level: LogLevel): string => {
    switch (level) {
      case 'success':
        return '✅';
      case 'info':
        return 'ℹ️';
      case 'warn':
        return '⚠️';
      case 'error':
        return '❌';
      default:
        return '📝';
    }
  };

  const renderEntry = (log: LogEntry) => {
    if (template) {
      return template(log);
    }

    return (
      <>
        {showIcon && (
          <div className="notification__icon">
            {log.icon ?? getDefaultIcon(log.level)}
          </div>
        )}
        <div className="notification__content">
          <div className="notification__header">
            <div className="notification__message">{log.message}</div>
            {showTimestamp && (
              <div className="notification__time">
                {log.timestamp.toLocaleTimeString('pl-PL', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                })}
              </div>
            )}
          </div>
          {(log.description !== undefined && log.description !== '') && (
            <div className="notification__description">{log.description}</div>
          )}
        </div>
        <button
          className="notification__close"
          onClick={() => removeLog(log.id)}
          aria-label="Close notification"
        >
          ×
        </button>
      </>
    );
  };

  return (
    <div className={`notification notification--${position}`}>
      {currentLogs.map(log => (
        <div
          key={log.id}
          className={`notification__entry notification__entry--${log.level}`}
          role="alert"
          aria-live="polite"
        >
          {renderEntry(log)}
        </div>
      ))}
    </div>
  );
}
