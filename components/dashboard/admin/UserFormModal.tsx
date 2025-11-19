"use client";

import { useState, useEffect } from "react";
import { X, Eye, EyeOff, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: "admin" | "bendahara-smk" | "bendahara-smp" | "bendahara-pondok" | "santri";
  created_at?: string;
  updated_at?: string;
}

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "edit";
  initialData?: User;
  onSubmit: (user: User) => void;
}

export default function UserFormModal({
  isOpen,
  onClose,
  mode,
  initialData,
  onSubmit,
}: UserFormModalProps) {
  const [formData, setFormData] = useState<User>({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "santri",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<User>>({});

  useEffect(() => {
    if (initialData && mode === "edit") {
      setFormData({
        ...initialData,
        password: "", // Don't populate password in edit mode for security
      });
    } else {
      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        role: "santri",
      });
    }
    setErrors({});
  }, [initialData, mode, isOpen]);

  const validateForm = (): boolean => {
    const newErrors: Partial<User> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nama harus diisi";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email harus diisi";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }

    if (mode === "add" && !formData.password.trim()) {
      newErrors.password = "Password harus diisi";
    } else if (formData.password && formData.password.length < 6) {
      newErrors.password = "Password minimal 6 karakter";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Nomor HP harus diisi";
    } else if (!/^[0-9+\-\s()]+$/.test(formData.phone)) {
      newErrors.phone = "Format nomor HP tidak valid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const submitData: User = {
      ...formData,
      // In edit mode, only include password if it's been changed
      ...(mode === "edit" && !formData.password ? { password: initialData?.password || "" } : {}),
      // Add timestamps
      ...(mode === "add" ? {
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      } : {
        updated_at: new Date().toISOString(),
      }),
    };

    onSubmit(submitData);
  };

  const handleInputChange = (field: keyof User, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative w-full max-w-md transform rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 p-6 shadow-2xl transition-all">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">
              {mode === "add" ? "Tambah Pengguna Baru" : "Edit Pengguna"}
            </h2>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={`w-full px-3 py-2 bg-slate-700 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                  errors.name ? "border-red-500" : "border-slate-600"
                }`}
                placeholder="Masukkan nama lengkap"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-400">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`w-full px-3 py-2 bg-slate-700 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                  errors.email ? "border-red-500" : "border-slate-600"
                }`}
                placeholder="contoh@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password {mode === "edit" && "(Kosongkan jika tidak ingin mengubah)"}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className={`w-full px-3 py-2 pr-10 bg-slate-700 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                    errors.password ? "border-red-500" : "border-slate-600"
                  }`}
                  placeholder={mode === "add" ? "Masukkan password" : "Masukkan password baru"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Nomor HP
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className={`w-full px-3 py-2 bg-slate-700 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                  errors.phone ? "border-red-500" : "border-slate-600"
                }`}
                placeholder="+62 812-3456-7890"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
              )}
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Role
              </label>
              <select
                value={formData.role}
                onChange={(e) => handleInputChange("role", e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="santri">Santri</option>
                <option value="bendahara-smk">Bendahara SMK</option>
                <option value="bendahara-smp">Bendahara SMP</option>
                <option value="bendahara-pondok">Bendahara Pondok</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                onClick={onClose}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white"
              >
                Batal
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                {mode === "add" ? "Tambah" : "Simpan"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}