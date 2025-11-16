"use client";

import { useState } from "react";
import { Edit, Trash2, Eye, DollarSign, X } from "lucide-react";
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
import SearchComponent from "./SearchComponent";

interface SPPClass {
  name: string;
  monthly: string;
  semester: string;
}

interface SPPManagementProps {
  onEditModalOpen: (className: string, monthly: string, semester: string) => void;
  sppClasses: SPPClass[];
  onDeleteClass: (className: string) => void;
  onAddNewClass: () => void;
  onViewDetails: (transactionId: number) => void;
}

export default function SPPManagement({ onEditModalOpen, sppClasses, onDeleteClass, onAddNewClass, onViewDetails }: SPPManagementProps) {
  const [selectedTransaction, setSelectedTransaction] = useState<typeof transactions[0] | null>(null);
  const [showAllTransactions, setShowAllTransactions] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 5;

  const transactions = [
    {
      id: 1,
      name: "Ahmad Fauzi",
      description: "Class X - Monthly SPP",
      amount: "Rp 150.000",
      time: "2 hours ago",
      status: "Completed",
      statusColor: "green"
    },
    {
      id: 2,
      name: "Siti Nurhaliza",
      description: "Class XI - Semester SPP",
      amount: "Rp 800.000",
      time: "5 hours ago",
      status: "Pending",
      statusColor: "yellow"
    },
    {
      id: 3,
      name: "Budi Santoso",
      description: "Class X - Monthly SPP",
      amount: "Rp 150.000",
      time: "1 day ago",
      status: "Completed",
      statusColor: "green"
    },
    {
      id: 4,
      name: "Rina Wijaya",
      description: "Class XII - Monthly SPP",
      amount: "Rp 200.000",
      time: "2 days ago",
      status: "Completed",
      statusColor: "green"
    },
    {
      id: 5,
      name: "Andi Pratama",
      description: "Class XI - Semester SPP",
      amount: "Rp 800.000",
      time: "3 days ago",
      status: "Pending",
      statusColor: "yellow"
    },
    {
      id: 6,
      name: "Dewi Lestari",
      description: "Class X - Monthly SPP",
      amount: "Rp 150.000",
      time: "4 days ago",
      status: "Failed",
      statusColor: "red"
    },
    {
      id: 7,
      name: "Eko Susilo",
      description: "Class XII - Semester SPP",
      amount: "Rp 900.000",
      time: "5 days ago",
      status: "Completed",
      statusColor: "green"
    },
    {
      id: 8,
      name: "Fitri Handayani",
      description: "Class X - Monthly SPP",
      amount: "Rp 150.000",
      time: "1 week ago",
      status: "Completed",
      statusColor: "green"
    }
  ];

  // Filter transactions based on search term
  const filteredTransactions = transactions.filter((transaction) =>
    transaction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const indexOfLastTransaction = currentPage * itemsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - itemsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchSelect = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleCloseSearch = () => {
    setSearchTerm("");
    setCurrentPage(1); // Reset to first page when clearing search
  };

  return (
    <>
      <ScrollArea className="h-[calc(100vh-150px)]">
        {/* SPP Pricing Management */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl shadow-xl mb-6 border border-slate-600">
          <div className="px-6 py-4 border-b border-slate-600 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">SPP Management</h3>
            <button
              onClick={onAddNewClass}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02]"
            >
              Tambah Kelas
            </button>
          </div>
          <div className="p-6">
            <ScrollArea className="h-64">
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-slate-900/50">
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-200">Kelas</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-200">SPP/Bulanan</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-200">SPP/Semester</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-200">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-600">
                    {sppClasses.map((classItem, index) => (
                      <tr key={index} className="hover:bg-slate-600/50 transition-colors">
                        <td className="px-4 py-3 text-sm text-slate-100">{classItem.name}</td>
                        <td className="px-4 py-3 text-sm text-slate-100">{classItem.monthly}</td>
                        <td className="px-4 py-3 text-sm text-slate-100">{classItem.semester}</td>
                        <td className="px-4 py-3 text-sm">
                          <button
                            onClick={() => onEditModalOpen(
                              classItem.name,
                              classItem.monthly.replace(/[Rp .]/g, ''),
                              classItem.semester.replace(/[Rp .]/g, '')
                            )}
                            className="text-emerald-400 hover:text-emerald-300 mr-3 inline-flex items-center transition-colors"
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </button>
                          <button
                            onClick={() => onDeleteClass(classItem.name)}
                            className="text-red-400 hover:text-red-300 inline-flex items-center transition-colors"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl shadow-xl border border-slate-600">
          <div className="px-6 py-4 border-b border-slate-600 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h3 className="text-lg font-semibold text-white">Riwayat Transaksi SPP</h3>
              <SearchComponent
                items={transactions}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                placeholder="Cari transaksi SPP..."
                title="Transaksi SPP"
                onSearchSelect={handleSearchSelect}
                onCloseSearch={handleCloseSearch}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
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
          <div className="p-4">
              <div className="space-y-4 pr-4">
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
                            <DollarSign className={`w-5 h-5 ${
                              transaction.statusColor === 'green' ? 'text-emerald-400' :
                              transaction.statusColor === 'yellow' ? 'text-yellow-400' :
                              'text-red-400'
                            }`} />
                          </div>
                          <div>
                            <h4 className="font-medium text-slate-100">{transaction.name}</h4>
                            <p className="text-sm text-slate-400">{transaction.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-emerald-400">{transaction.amount}</p>
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
                        <button
                          onClick={() => setSelectedTransaction(transaction)}
                          className="text-emerald-400 hover:text-emerald-300 text-sm inline-flex items-center transition-colors"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </button>
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
                    <PaginationItem className="text-white">
                      <PaginationPrevious
                        onClick={() => handlePageChange(currentPage - 1)}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                      
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page} className="text-white hover:text-black ">
                        <PaginationLink
                          onClick={() => handlePageChange(page)}
                          isActive={currentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                      
                    <PaginationItem className="text-white">
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
                      <p className="text-sm font-medium text-slate-400">Nama Siswa</p>
                      <p className="text-sm font-semibold text-slate-100">{selectedTransaction.name}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm font-medium text-slate-400">Deskripsi</p>
                      <p className="text-sm text-slate-200">{selectedTransaction.description}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-400">Jumlah</p>
                      <p className="text-sm font-semibold text-emerald-400">{selectedTransaction.amount}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-400">Waktu</p>
                      <p className="text-sm text-slate-200">{selectedTransaction.time}</p>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </div>
      )}

      {/* All Transactions Modal */}
      {showAllTransactions && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl shadow-2xl max-w-4xl w-full flex flex-col border border-slate-600" style={{ maxHeight: '80vh' }}>
            <div className="flex items-center justify-between p-4 border-b border-slate-600 flex-shrink-0">
              <h2 className="text-xl font-semibold text-white">Semua Transaksi SPP</h2>
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
                          <DollarSign className={`w-5 h-5 ${
                            transaction.statusColor === 'green' ? 'text-emerald-400' : 
                            transaction.statusColor === 'yellow' ? 'text-yellow-400' : 
                            'text-red-400'
                          }`} />
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-100">{transaction.name}</h4>
                          <p className="text-sm text-slate-400">{transaction.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-emerald-400">{transaction.amount}</p>
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
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      )}
    </>
  );
}
