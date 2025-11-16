/**
 * Generate a unique referral code from email
 * Format: first part of email + random 4 chars
 * Example: jacob1X9K
 */
export function generateReferralCode(email) {
  if (!email) return null;

  // Get first part of email before @
  let baseCode = email.split('@')[0].toLowerCase();

  // Limit to first 8 characters
  if (baseCode.length > 8) {
    baseCode = baseCode.substring(0, 8);
  }

  // Generate random 4-character suffix
  const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();

  return `${baseCode}${randomSuffix}`;
}

/**
 * Validate referral code format
 */
export function isValidReferralCode(code) {
  if (!code) return false;
  // Should be at least 5 characters (min 1 char base + 4 char suffix)
  return code.length >= 5 && code.length <= 12;
}
