import type { ReactNode } from 'react';

export type LogLevel = 'log' | 'info' | 'warn' | 'error' | 'success';

export type NotificationPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export type LogEntry = {
  id: number;
  level: LogLevel;
  message: string;
  timestamp: Date;
  description?: string;
  icon?: ReactNode;
  duration?: number;
};

export const DEFAULT_MAX_ENTRIES = 10;
export const DEFAULT_DURATION = 5000;

type LogOptions = {
  description?: string;
  icon?: ReactNode;
  duration?: number;
};

class NotificationService {
  private listeners: Set<(entry: LogEntry) => void> = new Set();
  private logId = 0;

  public log(message: string, options?: LogOptions) {
    this.addLog('log', message, options);
  }

  public info(message: string, options?: LogOptions) {
    this.addLog('info', message, options);
  }

  public warn(message: string, options?: LogOptions) {
    this.addLog('warn', message, options);
  }

  public error(message: string, options?: LogOptions) {
    this.addLog('error', message, options);
  }

  public success(message: string, options?: LogOptions) {
    this.addLog('success', message, options);
  }

  public subscribe(callback: (entry: LogEntry) => void) {
    this.listeners.add(callback);
    return () => {
      this.listeners.delete(callback);
    };
  }

  private addLog(level: LogLevel, message: string, options?: LogOptions) {
    const entry: LogEntry = {
      id: ++this.logId,
      level,
      message,
      timestamp: new Date(),
      description: options?.description,
      icon: options?.icon,
      duration: options?.duration,
    };

    // eslint-disable-next-line no-console
    console[level === 'success' ? 'log' : level](message);
    this.listeners.forEach(listener => listener(entry));
  }
}

export const notification = new NotificationService();
