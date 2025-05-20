export function createTimeFormatter(timezone: string | undefined | null): Intl.DateTimeFormat {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: timezone || 'UTC',
    hour12: false
  });
}
