import { useState, useRef, useCallback, useEffect } from 'react';

interface UseTimerReturn {
  time: number;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
  setTime: (time: number) => void;
}

export function useTimer(initialTime: number = 45 * 60): UseTimerReturn {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const elapsedBeforePauseRef = useRef<number>(0);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    if (isRunning) return;

    setIsRunning(true);
    startTimeRef.current = Date.now();

    intervalRef.current = window.setInterval(() => {
      if (startTimeRef.current !== null) {
        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
        setTime(elapsedBeforePauseRef.current + elapsed);
      }
    }, 1000);
  }, [isRunning]);

  const pause = useCallback(() => {
    if (!isRunning) return;

    clearTimer();
    setIsRunning(false);

    if (startTimeRef.current !== null) {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      elapsedBeforePauseRef.current += elapsed;
    }
    startTimeRef.current = null;
  }, [isRunning, clearTimer]);

  const reset = useCallback(() => {
    clearTimer();
    setIsRunning(false);
    setTime(0);
    startTimeRef.current = null;
    elapsedBeforePauseRef.current = 0;
  }, [clearTimer]);

  const setTimeManually = useCallback((newTime: number) => {
    setTime(newTime);
    elapsedBeforePauseRef.current = newTime;
  }, []);

  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, [clearTimer]);

  return {
    time,
    isRunning,
    start,
    pause,
    reset,
    setTime: setTimeManually,
  };
}
