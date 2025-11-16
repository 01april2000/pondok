"use client";

import { Edit, Trash2, Eye, DollarSign } from "lucide-react";

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
    }
  ];

  return (
    <>
      {/* SPP Pricing Management */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">SPP Pricing Management</h3>
          <button
            onClick={onAddNewClass}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Add New Class
          </button>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Class</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Monthly SPP</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Semester SPP</th>
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
          <h3 className="text-lg font-semibold text-gray-800">Recent SPP Transactions</h3>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
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
                    onClick={() => onViewDetails(transaction.id)}
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
    </>
  );
}