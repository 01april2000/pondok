"use client";

import { useState } from "react";
import { Search, Plus, Edit, Trash2, Eye, Filter, Mail, Phone, Calendar, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: "admin" | "bendahara-smk" | "bendahara-smp" | "bendahara-pondok" | "santri";
  created_at: string;
  updated_at: string;
}

interface UserManagementProps {
  users: User[];
  onEditModalOpen: (user: User) => void;
  onAddNewUser: () => void;
  onDeleteUser: (id: number) => void;
  onViewDetails: (user: User) => void;
}

export default function UserManagement({
  users,
  onEditModalOpen,
  onAddNewUser,
  onDeleteUser,
  onViewDetails,
}: UserManagementProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm);
    
    const matchesRole = filterRole === "all" || user.role === filterRole;
    
    return matchesSearch && matchesRole;
  });

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "bendahara-smk":
        return "bg-indigo-500/20 text-indigo-400 border-indigo-500/30";
      case "bendahara-smp":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "bendahara-pondok":
        return "bg-pink-500/20 text-pink-400 border-pink-500/30";
      case "santri":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case "admin":
        return "Admin";
      case "bendahara-smk":
        return "Bendahara SMK";
      case "bendahara-smp":
        return "Bendahara SMP";
      case "bendahara-pondok":
        return "Bendahara Pondok";
      case "santri":
        return "Santri";
      default:
        return role;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <ScrollArea className="h-[calc(100vh-150px)]">
        <div className="p-6 space-y-6">
          {/* User Management Header */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl shadow-xl mb-6 border border-slate-600">
            <div className="px-6 py-4 border-b border-slate-600 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Manajemen Pengguna</h3>
              <Button
                onClick={onAddNewUser}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02] inline-flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Tambah Pengguna
              </Button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Total Pengguna</p>
                      <p className="text-2xl font-bold text-white">{users.length}</p>
                    </div>
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Admin</p>
                      <p className="text-2xl font-bold text-white">{users.filter(u => u.role === 'admin').length}</p>
                    </div>
                    <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Bendahara</p>
                      <p className="text-2xl font-bold text-white">{users.filter(u => u.role.includes('bendahara')).length}</p>
                    </div>
                    <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Santri</p>
                      <p className="text-2xl font-bold text-white">{users.filter(u => u.role === 'santri').length}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Users List */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl shadow-xl border border-slate-600">
            <div className="px-6 py-4 border-b border-slate-600 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h3 className="text-lg font-semibold text-white">Daftar Pengguna</h3>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Cari berdasarkan nama, email, atau nomor HP..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent w-64"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <svg className="h-4 w-4 text-slate-400 hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-slate-400" />
                  <select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    className="bg-slate-900/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="all">Semua Role</option>
                    <option value="admin">Admin</option>
                    <option value="bendahara-smk">Bendahara SMK</option>
                    <option value="bendahara-smp">Bendahara SMP</option>
                    <option value="bendahara-pondok">Bendahara Pondok</option>
                    <option value="santri">Santri</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-slate-400">
                  {filteredUsers.length} pengguna
                </span>
                {(searchTerm || filterRole !== "all") && (
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setFilterRole("all");
                    }}
                    className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
            <div className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-900/50">
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-200">ID</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-200">Nama</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-200">Email</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-200">No. HP</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-200">Role</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-200">Dibuat</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-200">Diperbarui</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-200">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-600">
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-slate-600/50 transition-colors">
                          <td className="px-4 py-3 text-sm text-slate-100">#{user.id}</td>
                          <td className="px-4 py-3 text-sm text-slate-100">{user.name}</td>
                          <td className="px-4 py-3 text-sm text-slate-100">{user.email}</td>
                          <td className="px-4 py-3 text-sm text-slate-100">{user.phone}</td>
                          <td className="px-4 py-3 text-sm">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeClass(user.role)}`}>
                              {getRoleDisplayName(user.role)}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-100">{formatDate(user.created_at)}</td>
                          <td className="px-4 py-3 text-sm text-slate-100">{formatDate(user.updated_at)}</td>
                          <td className="px-4 py-3 text-sm">
                            <button
                              onClick={() => {
                                setSelectedUser(user);
                                setIsDetailDialogOpen(true);
                                onViewDetails(user);
                              }}
                              className="text-emerald-400 hover:text-emerald-300 mr-3 inline-flex items-center transition-colors"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </button>
                            <button
                              onClick={() => onEditModalOpen(user)}
                              className="text-blue-400 hover:text-blue-300 mr-3 inline-flex items-center transition-colors"
                            >
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </button>
                            <button
                              onClick={() => onDeleteUser(user.id)}
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
                        <td colSpan={8} className="px-4 py-8 text-center text-slate-400">
                          Tidak ada pengguna yang ditemukan untuk "{searchTerm}"
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-400">
              Menampilkan <span className="font-medium text-white">{filteredUsers.length}</span> dari{" "}
              <span className="font-medium text-white">{users.length}</span> pengguna
            </div>
            <div className="flex gap-2">
              <button
                disabled
                className="px-3 py-1 text-sm bg-slate-700 text-slate-400 rounded-lg cursor-not-allowed"
              >
                Sebelumnya
              </button>
              <button className="px-3 py-1 text-sm bg-emerald-600 text-white rounded-lg">
                1
              </button>
              <button
                disabled
                className="px-3 py-1 text-sm bg-slate-700 text-slate-400 rounded-lg cursor-not-allowed"
              >
                Selanjutnya
              </button>
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* User Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-400" />
              Detail Pengguna
            </DialogTitle>
            <DialogDescription className="text-slate-300">
              Informasi lengkap pengguna sistem
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <span className="font-medium">ID Pengguna</span>
                  </div>
                  <div className="text-white font-medium">#{selectedUser.id}</div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <span className="font-medium">Role</span>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeClass(selectedUser.role)}`}>
                    {getRoleDisplayName(selectedUser.role)}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <span className="font-medium">Nama Lengkap</span>
                </div>
                <div className="text-white font-medium">{selectedUser.name}</div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Mail className="w-4 h-4" />
                  <span className="font-medium">Email</span>
                </div>
                <div className="text-white">{selectedUser.email}</div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Phone className="w-4 h-4" />
                  <span className="font-medium">Nomor HP</span>
                </div>
                <div className="text-white">{selectedUser.phone}</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Calendar className="w-4 h-4" />
                    <span className="font-medium">Dibuat</span>
                  </div>
                  <div className="text-white text-sm">{formatDate(selectedUser.created_at)}</div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Calendar className="w-4 h-4" />
                    <span className="font-medium">Diperbarui</span>
                  </div>
                  <div className="text-white text-sm">{formatDate(selectedUser.updated_at)}</div>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button
              onClick={() => setIsDetailDialogOpen(false)}
              className="bg-slate-600 hover:bg-slate-700 text-white"
            >
              Tutup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}