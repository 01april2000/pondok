"use client";

import { useState } from "react";
import { Check, X, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ScrollArea } from "@/components/ui/scroll-area";

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

interface StudentLaundryPayment {
  id: number;
  name: string;
  className: string;
  monthlyPayments: MonthlyPayment;
  yearlyPayment?: boolean;
}

interface LaundryPaymentClass {
  id: number;
  name: string;
  monthlyPrice: string;
  yearlyPrice: string;
}

interface LaundryManagementPageProps {
  onEditModalOpen: (classData: LaundryPaymentClass) => void;
  laundryClasses: LaundryPaymentClass[];
  onDeleteClass: (id: number) => void;
  onAddNewClass: () => void;
  onViewDetails: (id: number) => void;
}

export default function LaundryManagementPage({
  onEditModalOpen,
  laundryClasses,
  onDeleteClass,
  onAddNewClass,
  onViewDetails,
}: LaundryManagementPageProps) {
  const [showMonthlyPayments, setShowMonthlyPayments] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [monthlyCurrentPage, setMonthlyCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  
  const monthlyItemsPerPage = 5;

  // Sample data for monthly laundry payments
  const studentLaundryPayments: StudentLaundryPayment[] = [
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
    },
    {
      id: 5,
      name: "Andi Pratama",
      className: "Class XI",
      monthlyPayments: {
        january: false,
        february: false,
        march: false,
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

  // Function to check if student has paid for laundry service
  const hasPaidForLaundry = (student: StudentLaundryPayment) => {
    // Check if student has paid for at least one month or has yearly payment
    const hasMonthlyPayment = Object.values(student.monthlyPayments).some(payment => payment);
    return hasMonthlyPayment || student.yearlyPayment;
  };

  // Filter student payments based on search term
  const filteredStudentPayments = studentLaundryPayments.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.className.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic for monthly payments
  const monthlyTotalPages = Math.ceil(filteredStudentPayments.length / monthlyItemsPerPage);
  const indexOfLastStudent = monthlyCurrentPage * monthlyItemsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - monthlyItemsPerPage;
  const currentStudentPayments = filteredStudentPayments.slice(indexOfFirstStudent, indexOfLastStudent);

  const handleMonthlyPageChange = (page: number) => {
    setMonthlyCurrentPage(page);
  };

  return (
    <>
      <ScrollArea className="h-[calc(100vh-150px)]">
        <div className="space-y-6">
      {/* Laundry Class Management */}
      <div className="bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-700">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-4 sm:mb-0">
            Pembayaran Bulanan Laundry
          </h2>
          <Button
            onClick={onAddNewClass}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md"
          >
            Tambah Kelas Baru
          </Button>
        </div>

        <ScrollArea className="w-full rounded-md border border-slate-700">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-slate-800">
            <thead>
              <tr className="bg-slate-700 text-slate-300 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Nama Kelas</th>
                <th className="py-3 px-6 text-left">Harga Bulanan</th>
                <th className="py-3 px-6 text-left">Harga Tahunan</th>
                <th className="py-3 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-slate-300 text-sm">
              {laundryClasses.length > 0 ? (
                laundryClasses.map((classItem) => (
                  <tr
                    key={classItem.id}
                    className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors"
                  >
                    <td className="py-3 px-6 text-left">{classItem.id}</td>
                    <td className="py-3 px-6 text-left font-medium text-white">{classItem.name}</td>
                    <td className="py-3 px-6 text-left">{classItem.monthlyPrice}</td>
                    <td className="py-3 px-6 text-left">{classItem.yearlyPrice}</td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex item-center justify-center space-x-2">
                        <button
                          onClick={() => onViewDetails(classItem.id)}
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
                          onClick={() => onEditModalOpen(classItem)}
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
                          onClick={() => onDeleteClass(classItem.id)}
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
                  <td colSpan={5} className="py-4 text-center text-slate-400">
                    Tidak ada kelas laundry yang ditemukan
                  </td>
                </tr>
              )}
            </tbody>
            </table>
          </div>
        </ScrollArea>
      </div>

      {/* Monthly Payment Tracking */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl shadow-xl mb-6 border border-slate-600">
        <div className="px-6 py-4 border-b border-slate-600 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-semibold text-white">Pembayaran Laundry Bulanan Santri</h3>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="px-3 py-1 border border-slate-500 rounded-md text-sm bg-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-slate-400">
              {filteredStudentPayments.length} siswa
            </span>
            <button
              onClick={() => setShowMonthlyPayments(true)}
              className="text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors"
            >
              Lihat Semua →
            </button>
          </div>
        </div>
        <div className="p-6">
          <ScrollArea className="w-full rounded-md border border-slate-700">
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
              <thead>
                <tr className="bg-slate-900/50">
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-200">Nama Siswa</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-200">Kelas</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-200">Jan</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-200">Feb</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-200">Mar</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-200">Apr</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-200">Mei</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-200">Jun</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-600">
                {currentStudentPayments.length > 0 ? (
                  currentStudentPayments.map((student) => (
                    <tr key={student.id} className="hover:bg-slate-600/50 transition-colors">
                      <td className="px-4 py-3 text-sm text-slate-100 font-medium">{student.name}</td>
                      <td className="px-4 py-3 text-sm text-slate-100">{student.className}</td>
                      {months.slice(0, 6).map((month) => (
                        <td key={month.key} className="px-4 py-3 text-sm">
                          {hasPaidForLaundry(student) ? (
                            <button
                              onClick={() => toggleMonthlyPayment(student.id, month.key as keyof MonthlyPayment)}
                              className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${
                                student.monthlyPayments[month.key as keyof MonthlyPayment]
                                  ? 'bg-emerald-500 border-emerald-500 text-white'
                                  : 'bg-slate-600 border-slate-500 hover:border-emerald-400'
                              }`}
                            >
                              {student.monthlyPayments[month.key as keyof MonthlyPayment] && <Check className="w-4 h-4" />}
                            </button>
                          ) : (
                            <div className="w-6 h-6 rounded-md border-2 flex items-center justify-center bg-slate-700 border-slate-600">
                              <XCircle className="w-4 h-4 text-red-500" />
                            </div>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-slate-400">
                      Tidak ada siswa yang ditemukan
                    </td>
                  </tr>
                )}
              </tbody>
              </table>
            </div>
          </ScrollArea>
          
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

      {/* Monthly Payments Modal */}
      {showMonthlyPayments && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl shadow-2xl max-w-6xl w-full flex flex-col border border-slate-600" style={{ maxHeight: '90vh' }}>
            <div className="flex items-center justify-between p-4 border-b border-slate-600 flex-shrink-0">
              <div className="flex items-center space-x-4">
                <h2 className="text-xl font-semibold text-white">Pembayaran Laundry Bulanan Semua Siswa</h2>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="px-3 py-1 border border-slate-500 rounded-md text-sm bg-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                className="text-slate-400 hover:text-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <ScrollArea className="h-[70vh] p-4">
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead className="sticky top-0 bg-slate-800">
                    <tr className="bg-slate-900/50">
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-200">Nama Siswa</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-200">Kelas</th>
                      {months.map((month) => (
                        <th key={month.key} className="px-4 py-3 text-center text-sm font-medium text-slate-200">
                          {month.label.slice(0, 3)}
                        </th>
                      ))}
                      <th className="px-4 py-3 text-center text-sm font-medium text-slate-200">Tahunan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-600">
                    {studentLaundryPayments.map((student) => (
                      <tr key={student.id} className="hover:bg-slate-600/50 transition-colors">
                        <td className="px-4 py-3 text-sm text-slate-100 font-medium">{student.name}</td>
                        <td className="px-4 py-3 text-sm text-slate-100">{student.className}</td>
                        {months.map((month) => (
                          <td key={month.key} className="px-4 py-3 text-sm text-center">
                            {hasPaidForLaundry(student) ? (
                              <button
                                onClick={() => toggleMonthlyPayment(student.id, month.key as keyof MonthlyPayment)}
                                className={`w-6 h-6 rounded-md border-2 flex items-center justify-center mx-auto transition-colors ${
                                  student.monthlyPayments[month.key as keyof MonthlyPayment]
                                    ? 'bg-emerald-500 border-emerald-500 text-white'
                                    : 'bg-slate-600 border-slate-500 hover:border-emerald-400'
                                }`}
                              >
                                {student.monthlyPayments[month.key as keyof MonthlyPayment] && <Check className="w-4 h-4" />}
                              </button>
                            ) : (
                              <div className="w-6 h-6 rounded-md border-2 flex items-center justify-center mx-auto bg-slate-700 border-slate-600">
                                <XCircle className="w-4 h-4 text-red-500" />
                              </div>
                            )}
                          </td>
                        ))}
                        <td className="px-4 py-3 text-sm text-center">
                          <button
                            className={`w-6 h-6 rounded-md border-2 flex items-center justify-center mx-auto transition-colors ${
                              student.yearlyPayment
                                ? 'bg-blue-500 border-blue-500 text-white'
                                : 'bg-slate-600 border-slate-500 hover:border-blue-400'
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
            </ScrollArea>
            <div className="flex justify-end p-4 border-t border-slate-600 flex-shrink-0">
              <button
                onClick={() => setShowMonthlyPayments(false)}
                className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
        </div>
      </ScrollArea>
    </>
  );
}