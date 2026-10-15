import React, { useState } from 'react';
import { Download, Check, FileSpreadsheet } from 'lucide-react';

export default function ExportCsvButton({
  data = [],
  filename = 'wow_teampulse_report.csv',
  label = 'Download Excel / CSV',
  className = ''
}) {
  const [downloaded, setDownloaded] = useState(false);

  const handleExport = () => {
    if (!data || !data.length) return;

    // Convert object keys to CSV header
    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(','),
      ...data.map(row =>
        headers
          .map(header => {
            const val = row[header];
            if (val === null || val === undefined) return '""';
            const escaped = String(val).replace(/"/g, '""');
            return `"${escaped}"`;
          })
          .join(',')
      )
    ];

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="inline-flex flex-col items-start gap-1">
      <button
        onClick={handleExport}
        className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all duration-150 ${
          downloaded
            ? 'bg-emerald-600 text-white'
            : 'bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white'
        } ${className}`}
      >
        {downloaded ? (
          <>
            <Check className="w-4 h-4 text-emerald-200" />
            <span>Exported {filename}</span>
          </>
        ) : (
          <>
            <FileSpreadsheet className="w-4 h-4 text-emerald-200" />
            <span>{label}</span>
            <Download className="w-3.5 h-3.5 opacity-80" />
          </>
        )}
      </button>
      <span className="text-[10px] text-slate-500 italic">
        * Prototype Feature: Generates valid CSV from current state
      </span>
    </div>
  );
}
