/**
 * Formats the timestamp of an annotation to a human-readable string.
 *
 * @param {number} timestamp - The timestamp of the annotation.
 * @returns {string} A human-readable string representing the timestamp.
 */

export default (timestamp: number): string => {
  const date = new Date(timestamp);
  const now = new Date();

  // Calculate the time difference in days (rounded)
  const diffInDays = Math.round(Math.abs((date.getTime() - now.getTime()) / 86400000));

  if (diffInDays === 0) {
    return 'Today';
  }

  if (diffInDays < 8) {
    return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
  }

  // formatted output for dates older than a week
  return date.toLocaleDateString('default', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};
