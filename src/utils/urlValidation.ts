/**
 * Validate URL format
 * @param url - URL string to validate
 * @returns boolean - true if URL is valid, false otherwise
 */
export function validateURL(url: string): boolean {
  if (!url || url.trim() === '') {
    return false;
  }

  try {
    // Handle common URL formats (http://, https://, www., etc.)
    let urlToValidate = url.trim();
    
    // Add https:// if no protocol is specified
    if (!urlToValidate.match(/^https?:\/\//i)) {
      urlToValidate = `https://${urlToValidate}`;
    }

    // Use URL constructor to validate
    new URL(urlToValidate);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get helpful error message for invalid URL
 * @param url - URL string that failed validation
 * @returns string - Helpful error message
 */
export function getURLValidationError(url: string): string {
  if (!url || url.trim() === '') {
    return 'Please enter a URL';
  }
  return 'Please enter a valid URL (e.g., https://example.com)';
}

