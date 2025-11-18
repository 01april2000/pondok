"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface LaundryService {
  id: number;
  name: string;
  description: string;
  pricePerKg: string;
  estimatedTime: string;
  category: string;
  status: "Active" | "Inactive";
}

interface LaundryManagementProps {
  onEditModalOpen: (service: LaundryService) => void;
  onAddNewService: () => void;
  onDeleteService: (id: number) => void;
  onViewDetails: (id: number) => void;
}

export default function LaundryManagement({
  onEditModalOpen,
  onAddNewService,
  onDeleteService,
  onViewDetails,
}: LaundryManagementProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // Sample data for laundry services
  const [laundryServices] = useState<LaundryService[]>([
    {
      id: 1,
      name: "Cuci Reguler",
      description: "Layanan cuci biasa untuk pakaian sehari-hari",
      pricePerKg: "Rp 5.000",
      estimatedTime: "2 hari",
      category: "Pakaian",
      status: "Active"
    },
    {
      id: 2,
      name: "Cuci + Setrika",
      description: "Layanan cuci dan setrika untuk pakaian formal",
      pricePerKg: "Rp 8.000",
      estimatedTime: "3 hari",
      category: "Pakaian",
      status: "Active"
    },
    {
      id: 3,
      name: "Dry Cleaning",
      description: "Layanan dry cleaning untuk pakaian mahal",
      pricePerKg: "Rp 15.000",
      estimatedTime: "4 hari",
      category: "Pakaian Premium",
      status: "Active"
    },
    {
      id: 4,
      name: "Cuci Karpet",
      description: "Layanan khusus untuk pencucian karpet",
      pricePerKg: "Rp 12.000",
      estimatedTime: "5 hari",
      category: "Perlengkapan Rumah",
      status: "Active"
    },
    {
      id: 5,
      name: "Cuci Bed Cover",
      description: "Layanan khusus untuk bed cover dan selimut tebal",
      pricePerKg: "Rp 10.000",
      estimatedTime: "3 hari",
      category: "Perlengkapan Rumah",
      status: "Inactive"
    }
  ]);

  // Filter services based on search term
  const filteredServices = laundryServices.filter((service) =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredServices.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
            Manajemen Layanan Laundry
          </h2>
          <Button
            onClick={onAddNewService}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Tambah Layanan Baru
          </Button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari layanan laundry..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100 text-gray-700 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Nama Layanan</th>
                <th className="py-3 px-6 text-left">Deskripsi</th>
                <th className="py-3 px-6 text-left">Harga/Kg</th>
                <th className="py-3 px-6 text-left">Estimasi</th>
                <th className="py-3 px-6 text-left">Kategori</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {currentItems.length > 0 ? (
                currentItems.map((service) => (
                  <tr
                    key={service.id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="py-3 px-6 text-left">{service.id}</td>
                    <td className="py-3 px-6 text-left font-medium">{service.name}</td>
                    <td className="py-3 px-6 text-left">{service.description}</td>
                    <td className="py-3 px-6 text-left">{service.pricePerKg}</td>
                    <td className="py-3 px-6 text-left">{service.estimatedTime}</td>
                    <td className="py-3 px-6 text-left">{service.category}</td>
                    <td className="py-3 px-6 text-left">
                      <span
                        className={`py-1 px-3 rounded-full text-xs ${
                          service.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {service.status === "Active" ? "Aktif" : "Tidak Aktif"}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex item-center justify-center space-x-2">
                        <button
                          onClick={() => onViewDetails(service.id)}
                          className="transform hover:scale-110 text-blue-600 hover:text-blue-900"
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
                          onClick={() => onEditModalOpen(service)}
                          className="transform hover:scale-110 text-yellow-600 hover:text-yellow-900"
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
                          onClick={() => onDeleteService(service.id)}
                          className="transform hover:scale-110 text-red-600 hover:text-red-900"
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
                  <td colSpan={8} className="py-4 text-center">
                    Tidak ada layanan laundry yang ditemukan
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
              >
                Previous
              </Button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}