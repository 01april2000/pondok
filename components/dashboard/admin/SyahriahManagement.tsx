"use client";

import { useState } from "react";
import { Edit, Trash2, Eye, DollarSign, X, Check } from "lucide-react";
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface SyahriahClass {
  name: string;
  monthly: string;
  yearly: string;
}

interface MonthlyPayment {
  january: boolean;
  february: boolean;
  march: boolean;
  april: boolean;
  may: boolean;
  june: boolean;
  july: boolean;
  august: boolean;
  september: boolean;
  october: boolean;
  november: boolean;
  december: boolean;
}

interface StudentPayment {
  id: number;
  name: string;
  className: string;
  monthlyPayments: MonthlyPayment;
  yearlyPayment?: boolean;
}

interface SyahriahManagementProps {
  onEditModalOpen: (className: string, monthly: string, yearly: string) => void;
  syahriahClasses: SyahriahClass[];
  onDeleteClass: (className: string) => void;
  onAddNewClass: () => void;
  onViewDetails: (transactionId: number) => void;
}

export default function SyahriahManagement({ onEditModalOpen, syahriahClasses, onDeleteClass, onAddNewClass, onViewDetails }: SyahriahManagementProps) {
  const [selectedTransaction, setSelectedTransaction] = useState<typeof transactions[0] | null>(null);
  const [showAllTransactions, setShowAllTransactions] = useState(false);
  const [showMonthlyPayments, setShowMonthlyPayments] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentPayment | null>(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchCommand, setShowSearchCommand] = useState(false);
  const [monthlyCurrentPage, setMonthlyCurrentPage] = useState(1);

  const itemsPerPage = 5;
  const monthlyItemsPerPage = 5;

  const transactions = [
    {
      id: 1,
      name: "Ahmad Fauzi",
      description: "Class X - Monthly Syahriah",
      amount: "Rp 100.000",
      time: "2 hours ago",
      status: "Completed",
      statusColor: "green"
    },
    {
      id: 2,
      name: "Siti Nurhaliza",
      description: "Class XI - Yearly Syahriah",
      amount: "Rp 1.200.000",
      time: "5 hours ago",
      status: "Pending",
      statusColor: "yellow"
    },
    {
      id: 3,
      name: "Budi Santoso",
      description: "Class X - Monthly Syahriah",
      amount: "Rp 100.000",
      time: "1 day ago",
      status: "Completed",
      statusColor: "green"
    },
    {
      id: 4,
      name: "Rina Wijaya",
      description: "Class XII - Monthly Syahriah",
      amount: "Rp 120.000",
      time: "2 days ago",
      status: "Completed",
      statusColor: "green"
    },
    {
      id: 5,
      name: "Andi Pratama",
      description: "Class XI - Yearly Syahriah",
      amount: "Rp 1.320.000",
      time: "3 days ago",
      status: "Pending",
      statusColor: "yellow"
    },
    {
      id: 6,
      name: "Dewi Lestari",
      description: "Class X - Monthly Syahriah",
      amount: "Rp 100.000",
      time: "4 days ago",
      status: "Failed",
      statusColor: "red"
    },
    {
      id: 7,
      name: "Eko Susilo",
      description: "Class XII - Yearly Syahriah",
      amount: "Rp 1.440.000",
      time: "5 days ago",
      status: "Completed",
      statusColor: "green"
    },
    {
      id: 8,
      name: "Fitri Handayani",
      description: "Class X - Monthly Syahriah",
      amount: "Rp 100.000",
      time: "1 week ago",
      status: "Completed",
      statusColor: "green"
    }
  ];

  const studentPayments: StudentPayment[] = [
    {
      id: 1,
      name: "Ahmad Fauzi",
      className: "Class X",
      monthlyPayments: {
        january: true,
        february: true,
        march: true,
        april: true,
        may: false,
        june: false,
        july: false,
        august: false,
        september: false,
        october: false,
        november: false,
        december: false
      },
      yearlyPayment: false
    },
    {
      id: 2,
      name: "Siti Nurhaliza",
      className: "Class XI",
      monthlyPayments: {
        january: true,
        february: true,
        march: true,
        april: false,
        may: false,
        june: false,
        july: false,
        august: false,
        september: false,
        october: false,
        november: false,
        december: false
      },
      yearlyPayment: true
    },
    {
      id: 3,
      name: "Budi Santoso",
      className: "Class X",
      monthlyPayments: {
        january: true,
        february: true,
        march: true,
        april: true,
        may: true,
        june: false,
        july: false,
        august: false,
        september: false,
        october: false,
        november: false,
        december: false
      },
      yearlyPayment: false
    },
    {
      id: 4,
      name: "Rina Wijaya",
      className: "Class XII",
      monthlyPayments: {
        january: true,
        february: true,
        march: true,
        april: true,
        may: true,
        june: true,
        july: false,
        august: false,
        september: false,
        october: false,
        november: false,
        december: false
      },
      yearlyPayment: false
    }
  ];

  const months = [
    { key: 'january', label: 'Januari' },
    { key: 'february', label: 'Februari' },
    { key: 'march', label: 'Maret' },
    { key: 'april', label: 'April' },
    { key: 'may', label: 'Mei' },
    { key: 'june', label: 'Juni' },
    { key: 'july', label: 'Juli' },
    { key: 'august', label: 'Agustus' },
    { key: 'september', label: 'September' },
    { key: 'october', label: 'Oktober' },
    { key: 'november', label: 'November' },
    { key: 'december', label: 'Desember' }
  ];

  const toggleMonthlyPayment = (studentId: number, month: keyof MonthlyPayment) => {
    // In a real application, this would update the database
    console.log(`Toggle payment for student ${studentId}, month: ${month}, year: ${selectedYear}`);
  };

  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

  // Filter transactions based on search term
  const filteredTransactions = transactions.filter((transaction) =>
    transaction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter student payments based on search term (same as transaction search)
  const filteredStudentPayments = studentPayments.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.className.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic for transactions
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const indexOfLastTransaction = currentPage * itemsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - itemsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  // Pagination logic for monthly payments
  const monthlyTotalPages = Math.ceil(filteredStudentPayments.length / monthlyItemsPerPage);
  const indexOfLastStudent = monthlyCurrentPage * monthlyItemsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - monthlyItemsPerPage;
  const currentStudentPayments = filteredStudentPayments.slice(indexOfFirstStudent, indexOfLastStudent);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleMonthlyPageChange = (page: number) => {
    setMonthlyCurrentPage(page);
  };

  const handleSearchSelect = (value: string) => {
    setSearchTerm(value);
    setShowSearchCommand(false);
    setCurrentPage(1); // Reset to first page when searching
    setMonthlyCurrentPage(1); // Reset monthly payment page when searching
  };

  const handleCloseSearch = () => {
    setSearchTerm("");
    setShowSearchCommand(false);
    setCurrentPage(1); // Reset to first page when clearing search
    setMonthlyCurrentPage(1); // Reset monthly payment page when clearing search
  };

  return (
    <>
      {/* Syahriah Pricing Management */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">Syahriah Management</h3>
          <button
            onClick={onAddNewClass}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Tambah Kelas
          </button>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Kelas</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Syahriah/Bulanan</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Syahriah/Tahunan</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {syahriahClasses.map((classItem, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">{classItem.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{classItem.monthly}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{classItem.yearly}</td>
                    <td className="px-4 py-3 text-sm">
                      <button
                        onClick={() => onEditModalOpen(
                          classItem.name,
                          classItem.monthly.replace(/[Rp .]/g, ''),
                          classItem.yearly.replace(/[Rp .]/g, '')
                        )}
                        className="text-blue-600 hover:text-blue-800 mr-3 inline-flex items-center"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => onDeleteClass(classItem.name)}
                        className="text-red-600 hover:text-red-800 inline-flex items-center"
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
        </div>
      </div>

      {/* Monthly Payment Tracking */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-semibold text-gray-800">Pembayaran Bulanan Santri</h3>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              {filteredStudentPayments.length} siswa
            </span>
            <button
              onClick={() => setShowMonthlyPayments(true)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Lihat Semua →
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Nama Siswa</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Kelas</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Jan</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Feb</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Mar</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Apr</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Mei</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Jun</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentStudentPayments.length > 0 ? (
                  currentStudentPayments.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900 font-medium">{student.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{student.className}</td>
                      {months.slice(0, 6).map((month) => (
                        <td key={month.key} className="px-4 py-3 text-sm">
                          <button
                            onClick={() => toggleMonthlyPayment(student.id, month.key as keyof MonthlyPayment)}
                            className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${
                              student.monthlyPayments[month.key as keyof MonthlyPayment]
                                ? 'bg-green-500 border-green-500 text-white'
                                : 'bg-white border-gray-300 hover:border-green-400'
                            }`}
                          >
                            {student.monthlyPayments[month.key as keyof MonthlyPayment] && <Check className="w-4 h-4" />}
                          </button>
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                      Tidak ada siswa yang ditemukan untuk "{searchTerm}"
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination for Monthly Payments */}
          {monthlyTotalPages > 1 && (
            <div className="mt-6 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handleMonthlyPageChange(monthlyCurrentPage - 1)}
                      className={monthlyCurrentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: monthlyTotalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => handleMonthlyPageChange(page)}
                        isActive={monthlyCurrentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handleMonthlyPageChange(monthlyCurrentPage + 1)}
                      className={monthlyCurrentPage === monthlyTotalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-semibold text-gray-800">Riwayat Transaksi Syahriah</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSearchCommand(true)}
              className="text-gray-600 hover:text-gray-800"
            >
              Search...
            </Button>
            {searchTerm && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleCloseSearch}
                className="text-blue-600 hover:text-blue-800"
              >
                Tampilkan Semua
              </Button>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              {filteredTransactions.length} transaksi
            </span>
            <button
              onClick={() => setShowAllTransactions(true)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View All →
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {currentTransactions.length > 0 ? (
              currentTransactions.map((transaction) => (
                <div key={transaction.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 bg-${transaction.statusColor}-100 rounded-full flex items-center justify-center`}>
                        <DollarSign className={`w-5 h-5 text-${transaction.statusColor}-600`} />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{transaction.name}</h4>
                        <p className="text-sm text-gray-600">{transaction.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">{transaction.amount}</p>
                      <p className="text-sm text-gray-500">{transaction.time}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${transaction.statusColor}-100 text-${transaction.statusColor}-800`}>
                      {transaction.status}
                    </span>
                    <button
                      onClick={() => setSelectedTransaction(transaction)}
                      className="text-blue-600 hover:text-blue-800 text-sm inline-flex items-center"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
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

      {/* Transaction Details Alert */}
      {selectedTransaction && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-4 border-b">
              <AlertTitle className="text-lg font-semibold">Detail Transaksi</AlertTitle>
              <button
                onClick={() => setSelectedTransaction(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <Alert>
                <AlertDescription className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-sm font-medium text-gray-500">ID Transaksi</p>
                      <p className="text-sm font-semibold">#{selectedTransaction.id}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Status</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${selectedTransaction.statusColor}-100 text-${selectedTransaction.statusColor}-800`}>
                        {selectedTransaction.status}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm font-medium text-gray-500">Nama Siswa</p>
                      <p className="text-sm font-semibold">{selectedTransaction.name}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm font-medium text-gray-500">Deskripsi</p>
                      <p className="text-sm">{selectedTransaction.description}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Jumlah</p>
                      <p className="text-sm font-semibold text-green-600">{selectedTransaction.amount}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Waktu</p>
                      <p className="text-sm">{selectedTransaction.time}</p>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            </div>
            <div className="flex justify-end p-4 border-t">
              <button
                onClick={() => setSelectedTransaction(null)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* All Transactions Modal */}
      {showAllTransactions && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full flex flex-col" style={{ maxHeight: '80vh' }}>
            <div className="flex items-center justify-between p-4 border-b flex-shrink-0">
              <h2 className="text-xl font-semibold">Semua Transaksi Syahriah</h2>
              <button
                onClick={() => setShowAllTransactions(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4" style={{ maxHeight: 'calc(80vh - 140px)' }}>
              <div className="space-y-3">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 bg-${transaction.statusColor}-100 rounded-full flex items-center justify-center`}>
                          <DollarSign className={`w-5 h-5 text-${transaction.statusColor}-600`} />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{transaction.name}</h4>
                          <p className="text-sm text-gray-600">{transaction.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">{transaction.amount}</p>
                        <p className="text-sm text-gray-500">{transaction.time}</p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${transaction.statusColor}-100 text-${transaction.statusColor}-800`}>
                        {transaction.status}
                      </span>
                      <button
                        onClick={() => {
                          setSelectedTransaction(transaction);
                          setShowAllTransactions(false);
                        }}
                        className="text-blue-600 hover:text-blue-800 text-sm inline-flex items-center"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end p-4 border-t flex-shrink-0">
              <button
                onClick={() => setShowAllTransactions(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Monthly Payments Modal */}
      {showMonthlyPayments && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full flex flex-col" style={{ maxHeight: '90vh' }}>
            <div className="flex items-center justify-between p-4 border-b flex-shrink-0">
              <div className="flex items-center space-x-4">
                <h2 className="text-xl font-semibold">Pembayaran Bulanan Semua Siswa</h2>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => setShowMonthlyPayments(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4">
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead className="sticky top-0 bg-white">
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Nama Siswa</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Kelas</th>
                      {months.map((month) => (
                        <th key={month.key} className="px-4 py-3 text-center text-sm font-medium text-gray-700">
                          {month.label.slice(0, 3)}
                        </th>
                      ))}
                      <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">Tahunan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {studentPayments.map((student) => (
                      <tr key={student.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-900 font-medium">{student.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{student.className}</td>
                        {months.map((month) => (
                          <td key={month.key} className="px-4 py-3 text-sm text-center">
                            <button
                              onClick={() => toggleMonthlyPayment(student.id, month.key as keyof MonthlyPayment)}
                              className={`w-6 h-6 rounded-md border-2 flex items-center justify-center mx-auto transition-colors ${
                                student.monthlyPayments[month.key as keyof MonthlyPayment]
                                  ? 'bg-green-500 border-green-500 text-white'
                                  : 'bg-white border-gray-300 hover:border-green-400'
                              }`}
                            >
                              {student.monthlyPayments[month.key as keyof MonthlyPayment] && <Check className="w-4 h-4" />}
                            </button>
                          </td>
                        ))}
                        <td className="px-4 py-3 text-sm text-center">
                          <button
                            className={`w-6 h-6 rounded-md border-2 flex items-center justify-center mx-auto transition-colors ${
                              student.yearlyPayment
                                ? 'bg-blue-500 border-blue-500 text-white'
                                : 'bg-white border-gray-300 hover:border-blue-400'
                            }`}
                          >
                            {student.yearlyPayment && <Check className="w-4 h-4" />}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex justify-end p-4 border-t flex-shrink-0">
              <button
                onClick={() => setShowMonthlyPayments(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search Command Dialog */}
      {showSearchCommand && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <Command className="rounded-lg border shadow-md">
              <CommandInput
                placeholder="Cari transaksi..."
                value={searchTerm}
                onValueChange={setSearchTerm}
              />
              <CommandList>
                <CommandEmpty>Tidak ada transaksi yang ditemukan.</CommandEmpty>
                <CommandGroup heading="Transaksi">
                  {filteredTransactions.slice(0, 10).map((transaction) => (
                    <CommandItem
                      key={transaction.id}
                      onSelect={() => handleSearchSelect(transaction.name)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 bg-${transaction.statusColor}-100 rounded-full flex items-center justify-center`}>
                          <DollarSign className={`w-4 h-4 text-${transaction.statusColor}-600`} />
                        </div>
                        <div>
                          <div className="font-medium">{transaction.name}</div>
                          <div className="text-sm text-gray-500">{transaction.description}</div>
                        </div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
            <div className="flex justify-end p-4 border-t">
              <Button
                onClick={handleCloseSearch}
                variant="outline"
              >
                Tutup
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}