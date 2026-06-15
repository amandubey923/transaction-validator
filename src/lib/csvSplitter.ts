export function splitCSVData(
  rows: Record<string, string>[],
  chunkSize = 1000
) {
  const chunks = [];

  for (
    let i = 0;
    i < rows.length;
    i += chunkSize
  ) {
    chunks.push(
      rows.slice(
        i,
        i + chunkSize
      )
    );
  }

  return chunks;
}