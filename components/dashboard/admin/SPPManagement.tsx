"use client";

import { useState } from "react";
import { Edit, Trash2, Eye, DollarSign, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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

  return (
    <>
      {/* SPP Pricing Management */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">SPP Management</h3>
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
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">SPP/Bulanan</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">SPP/Semester</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sppClasses.map((classItem, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">{classItem.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{classItem.monthly}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{classItem.semester}</td>
                    <td className="px-4 py-3 text-sm">
                      <button
                        onClick={() => onEditModalOpen(
                          classItem.name,
                          classItem.monthly.replace(/[Rp .]/g, ''),
                          classItem.semester.replace(/[Rp .]/g, '')
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

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">Riwayat Transaksi SPP</h3>
          <button
            onClick={() => setShowAllTransactions(true)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            View All →
          </button>
        </div>
        <div className="p-6">
          <div className="space-y-4">
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
                    onClick={() => setSelectedTransaction(transaction)}
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
              <h2 className="text-xl font-semibold">Semua Transaksi SPP</h2>
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
    </>
  );
}