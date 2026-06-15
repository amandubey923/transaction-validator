export async function downloadCleanCsv(
  rows: Record<
    string,
    string
  >[]
) {
  const response =
    await fetch(
      "/api/download",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          rows,
        }),
      }
    );

  const blob =
    await response.blob();

  const url =
    window.URL.createObjectURL(
      blob
    );

  const link =
    document.createElement(
      "a"
    );

  link.href = url;

  link.download =
    "clean-data.csv";

  link.click();

  URL.revokeObjectURL(url);
}