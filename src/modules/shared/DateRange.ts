/**
 * takes a startAt and endAt date to then perform other functions
 * @param   {string} startAt
 * @param   {string} endAt
 * @returns {boolean} true | false
 */
const DateRange = (startAt: string | undefined, endAt?: string | undefined) => ({
  /**
   * Checks if the DateRange is a current time period, eg now() exists within it
   * @returns boolean
   */
  isInRange: (): boolean => {
    if (!startAt) {
      return true;
    }
    const dateStart = new Date(`${startAt} UTC`);
    const dateEnd = (endAt && new Date(`${endAt} UTC`)) || new Date();
    const now = new Date();

    return now >= dateStart && now <= dateEnd;
  },
});

export default DateRange;
