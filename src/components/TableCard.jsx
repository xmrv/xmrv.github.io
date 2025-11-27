// src/components/TableCard.jsx
// Google Sheets'ten gelen veriyi şık bir tablo şeklinde gösterir
// Noto Sans fontu, modern kart tasarımı, responsive grid yapı

export default function TableCard({ title, rows }) {
  if (!rows || rows.length === 0)
    return (
      <div className="bg-white p-4 rounded-xl shadow text-gray-500 italic">
        Veri bulunamadı
      </div>
    );

  const headers = Object.keys(rows[0]);

  return (
    <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
      {/* Başlık */}
      <h3 className="text-xl font-semibold mb-4 tracking-wide">{title}</h3>

      {/* Tablo */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              {headers.map((h) => (
                <th
                  key={h}
                  className="px-4 py-2 text-left font-semibold text-gray-700 border-b"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="even:bg-gray-50">
                {headers.map((h) => (
                  <td key={h} className="px-4 py-2 border-b text-gray-800">
                    {row[h] ?? ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
