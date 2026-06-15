export function validateDate(
  date: string
): boolean {
  const formats = [
    /^\d{4}-\d{2}-\d{2}$/,

    /^\d{2}\/\d{2}\/\d{4}$/,

    /^\d{2}-\d{2}-\d{4}$/,
  ];

  const matches = formats.some(
    (regex) => regex.test(date)
  );

  if (!matches) {
    return false;
  }

  const parsedDate = new Date(date);

  return !isNaN(
    parsedDate.getTime()
  );
}