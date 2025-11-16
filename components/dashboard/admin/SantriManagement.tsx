"use client";

import { useState } from "react";
import { Edit, Trash2, Eye, Plus, X, User, Mail, Phone, Calendar, MapPin, BookOpen, DollarSign } from "lucide-react";
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
import SantriSearchComponent from "./SantriSearchComponent";
import SantriFormModal from "./SantriFormModal";

interface Santri {
  id: number;
  nis: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  birthDate: string;
  class: string;
  gender: string;
  enrollmentDate: string;
  status: string;
  sppStatus: string;
  syahriahStatus: string;
  sppPaymentDetails?: {
    paidMonths: string[]; // Array of month names (e.g., ["Januari", "Februari", "Maret"])
    unpaidMonths: string[]; // Array of month names
    totalPaid: number;
    totalUnpaid: number;
  };
  syahriahPaymentDetails?: {
    paidMonths: string[]; // Array of month names (e.g., ["Januari", "Februari", "Maret"])
    unpaidMonths: string[]; // Array of month names
    totalPaid: number;
    totalUnpaid: number;
  };
}

interface SantriManagementProps {
  onEditModalOpen: (santri: Santri) => void;
  onAddNewSantri: () => void;
  onViewDetails: (santri: Santri) => void;
  onDeleteSantri: (nis: string) => void;
  santriList?: Santri[];
}

