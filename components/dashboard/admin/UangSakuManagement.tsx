"use client";

import { useState } from "react";
import { Edit, Trash2, Eye, DollarSign, X, Plus, Wallet } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Santri {
  id: number;
  nis: string;
  name: string;
  class: string;
  balance: number;
}

interface Transaction {
  id: number;
  santriId: number;
  santriName: string;
  description: string;
  amount: number;
  type: "topup" | "withdrawal";
  time: string;
  status: "Completed" | "Pending" | "Failed";
  statusColor: "green" | "yellow" | "red";
}

interface UangSakuManagementProps {
  onEditModalOpen: (transaction: Transaction) => void;
  onAddNewTransaction: (santriId: number) => void;
  onViewDetails: (transactionId: number) => void;
  santriBalances?: { [key: number]: number };
  transactions?: Transaction[];
}

export default function UangSakuManagement({ onEditModalOpen, onAddNewTransaction, onViewDetails, santriBalances = {}, transactions = [] }: UangSakuManagementProps) {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [showAllTransactions, setShowAllTransactions] = useState(false);
  const [showAllSantri, setShowAllSantri] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [santriCurrentPage, setSantriCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [santriSearchTerm, setSantriSearchTerm] = useState("");

  const itemsPerPage = 5;
  const santriItemsPerPage = 5;

  // Sample data for santri with their balances
  const santriList: Santri[] = [
    { id: 1, nis: "2023001", name: "Ahmad Fauzi", class: "X-A", balance: santriBalances[1] || 250000 },
    { id: 2, nis: "2023002", name: "Siti Nurhaliza", class: "XI-B", balance: santriBalances[2] || 150000 },
    { id: 3, nis: "2023003", name: "Budi Santoso", class: "X-C", balance: santriBalances[3] || 50000 },
    { id: 4, nis: "2023004", name: "Rina Wijaya", class: "XII-A", balance: santriBalances[4] || 300000 },
    { id: 5, nis: "2023005", name: "Andi Pratama", class: "XI-C", balance: santriBalances[5] || 75000 },
    { id: 6, nis: "2023006", name: "Dewi Lestari", class: "X-B", balance: santriBalances[6] || 200000 },
    { id: 7, nis: "2023007", name: "Eko Susilo", class: "XII-B", balance: santriBalances[7] || 100000 },
    { id: 8, nis: "2023008", name: "Fitri Handayani", class: "X-D", balance: santriBalances[8] || 180000 },
  ];

  // Use transactions from props instead of hardcoded data

  // Filter transactions based on search term
  const filteredTransactions = transactions.filter((transaction) =>
    transaction.santriName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter santri based on search term
  const filteredSantri = santriList.filter((santri) =>
    santri.nis.toLowerCase().includes(santriSearchTerm.toLowerCase()) ||
    santri.name.toLowerCase().includes(santriSearchTerm.toLowerCase()) ||
    santri.class.toLowerCase().includes(santriSearchTerm.toLowerCase())
  );

  // Pagination logic for transactions
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const indexOfLastTransaction = currentPage * itemsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - itemsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  // Pagination logic for santri
  const santriTotalPages = Math.ceil(filteredSantri.length / santriItemsPerPage);
  const indexOfLastSantri = santriCurrentPage * santriItemsPerPage;
  const indexOfFirstSantri = indexOfLastSantri - santriItemsPerPage;
  const currentSantri = filteredSantri.slice(indexOfFirstSantri, indexOfLastSantri);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSantriPageChange = (page: number) => {
    setSantriCurrentPage(page);
  };

  const handleSearchSelect = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleSantriSearchSelect = (value: string) => {
    setSantriSearchTerm(value);
    setSantriCurrentPage(1);
  };

  const handleCloseSearch = () => {
    setSearchTerm("");
    setCurrentPage(1);
  };

  const handleCloseSantriSearch = () => {
    setSantriSearchTerm("");
    setSantriCurrentPage(1);
  };

  const formatCurrency = (amount: number) => {
    return `Rp ${amount.toLocaleString('id-ID')}`;
  };

  return (
    <>
      <ScrollArea className="h-[calc(100vh-150px)]">
        {/* Santri Balance List */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl shadow-xl mb-6 border border-slate-600">
          <div className="px-6 py-4 border-b border-slate-600 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h3 className="text-lg font-semibold text-white">Saldo Uang Saku Santri</h3>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Cari santri..."
                  value={santriSearchTerm}
                  onChange={(e) => {
                    setSantriSearchTerm(e.target.value);
                    setSantriCurrentPage(1);
                  }}
                  className="px-3 py-1 border border-slate-500 rounded-md text-sm bg-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                {santriSearchTerm && (
                  <button
                    onClick={handleCloseSantriSearch}
                    className="text-emerald-400 border-emerald-500 hover:bg-emerald-600 hover:text-white px-3 py-1 rounded-md text-sm border"
                  >
                    Tampilkan Semua
                  </button>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-400">
                {filteredSantri.length} santri
              </span>
              <button
                onClick={() => setShowAllSantri(true)}
                className="text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors"
              >
                View All →
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-slate-900/50">
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-200">NIS</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-200">Nama</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-200">Kelas</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-200">Saldo</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-200">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-600">
                  {currentSantri.length > 0 ? (
                    currentSantri.map((santri) => (
                      <tr key={santri.id} className="hover:bg-slate-600/50 transition-colors">
                        <td className="px-4 py-3 text-sm text-slate-100">{santri.nis}</td>
                        <td className="px-4 py-3 text-sm text-slate-100 font-medium">{santri.name}</td>
                        <td className="px-4 py-3 text-sm text-slate-100">{santri.class}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`font-semibold ${
                            santri.balance < 50000 ? 'text-red-400' : 
                            santri.balance < 100000 ? 'text-yellow-400' : 
                            'text-emerald-400'
                          }`}>
                            {formatCurrency(santri.balance)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <button
                            onClick={() => onAddNewTransaction(santri.id)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-md text-sm inline-flex items-center transition-colors"
                          >
                            <Plus className="w-3 h-3 mr-1" />
                            Top Up
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-slate-400">
                        Tidak ada santri yang ditemukan untuk "{santriSearchTerm}"
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Pagination for Santri */}
            {santriTotalPages > 1 && (
              <div className="mt-6 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => handleSantriPageChange(santriCurrentPage - 1)}
                        className={santriCurrentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                      
                    {Array.from({ length: santriTotalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => handleSantriPageChange(page)}
                          isActive={santriCurrentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                      
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => handleSantriPageChange(santriCurrentPage + 1)}
                        className={santriCurrentPage === santriTotalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl shadow-xl border border-slate-600">
          <div className="px-6 py-4 border-b border-slate-600 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h3 className="text-lg font-semibold text-white">Riwayat Transaksi Uang Saku</h3>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Cari transaksi..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="px-3 py-1 border border-slate-500 rounded-md text-sm bg-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                {searchTerm && (
                  <button
                    onClick={handleCloseSearch}
                    className="text-emerald-400 border-emerald-500 hover:bg-emerald-600 hover:text-white px-3 py-1 rounded-md text-sm border"
                  >
                    Tampilkan Semua
                  </button>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-400">
                {filteredTransactions.length} transaksi
              </span>
              <button
                onClick={() => setShowAllTransactions(true)}
                className="text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors"
              >
                View All →
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {currentTransactions.length > 0 ? (
                currentTransactions.map((transaction) => (
                  <div key={transaction.id} className="border border-slate-600 rounded-lg p-4 hover:bg-slate-700/50 transition-all duration-300 hover:shadow-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 ${
                          transaction.statusColor === 'green' ? 'bg-emerald-500/20' :
                          transaction.statusColor === 'yellow' ? 'bg-yellow-500/20' :
                          'bg-red-500/20'
                        } rounded-full flex items-center justify-center`}>
                          {transaction.type === 'topup' ? (
                            <Plus className={`w-5 h-5 ${
                              transaction.statusColor === 'green' ? 'text-emerald-400' :
                              transaction.statusColor === 'yellow' ? 'text-yellow-400' :
                              'text-red-400'
                            }`} />
                          ) : (
                            <Wallet className={`w-5 h-5 ${
                              transaction.statusColor === 'green' ? 'text-emerald-400' :
                              transaction.statusColor === 'yellow' ? 'text-yellow-400' :
                              'text-red-400'
                            }`} />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-100">{transaction.santriName}</h4>
                          <p className="text-sm text-slate-400">{transaction.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${
                          transaction.type === 'topup' ? 'text-emerald-400' : 'text-red-400'
                        }`}>
                          {transaction.type === 'topup' ? '+' : '-'}{formatCurrency(transaction.amount)}
                        </p>
                        <p className="text-sm text-slate-400">{transaction.time}</p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        transaction.statusColor === 'green' ? 'bg-emerald-500/20 text-emerald-400' :
                        transaction.statusColor === 'yellow' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {transaction.status}
                      </span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => onEditModalOpen(transaction)}
                          className="text-emerald-400 hover:text-emerald-300 text-sm inline-flex items-center transition-colors"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => setSelectedTransaction(transaction)}
                          className="text-emerald-400 hover:text-emerald-300 text-sm inline-flex items-center transition-colors"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-400">
                  Tidak ada transaksi yang ditemukan untuk "{searchTerm}"
                </div>
              )}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => handlePageChange(currentPage - 1)}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                      
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => handlePageChange(page)}
                          isActive={currentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                      
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => handlePageChange(currentPage + 1)}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </div>
      </ScrollArea>

      {/* Transaction Details Alert */}
      {selectedTransaction && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl shadow-2xl max-w-md w-full border border-slate-600">
            <div className="flex items-center justify-between p-4 border-b border-slate-600">
              <AlertTitle className="text-lg font-semibold text-white">Detail Transaksi</AlertTitle>
              <button
                onClick={() => setSelectedTransaction(null)}
                className="text-slate-400 hover:text-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <Alert className="bg-slate-900/50 border-slate-600">
                <AlertDescription className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-sm font-medium text-slate-400">ID Transaksi</p>
                      <p className="text-sm font-semibold text-slate-100">#{selectedTransaction.id}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-400">Status</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        selectedTransaction.statusColor === 'green' ? 'bg-emerald-500/20 text-emerald-400' : 
                        selectedTransaction.statusColor === 'yellow' ? 'bg-yellow-500/20 text-yellow-400' : 
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {selectedTransaction.status}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm font-medium text-slate-400">Nama Santri</p>
                      <p className="text-sm font-semibold text-slate-100">{selectedTransaction.santriName}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm font-medium text-slate-400">Deskripsi</p>
                      <p className="text-sm text-slate-200">{selectedTransaction.description}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-400">Jumlah</p>
                      <p className={`text-sm font-semibold ${
                        selectedTransaction.type === 'topup' ? 'text-emerald-400' : 'text-red-400'
                      }`}>
                        {selectedTransaction.type === 'topup' ? '+' : '-'}{formatCurrency(selectedTransaction.amount)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-400">Waktu</p>
                      <p className="text-sm text-slate-200">{selectedTransaction.time}</p>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            </div>
            <div className="flex justify-end p-4 border-t border-slate-600">
              <button
                onClick={() => setSelectedTransaction(null)}
                className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* All Transactions Modal */}
      {showAllTransactions && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl shadow-2xl max-w-4xl w-full flex flex-col border border-slate-600" style={{ maxHeight: '80vh' }}>
            <div className="flex items-center justify-between p-4 border-b border-slate-600 shrink-0">
              <h2 className="text-xl font-semibold text-white">Semua Transaksi Uang Saku</h2>
              <button
                onClick={() => setShowAllTransactions(false)}
                className="text-slate-400 hover:text-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <ScrollArea className="flex-1 p-4" style={{ maxHeight: 'calc(80vh - 140px)' }}>
              <div className="space-y-3">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="border border-slate-600 rounded-lg p-4 hover:bg-slate-700/50 transition-all duration-300 hover:shadow-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 ${
                          transaction.statusColor === 'green' ? 'bg-emerald-500/20' : 
                          transaction.statusColor === 'yellow' ? 'bg-yellow-500/20' : 
                          'bg-red-500/20'
                        } rounded-full flex items-center justify-center`}>
                          {transaction.type === 'topup' ? (
                            <Plus className={`w-5 h-5 ${
                              transaction.statusColor === 'green' ? 'text-emerald-400' : 
                              transaction.statusColor === 'yellow' ? 'text-yellow-400' : 
                              'text-red-400'
                            }`} />
                          ) : (
                            <Wallet className={`w-5 h-5 ${
                              transaction.statusColor === 'green' ? 'text-emerald-400' : 
                              transaction.statusColor === 'yellow' ? 'text-yellow-400' : 
                              'text-red-400'
                            }`} />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-100">{transaction.santriName}</h4>
                          <p className="text-sm text-slate-400">{transaction.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${
                          transaction.type === 'topup' ? 'text-emerald-400' : 'text-red-400'
                        }`}>
                          {transaction.type === 'topup' ? '+' : '-'}{formatCurrency(transaction.amount)}
                        </p>
                        <p className="text-sm text-slate-400">{transaction.time}</p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        transaction.statusColor === 'green' ? 'bg-emerald-500/20 text-emerald-400' : 
                        transaction.statusColor === 'yellow' ? 'bg-yellow-500/20 text-yellow-400' : 
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {transaction.status}
                      </span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            onEditModalOpen(transaction);
                            setShowAllTransactions(false);
                          }}
                          className="text-emerald-400 hover:text-emerald-300 text-sm inline-flex items-center transition-colors"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setSelectedTransaction(transaction);
                            setShowAllTransactions(false);
                          }}
                          className="text-emerald-400 hover:text-emerald-300 text-sm inline-flex items-center transition-colors"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="flex justify-end p-4 border-t border-slate-600 shrink-0">
              <button
                onClick={() => setShowAllTransactions(false)}
                className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* All Santri Modal */}
      {showAllSantri && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl shadow-2xl max-w-4xl w-full flex flex-col border border-slate-600" style={{ maxHeight: '80vh' }}>
            <div className="flex items-center justify-between p-4 border-b border-slate-600 shrink-0">
              <h2 className="text-xl font-semibold text-white">Semua Santri</h2>
              <button
                onClick={() => setShowAllSantri(false)}
                className="text-slate-400 hover:text-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <ScrollArea className="flex-1 p-4" style={{ maxHeight: 'calc(80vh - 140px)' }}>
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-slate-900/50">
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-200">NIS</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-200">Nama</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-200">Kelas</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-200">Saldo</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-200">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-600">
                    {santriList.map((santri) => (
                      <tr key={santri.id} className="hover:bg-slate-600/50 transition-colors">
                        <td className="px-4 py-3 text-sm text-slate-100">{santri.nis}</td>
                        <td className="px-4 py-3 text-sm text-slate-100 font-medium">{santri.name}</td>
                        <td className="px-4 py-3 text-sm text-slate-100">{santri.class}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`font-semibold ${
                            santri.balance < 50000 ? 'text-red-400' : 
                            santri.balance < 100000 ? 'text-yellow-400' : 
                            'text-emerald-400'
                          }`}>
                            {formatCurrency(santri.balance)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <button
                            onClick={() => {
                              onAddNewTransaction(santri.id);
                              setShowAllSantri(false);
                            }}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-md text-sm inline-flex items-center transition-colors"
                          >
                            <Plus className="w-3 h-3 mr-1" />
                            Top Up
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ScrollArea>
            <div className="flex justify-end p-4 border-t border-slate-600 shrink-0">
              <button
                onClick={() => setShowAllSantri(false)}
                className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}