export const isValidExpiry = (value: string): boolean => {
  // Step 1: Regex for mm/yy format
  const regex = /^(0[1-9]|1[0-2])\/(\d{2})$/;
  const match = regex.exec(value);
  if (!match) return false;

  // Step 2: Year range check
  const month = parseInt(match[1], 10);
  const year = parseInt(match[2], 10);

  const currentYear = new Date().getFullYear() % 100; // last two digits
  const maxYear = currentYear + 5;

  return year >= 22 && year <= maxYear;
};
