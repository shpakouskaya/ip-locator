interface ValidationResult {
  valid: boolean;
  error?: string;
  shouldReset?: boolean;
}

function isValidIp(ip: string): boolean {
  const ipRegex =
    /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}$/;
  return ipRegex.test(ip.trim());
}

export function validateIp(ip: string): ValidationResult {
  if (!ip.trim()) {
    return {
      valid: false,
      error: 'Please enter an IP address',
      shouldReset: true
    };
  }

  if (!isValidIp(ip)) {
    return {
      valid: false,
      error: 'Invalid format of IP address',
      shouldReset: true
    };
  }

  return { valid: true };
}
