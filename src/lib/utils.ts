import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * sessionId가 유효한지 검사하는 함수
 * @param sessionId - 검사할 sessionId (string | null)
 * @returns 유효한 sessionId인 경우 number, 유효하지 않은 경우 null
 */
export const validateSessionId = (sessionId: string | null): number | null => {
  if (sessionId !== null && sessionId !== '') {
    const sessionIdNum = Number(sessionId);
    if (!isNaN(sessionIdNum) && sessionIdNum >= 0) {
      return sessionIdNum;
    }
  }
  return null;
};

/**
 * sessionId가 유효한지 검사하는 함수 (boolean 반환)
 * @param sessionId - 검사할 sessionId (string | null)
 * @returns 유효한 sessionId인 경우 true, 유효하지 않은 경우 false
 */
export const isValidSessionId = (sessionId: string | null): boolean => {
  return validateSessionId(sessionId) !== null;
};
