/**
 * Formats a date range for display on a resume.
 * Handles both CareerItem (date strings) and AcademicRecord (years + optional months).
 */
export function formatDateRange(
  start: string | number,
  end: string | number | null | undefined,
  showMonths: boolean,
  options?: {
    startMonth?: number;
    endMonth?: number;
  }
): string {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  let startDate: Date;
  let endDate: Date | null = null;
  let startYear: number;
  let endYear: number | null = null;
  let startMonth: number;
  let endMonth: number | null = null;

  // Normalize inputs
  if (typeof start === 'string') {
    startDate = new Date(start);
    startYear = startDate.getFullYear();
    startMonth = startDate.getMonth(); // 0-indexed
  } else {
    startYear = start;
    startMonth = (options?.startMonth || 1) - 1;
    startDate = new Date(startYear, startMonth, 1);
  }

  if (end === null || end === undefined || end === 'Present') {
    endDate = new Date(); // Use current date for duration calculation
    endYear = null;
    endMonth = null;
  } else if (typeof end === 'string') {
    const d = new Date(end);
    endDate = d;
    endYear = d.getFullYear();
    endMonth = d.getMonth();
  } else {
    endYear = end;
    endMonth = (options?.endMonth || 1) - 1;
    endDate = new Date(endYear, endMonth, 1);
  }

  if (!showMonths) {
    const startStr = startYear.toString();
    const endStr = endYear ? endYear.toString() : 'Present';

    if (startStr === endStr) return startStr;
    return `${startStr} - ${endStr}`;
  }

  // Formatting with months
  const startPart = `${months[startMonth]} ${startYear}`;
  const endPart = endYear ? `${months[endMonth!]} ${endYear}` : 'Present';

  // Calculate duration
  const calcEndDate = endYear ? endDate! : new Date();

  let years = calcEndDate.getFullYear() - startDate.getFullYear();
  let monthsCount = calcEndDate.getMonth() - startDate.getMonth();

  if (monthsCount < 0) {
    years--;
    monthsCount += 12;
  }

  // Rounding: If it's more than 15 days into the month, count it as a full month?
  // Actually, usually it's simpler: just the month difference.
  // But let's add 1 month to include the start month (Mar to Apr is 2 months of experience usually)
  monthsCount++;
  if (monthsCount >= 12) {
    years++;
    monthsCount -= 12;
  }

  let durationStr = '';
  if (years > 0) durationStr += `${years} yr${years > 1 ? 's' : ''}`;
  if (monthsCount > 0) {
    if (durationStr) durationStr += ' ';
    durationStr += `${monthsCount} mo${monthsCount > 1 ? 's' : ''}`;
  }

  return `${startPart} - ${endPart} (${durationStr})`;
}