export default function SantriManagement({ onEditModalOpen, onAddNewSantri, onViewDetails, onDeleteSantri, santriList = [] }: SantriManagementProps) {
  const [selectedSantri, setSelectedSantri] = useState<Santri | null>(null);
  const [showAllSantri, setShowAllSantri] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 5;

  // Filter santri based on search term
  const filteredSantri = santriList.filter((santri) =>
    santri.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    santri.nis.toLowerCase().includes(searchTerm.toLowerCase()) ||
    santri.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
    santri.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    santri.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredSantri.length / itemsPerPage);
  const indexOfLastSantri = currentPage * itemsPerPage;
  const indexOfFirstSantri = indexOfLastSantri - itemsPerPage;
  const currentSantri = filteredSantri.slice(indexOfFirstSantri, indexOfLastSantri);

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

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'aktif':
        return 'bg-emerald-500/20 text-emerald-400';
      case 'cuti':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'keluar':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-slate-500/20 text-slate-400';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'lunas':
        return 'bg-emerald-500/20 text-emerald-400';
      case 'belum lunas':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-slate-500/20 text-slate-400';
    }
  };

  return (
    <>
      <ScrollArea className="h-[calc(100vh-150px)]">
        {/* Santri Management Header */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl shadow-xl mb-6 border border-slate-600">
          <div className="px-6 py-4 border-b border-slate-600 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Data Santri</h3>
            <button
              onClick={onAddNewSantri}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02] inline-flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Tambah Santri
            </button>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Total Santri</p>
                    <p className="text-2xl font-bold text-white">{santriList.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-emerald-400" />
                  </div>
                </div>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Santri Aktif</p>
                    <p className="text-2xl font-bold text-white">{santriList.filter(s => s.status === 'Aktif').length}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">SPP Lunas</p>
                    <p className="text-2xl font-bold text-white">{santriList.filter(s => s.sppStatus === 'Lunas').length}</p>
                  </div>
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-emerald-400" />
                  </div>
                </div>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Syahriah Lunas</p>
                    <p className="text-2xl font-bold text-white">{santriList.filter(s => s.syahriahStatus === 'Lunas').length}</p>
                  </div>
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-emerald-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Santri List */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl shadow-xl border border-slate-600">
          <div className="px-6 py-4 border-b border-slate-600 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h3 className="text-lg font-semibold text-white">Daftar Santri</h3>
              <SantriSearchComponent
                items={santriList}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                placeholder="Cari santri..."
                title="Data Santri"
                onSearchSelect={handleSearchSelect}
                onCloseSearch={handleCloseSearch}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
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
          <div className="p-4">
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-slate-900/50">
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-200">NIS</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-200">Nama</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-200">Kelas</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-200">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-200">SPP</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-200">Syahriah</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-200">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-600">
                  {currentSantri.length > 0 ? (
                    currentSantri.map((santri) => (
                      <tr key={santri.id} className="hover:bg-slate-600/50 transition-colors">
                        <td className="px-4 py-3 text-sm text-slate-100">{santri.nis}</td>
                        <td className="px-4 py-3 text-sm text-slate-100">{santri.name}</td>
                        <td className="px-4 py-3 text-sm text-slate-100">{santri.class}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(santri.status)}`}>
                            {santri.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentStatusColor(santri.sppStatus)}`}>
                            {santri.sppStatus}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentStatusColor(santri.syahriahStatus)}`}>
                            {santri.syahriahStatus}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <button
                            onClick={() => {
                              setSelectedSantri(santri);
                              onViewDetails(santri);
                            }}
                            className="text-emerald-400 hover:text-emerald-300 mr-3 inline-flex items-center transition-colors"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </button>
                          <button
                            onClick={() => onEditModalOpen(santri)}
                            className="text-blue-400 hover:text-blue-300 mr-3 inline-flex items-center transition-colors"
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </button>
                          <button
                            onClick={() => onDeleteSantri(santri.nis)}
                            className="text-red-400 hover:text-red-300 inline-flex items-center transition-colors"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-slate-400">
                        Tidak ada santri yang ditemukan untuk "{searchTerm}"
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
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
                      <PaginationItem key={page} className="text-white hover:text-black">
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

      {/* Santri Details Modal */}
      {selectedSantri && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl shadow-2xl max-w-md w-full h-[85vh] border border-slate-600 flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-slate-600 flex-shrink-0">
              <AlertTitle className="text-base font-semibold text-white">Detail Santri</AlertTitle>
              <button
                onClick={() => setSelectedSantri(null)}
                className="text-slate-400 hover:text-slate-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full w-full p-4">
                <div className="pb-4">
                  <Alert className="bg-slate-900/50 border-slate-600">
                    <AlertDescription className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs font-medium text-slate-400">NIS</p>
                        <p className="text-sm font-semibold text-slate-100">{selectedSantri.nis}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-400">Nama</p>
                        <p className="text-sm font-semibold text-slate-100">{selectedSantri.name}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-400">Email</p>
                        <p className="text-sm text-slate-200 truncate">{selectedSantri.email}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-400">Telepon</p>
                        <p className="text-sm text-slate-200">{selectedSantri.phone}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-400">Lahir</p>
                        <p className="text-sm text-slate-200">{selectedSantri.birthDate}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-400">Gender</p>
                        <p className="text-sm text-slate-200">{selectedSantri.gender}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-400">Kelas</p>
                        <p className="text-sm text-slate-200">{selectedSantri.class}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-400">Status</p>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedSantri.status)}`}>
                          {selectedSantri.status}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-400">Alamat</p>
                      <p className="text-sm text-slate-200">{selectedSantri.address}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <p className="text-xs font-medium text-slate-400">Masuk</p>
                        <p className="text-sm text-slate-200">{selectedSantri.enrollmentDate}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-400">SPP</p>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(selectedSantri.sppStatus)}`}>
                          {selectedSantri.sppStatus}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-400">Syahriah</p>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(selectedSantri.syahriahStatus)}`}>
                          {selectedSantri.syahriahStatus}
                        </span>
                      </div>
                    </div>
                    
                    {/* SPP Payment Details Section */}
                    <div className="mt-3 pt-3 border-t border-slate-600">
                      <h4 className="text-sm font-semibold text-white mb-2">Pembayaran SPP</h4>
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <div className="bg-emerald-500/10 rounded p-2 border border-emerald-500/30">
                          <p className="text-xs font-medium text-emerald-400">Dibayar</p>
                          <p className="text-sm font-bold text-emerald-300">{selectedSantri.sppPaymentDetails?.totalPaid || 0}</p>
                        </div>
                        <div className="bg-red-500/10 rounded p-2 border border-red-500/30">
                          <p className="text-xs font-medium text-red-400">Belum</p>
                          <p className="text-sm font-bold text-red-300">{selectedSantri.sppPaymentDetails?.totalUnpaid || 0}</p>
                        </div>
                      </div>
                       
                      {selectedSantri.sppPaymentDetails?.paidMonths && selectedSantri.sppPaymentDetails.paidMonths.length > 0 ? (
                        <div className="mb-2">
                          <p className="text-xs font-medium text-emerald-400 mb-1">Dibayar:</p>
                          <div className="flex flex-wrap gap-1">
                            {selectedSantri.sppPaymentDetails.paidMonths.slice(0, 4).map((month, index) => (
                              <span key={index} className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                {month}
                              </span>
                            ))}
                            {selectedSantri.sppPaymentDetails.paidMonths.length > 4 && (
                              <span className="text-xs text-emerald-300">+{selectedSantri.sppPaymentDetails.paidMonths.length - 4}</span>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="mb-2">
                          <p className="text-xs font-medium text-emerald-400 mb-1">Dibayar:</p>
                          <p className="text-xs text-slate-400">Belum ada pembayaran</p>
                        </div>
                      )}
                       
                      {selectedSantri.sppPaymentDetails?.unpaidMonths && selectedSantri.sppPaymentDetails.unpaidMonths.length > 0 ? (
                        <div>
                          <p className="text-xs font-medium text-red-400 mb-1">Belum:</p>
                          <div className="flex flex-wrap gap-1">
                            {selectedSantri.sppPaymentDetails.unpaidMonths.slice(0, 4).map((month, index) => (
                              <span key={index} className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-red-500/20 text-red-300 border border-red-500/30">
                                {month}
                              </span>
                            ))}
                            {selectedSantri.sppPaymentDetails.unpaidMonths.length > 4 && (
                              <span className="text-xs text-red-300">+{selectedSantri.sppPaymentDetails.unpaidMonths.length - 4}</span>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className="text-xs font-medium text-red-400 mb-1">Belum:</p>
                          <p className="text-xs text-slate-400">Semua bulan telah dibayar</p>
                        </div>
                      )}
                    </div>
                    
                    {/* Syahriah Payment Details Section */}
                    <div className="mt-3 pt-3 border-t border-slate-600">
                      <h4 className="text-sm font-semibold text-white mb-2">Pembayaran Syahriah</h4>
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <div className="bg-emerald-500/10 rounded p-2 border border-emerald-500/30">
                          <p className="text-xs font-medium text-emerald-400">Dibayar</p>
                          <p className="text-sm font-bold text-emerald-300">{selectedSantri.syahriahPaymentDetails?.totalPaid || 0}</p>
                        </div>
                        <div className="bg-red-500/10 rounded p-2 border border-red-500/30">
                          <p className="text-xs font-medium text-red-400">Belum</p>
                          <p className="text-sm font-bold text-red-300">{selectedSantri.syahriahPaymentDetails?.totalUnpaid || 0}</p>
                        </div>
                      </div>
                         
                      {selectedSantri.syahriahPaymentDetails?.paidMonths && selectedSantri.syahriahPaymentDetails.paidMonths.length > 0 ? (
                        <div className="mb-2">
                          <p className="text-xs font-medium text-emerald-400 mb-1">Dibayar:</p>
                          <div className="flex flex-wrap gap-1">
                            {selectedSantri.syahriahPaymentDetails.paidMonths.slice(0, 4).map((month, index) => (
                              <span key={index} className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                {month}
                              </span>
                            ))}
                            {selectedSantri.syahriahPaymentDetails.paidMonths.length > 4 && (
                              <span className="text-xs text-emerald-300">+{selectedSantri.syahriahPaymentDetails.paidMonths.length - 4}</span>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="mb-2">
                          <p className="text-xs font-medium text-emerald-400 mb-1">Dibayar:</p>
                          <p className="text-xs text-slate-400">Belum ada pembayaran</p>
                        </div>
                      )}
                         
                      {selectedSantri.syahriahPaymentDetails?.unpaidMonths && selectedSantri.syahriahPaymentDetails.unpaidMonths.length > 0 ? (
                        <div>
                          <p className="text-xs font-medium text-red-400 mb-1">Belum:</p>
                          <div className="flex flex-wrap gap-1">
                            {selectedSantri.syahriahPaymentDetails.unpaidMonths.slice(0, 4).map((month, index) => (
                              <span key={index} className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-red-500/20 text-red-300 border border-red-500/30">
                                {month}
                              </span>
                            ))}
                            {selectedSantri.syahriahPaymentDetails.unpaidMonths.length > 4 && (
                              <span className="text-xs text-red-300">+{selectedSantri.syahriahPaymentDetails.unpaidMonths.length - 4}</span>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className="text-xs font-medium text-red-400 mb-1">Belum:</p>
                          <p className="text-xs text-slate-400">Semua bulan telah dibayar</p>
                        </div>
                      )}
                    </div>
                    </AlertDescription>
                  </Alert>
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      )}

      {/* All Santri Modal */}
      {showAllSantri && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl shadow-2xl max-w-6xl w-full flex flex-col border border-slate-600" style={{ maxHeight: '80vh' }}>
            <div className="flex items-center justify-between p-4 border-b border-slate-600 flex-shrink-0">
              <h2 className="text-xl font-semibold text-white">Semua Data Santri</h2>
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
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-200">Email</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-200">Kelas</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-200">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-200">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-600">
                    {santriList.map((santri) => (
                      <tr key={santri.id} className="hover:bg-slate-600/50 transition-colors">
                        <td className="px-4 py-3 text-sm text-slate-100">{santri.nis}</td>
                        <td className="px-4 py-3 text-sm text-slate-100">{santri.name}</td>
                        <td className="px-4 py-3 text-sm text-slate-100">{santri.email}</td>
                        <td className="px-4 py-3 text-sm text-slate-100">{santri.class}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(santri.status)}`}>
                            {santri.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <button
                            onClick={() => {
                              setSelectedSantri(santri);
                              setShowAllSantri(false);
                            }}
                            className="text-emerald-400 hover:text-emerald-300 mr-3 inline-flex items-center transition-colors"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
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
      )}
    </>
  );
}
