"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface LaundryPaymentClass {
  id: number;
  name: string;
  monthlyPrice: string;
  yearlyPrice: string;
}

interface LaundryPaymentManagementProps {
  onEditModalOpen: (classData: LaundryPaymentClass) => void;
  laundryClasses: LaundryPaymentClass[];
  onDeleteClass: (id: number) => void;
  onAddNewClass: () => void;
  onViewDetails: (id: number) => void;
}

export default function LaundryPaymentManagement({
  onEditModalOpen,
  laundryClasses,
  onDeleteClass,
  onAddNewClass,
  onViewDetails,
}: LaundryPaymentManagementProps) {
  return (
    <div className="space-y-6">
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
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-400">Total Pendapatan Bulan Ini</p>
              <p className="text-2xl font-semibold text-white">Rp 2.450.000</p>
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
              <p className="text-sm font-medium text-slate-400">Santri Sudah Bayar</p>
              <p className="text-2xl font-semibold text-white">45 / 60</p>
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
              <p className="text-sm font-medium text-slate-400">Menunggu Pembayaran</p>
              <p className="text-2xl font-semibold text-white">15</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}