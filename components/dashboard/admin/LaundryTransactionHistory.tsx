"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface LaundryTransaction {
  id: number;
  santriId: number;
  santriName: string;
  santriClass: string;
  serviceName: string;
  weight: number;
  totalPrice: string;
  date: string;
  status: "Completed" | "Processing" | "Pending" | "Cancelled";
  paymentMethod: "Cash" | "Transfer" | "Uang Saku";
}

interface LaundryTransactionHistoryProps {
  onEditModalOpen: (transaction: LaundryTransaction) => void;
  transactions: LaundryTransaction[];
  onDeleteTransaction: (id: number) => void;
  onAddNewTransaction: () => void;
  onViewDetails: (id: number) => void;
}

export default function LaundryTransactionHistory({
  onEditModalOpen,
  transactions,
  onDeleteTransaction,
  onAddNewTransaction,
  onViewDetails,
}: LaundryTransactionHistoryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Filter transactions based on search term and status
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = 
      transaction.santriName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.santriClass.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || transaction.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-600/20 text-emerald-400";
      case "Processing":
        return "bg-blue-600/20 text-blue-400";
      case "Pending":
        return "bg-amber-600/20 text-amber-400";
      case "Cancelled":
        return "bg-red-600/20 text-red-400";
      default:
        return "bg-slate-600/20 text-slate-400";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "Completed":
        return "Selesai";
      case "Processing":
        return "Diproses";
      case "Pending":
        return "Menunggu";
      case "Cancelled":
        return "Dibatalkan";
      default:
        return status;
    }
  };

  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case "Cash":
        return "Tunai";
      case "Transfer":
        return "Transfer";
      case "Uang Saku":
        return "Uang Saku";
      default:
        return method;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-700">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-4 sm:mb-0">
            Riwayat Transaksi Laundry
          </h2>
          <Button
            onClick={onAddNewTransaction}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md"
          >
            Tambah Transaksi Baru
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Cari transaksi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          <div className="sm:w-48">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="all" className="bg-slate-700">Semua Status</option>
              <option value="Completed" className="bg-slate-700">Selesai</option>
              <option value="Processing" className="bg-slate-700">Diproses</option>
              <option value="Pending" className="bg-slate-700">Menunggu</option>
              <option value="Cancelled" className="bg-slate-700">Dibatalkan</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-slate-800">
            <thead>
              <tr className="bg-slate-700 text-slate-300 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Nama Santri</th>
                <th className="py-3 px-6 text-left">Kelas</th>
                <th className="py-3 px-6 text-left">Layanan</th>
                <th className="py-3 px-6 text-left">Berat (Kg)</th>
                <th className="py-3 px-6 text-left">Total</th>
                <th className="py-3 px-6 text-left">Tanggal</th>
                <th className="py-3 px-6 text-left">Metode</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-slate-300 text-sm">
              {currentItems.length > 0 ? (
                currentItems.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors"
                  >
                    <td className="py-3 px-6 text-left">{transaction.id}</td>
                    <td className="py-3 px-6 text-left font-medium text-white">{transaction.santriName}</td>
                    <td className="py-3 px-6 text-left">{transaction.santriClass}</td>
                    <td className="py-3 px-6 text-left">{transaction.serviceName}</td>
                    <td className="py-3 px-6 text-left">{transaction.weight}</td>
                    <td className="py-3 px-6 text-left">{transaction.totalPrice}</td>
                    <td className="py-3 px-6 text-left">{transaction.date}</td>
                    <td className="py-3 px-6 text-left">{getPaymentMethodText(transaction.paymentMethod)}</td>
                    <td className="py-3 px-6 text-left">
                      <span
                        className={`py-1 px-3 rounded-full text-xs ${getStatusColor(transaction.status)}`}
                      >
                        {getStatusText(transaction.status)}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex item-center justify-center space-x-2">
                        <button
                          onClick={() => onViewDetails(transaction.id)}
                          className="transform hover:scale-110 text-emerald-400 hover:text-emerald-300 transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path
                              fillRule="evenodd"
                              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => onEditModalOpen(transaction)}
                          className="transform hover:scale-110 text-amber-400 hover:text-amber-300 transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => onDeleteTransaction(transaction.id)}
                          className="transform hover:scale-110 text-red-400 hover:text-red-300 transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="py-4 text-center text-slate-400">
                    Tidak ada transaksi laundry yang ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="mt-6 flex justify-center">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="border-slate-600 text-slate-300 hover:bg-slate-700 disabled:opacity-50"
              >
                Previous
              </Button>
              <span className="text-sm text-slate-400">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="border-slate-600 text-slate-300 hover:bg-slate-700 disabled:opacity-50"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-700">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-emerald-600/20 text-emerald-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-400">Total Transaksi</p>
              <p className="text-2xl font-semibold text-white">124</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-700">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-emerald-600/20 text-emerald-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-400">Selesai</p>
              <p className="text-2xl font-semibold text-white">98</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-700">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-amber-600/20 text-amber-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-400">Diproses</p>
              <p className="text-2xl font-semibold text-white">18</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-700">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-600/20 text-purple-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-400">Pendapatan Bulan Ini</p>
              <p className="text-2xl font-semibold text-white">Rp 3.240.000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}