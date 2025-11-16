"use client";

import { useState, useEffect } from "react";
import { X, User, Mail, Phone, Calendar, MapPin, BookOpen, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomDropdown } from "@/components/ui/custom-dropdown";

interface Santri {
  id?: number;
  nis: string;
  name: string;
  parentName: string;
  class: string;
  sppStatus: string;
  syahriahStatus: string;
}

interface SantriFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "edit";
  initialData?: Santri;
  onSubmit: (santri: Santri) => void;
}

const classOptions = [
  "X-A", "X-B", "X-C", "X-D",
  "XI-A", "XI-B"
];

const statusOptions = ["Aktif", "Cuti", "Keluar"];
const paymentStatusOptions = ["Lunas", "Belum Lunas"];

export default function SantriFormModal({ isOpen, onClose, mode, initialData, onSubmit }: SantriFormModalProps) {
  const [formData, setFormData] = useState<Santri>({
    nis: "",
    name: "",
    parentName: "",
    class: "",
    sppStatus: "Belum Lunas",
    syahriahStatus: "Belum Lunas"
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData && mode === "edit") {
      setFormData(initialData);
    } else if (mode === "add") {
      // Reset form for add mode
      setFormData({
        nis: "",
        name: "",
        parentName: "",
        class: "",
        sppStatus: "Belum Lunas",
        syahriahStatus: "Belum Lunas"
      });
    }
  }, [initialData, mode, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nis.trim()) {
      newErrors.nis = "NIS wajib diisi";
    }

    if (!formData.name.trim()) {
      newErrors.name = "Nama wajib diisi";
    }

    if (!formData.parentName.trim()) {
      newErrors.parentName = "Nama orang tua wajib diisi";
    }

    if (!formData.class) {
      newErrors.class = "Kelas wajib dipilih";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
      onClose();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl shadow-2xl max-w-2xl w-full border border-slate-600">
        <div className="flex items-center justify-between p-4 border-b border-slate-600">
          <h2 className="text-xl font-semibold text-white">
            {mode === "add" ? "Tambah Santri Baru" : "Edit Data Santri"}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* NIS */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <User className="inline w-4 h-4 mr-1" />
                NIS
              </label>
              <input
                type="text"
                name="nis"
                value={formData.nis}
                onChange={handleChange}
                className={`w-full px-3 py-2 bg-slate-900/50 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  errors.nis ? "border-red-500" : "border-slate-600"
                }`}
                placeholder="Masukkan NIS"
              />
              {errors.nis && <p className="mt-1 text-sm text-red-400">{errors.nis}</p>}
            </div>

            {/* Nama Lengkap */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <Users className="inline w-4 h-4 mr-1" />
                Nama Lengkap
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 bg-slate-900/50 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  errors.name ? "border-red-500" : "border-slate-600"
                }`}
                placeholder="Masukkan nama lengkap"
              />
              {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
            </div>

            {/* Nama Orang Tua */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <Users className="inline w-4 h-4 mr-1" />
                Nama Orang Tua
              </label>
              <input
                type="text"
                name="parentName"
                value={formData.parentName}
                onChange={handleChange}
                className={`w-full px-3 py-2 bg-slate-900/50 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  errors.parentName ? "border-red-500" : "border-slate-600"
                }`}
                placeholder="Masukkan nama orang tua"
              />
              {errors.parentName && <p className="mt-1 text-sm text-red-400">{errors.parentName}</p>}
            </div>

            {/* Kelas */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <BookOpen className="inline w-4 h-4 mr-1" />
                Kelas
              </label>
              <CustomDropdown
                options={classOptions}
                value={formData.class}
                onChange={(value) => setFormData(prev => ({ ...prev, class: value }))}
                placeholder="Pilih Kelas"
                className={errors.class ? "border-red-500" : "border-slate-600"}
              />
              {errors.class && <p className="mt-1 text-sm text-red-400">{errors.class}</p>}
            </div>

            {/* Status SPP */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Status SPP
              </label>
              <CustomDropdown
                options={paymentStatusOptions}
                value={formData.sppStatus}
                onChange={(value) => setFormData(prev => ({ ...prev, sppStatus: value }))}
                placeholder="Pilih Status SPP"
              />
            </div>

            {/* Status Syahriah */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Status Syahriah
              </label>
              <CustomDropdown
                options={paymentStatusOptions}
                value={formData.syahriahStatus}
                onChange={(value) => setFormData(prev => ({ ...prev, syahriahStatus: value }))}
                placeholder="Pilih Status Syahriah"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-end space-x-3">
            <Button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
            >
              Batal
            </Button>
            <Button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-300"
            >
              {mode === "add" ? "Tambah Santri" : "Simpan Perubahan"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}