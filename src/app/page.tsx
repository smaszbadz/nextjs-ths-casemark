"use client";

import React, { useState } from "react";

export default function Home() {
  const [invoiceNo, setInvoiceNo] = useState("");
  const [origin, setOrigin] = useState("");
  const [qty, setQty] = useState<number>(0);
  const [size, setSize] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/export', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ invoiceNo, origin, qty, size }),
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = invoiceNo+'.xlsx';
      link.click();
      window.URL.revokeObjectURL(url);
    } else {
      console.error('Failed to generate Excel file');
    }
  };


  const handlePrint = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const response = await fetch('/api/print', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ invoiceNo, origin, qty, size }),
    });
  
    if (response.ok) {
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
  
      // เปิด PDF ในหน้าต่างใหม่
      const newWindow = window.open(url, '_blank');
      if (newWindow) {
        newWindow.focus();
        newWindow.print(); // สั่งพิมพ์โดยอัตโนมัติ
      }
    } else {
      console.error('Failed to generate PDF');
    }
  };
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container md:px-5 px-6 py-4 mx-auto w-8/12">
        <form onSubmit={handleSubmit}>
          <p className="text-4xl font-bold text-center text-blue-700 mb-4">THS - Case Mark</p>
          <div className="bg-white border border-gray-300 rounded-lg p-6">
            <div className="flex items-center gap-4">
              <div className="flex-none w-36">
                <p className="text-sm text-right font-bold">Invoice No. :</p>
              </div>
              <div className="flex-1">
                <input type="text" className="input uppercase" onChange={(e) => setInvoiceNo(e.target.value.toUpperCase())} required />
              </div>
            </div>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex-none w-36">
                <p className="text-sm text-right font-bold">Origin :</p>
              </div>
              <div className="flex-1">
{/* FIX ORIGIN  */}
                <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " onChange={(e) => setOrigin(e.target.value)}  required>
                <option value="">- S E L E C T -</option>
                    <option value="ALOR STAR, MALAYSIA">ALOR STAR, MALAYSIA</option>
                    <option value="BANGALORE, INDIA">BANGALORE, INDIA</option>
                    <option value="BUDAPEST, HUNGARY">BUDAPEST, HUNGARY</option>
                    <option value="CHICAGO, USA">CHICAGO, USA</option>
                    <option value="FUKUOKA, JAPAN">FUKUOKA, JAPAN</option>
                    <option value="GUADALAJARA, MEXICO">GUADALAJARA, MEXICO</option>
                    <option value="GUANGZHOU, CHINA">GUANGZHOU, CHINA</option>
                    <option value="HAIPHONG, VIETNAM">HAIPHONG, VIETNAM</option>
                    <option value="HAKATA, JAPAN">HAKATA, JAPAN</option>
                    <option value="HIROSHIMA, JAPAN">HIROSHIMA, JAPAN</option>
                    <option value="JAKARTA, INDONESIA">JAKARTA, INDONESIA</option>
                    <option value="KAOHSIUNG, TAIWAN">KAOHSIUNG, TAIWAN</option>
                    <option value="KARACHI, PAKISTAN">KARACHI, PAKISTAN</option>
                    <option value="KEELUNG, TAIWAN">KEELUNG, TAIWAN</option>
                    <option value="KLANG, MALAYSIA">KLANG, MALAYSIA</option>
                    <option value="KOBE, JAPAN">KOBE, JAPAN</option>
                    <option value="MANILA, PHILIPPINES">MANILA, PHILIPPINES</option>
                    <option value="MANZANILLO, MEXICO">MANZANILLO, MEXICO</option>
                    <option value="NAGOYA, JAPAN">NAGOYA, JAPAN</option>
                    <option value="NARITA, JAPAN">NARITA, JAPAN</option>
                    <option value="NEW DELHI, INDIA">NEW DELHI, INDIA</option>
                    <option value="OKAZAKI, JAPAN">OKAZAKI, JAPAN</option>
                    <option value="OSAKA, JAPAN">OSAKA, JAPAN</option>
                    <option value="PHNOM PENH, CAMBODIA">PHNOM PENH, CAMBODIA</option>
                    <option value="POIPET, CAMBODIA">POIPET, CAMBODIA</option>
                    <option value="SANTOS, BRAZIL">SANTOS, BRAZIL</option>
                    <option value="SAOPAULO, BRAZIL">SAOPAULO, BRAZIL</option>
                    <option value="SEREMBAN, MALAYSIA">SEREMBAN, MALAYSIA</option>
                    <option value="SHANGHAI, CHINA">SHANGHAI, CHINA</option>
                    <option value="SIHANOUKVILLE, CAMBODIA">SIHANOUKVILLE, CAMBODIA</option>
                    <option value="SOUTHAMPTON, UK">SOUTHAMPTON, UK</option>
                    <option value="TIANJIN, CHINA">TIANJIN, CHINA</option>
                    <option value="TOKYO, JAPAN">TOKYO, JAPAN</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex-none w-36">
                <p className="text-sm text-right font-bold">Qty Packs :</p>
              </div>
              <div className="flex-1">
                <input type="number" className="input" onChange={(e) => setQty(Number(e.target.value))} required />
              </div>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex-none w-36">
                <p className="text-sm text-right font-bold">Size :</p>
              </div>
              <div className="flex items-center me-4">
                <input id="size_large" type="radio" name="size" value="Large" checked={size === "Large"} onChange={(e) => setSize(e.target.value)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" />
                <label htmlFor="size_large" className="ms-2 text-sm font-medium text-gray-900">Large</label>
              </div>
              <div className="flex items-center me-4">
                <input id="size_small" type="radio" name="size" value="Small" checked={size === "Small"} onChange={(e) => setSize(e.target.value)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 " />
                <label htmlFor="size_small" className="ms-2 text-sm font-medium text-gray-900">Small</label>
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Export</button>

            <button type="button" onClick={handlePrint} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Print</button>
          </div>
        </form>
      </div>
    </main>
  );
}