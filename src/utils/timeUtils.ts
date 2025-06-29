/**
 * 초 단위 시간을 시간/분/초 형식으로 변환합니다.
 * @param seconds 초 단위 시간
 * @returns 포맷된 시간 문자열 (예: "2시간 30분 15초")
 */
export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  return `${hours}시간 ${minutes}분 ${secs}초`;
}

/**
 * 시간/분/초 형식의 문자열을 초 단위로 변환합니다.
 * @param timeString 시간 문자열 (예: "2시간 30분 15초")
 * @returns 초 단위 시간
 */
export function parseTime(timeString: string): number {
  let seconds = 0;
  
  // 시간 추출
  const hoursMatch = timeString.match(/(\d+)시간/);
  if (hoursMatch) {
    seconds += parseInt(hoursMatch[1]) * 3600;
  }
  
  // 분 추출
  const minutesMatch = timeString.match(/(\d+)분/);
  if (minutesMatch) {
    seconds += parseInt(minutesMatch[1]) * 60;
  }
  
  // 초 추출
  const secondsMatch = timeString.match(/(\d+)초/);
  if (secondsMatch) {
    seconds += parseInt(secondsMatch[1]);
  }
  
  return seconds;
}
