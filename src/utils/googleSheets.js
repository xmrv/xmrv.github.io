// src/utils/googleSheets.js
// Google Sheets'ten veri çekme yardımcı fonksiyonu
// Public olarak paylaşılmış Sheet + API Key yöntemi kullanılır.

export async function getSheetData(sheetId, sheetName) {
  const apiKey = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
  const range = encodeURIComponent(sheetName);

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

  try {
    const res = await fetch(url);
    const json = await res.json();

    if (!json.values) return [];

    // values: [ ["İsim", "Günlük", ...], ["Elma", "10", ...], ... ]
    const rows = json.values;
    const header = rows[0];
    const data = rows.slice(1).map((r) => {
      const obj = {};
      header.forEach((h, i) => (obj[h] = r[i] ?? ""));
      return obj;
    });

    return data;
  } catch (err) {
    console.error("Sheets API Error:", err);
    return [];
  }
}
