"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface LaundryService {
  id?: number;
  name: string;
  description: string;
  pricePerKg: string;
  estimatedTime: string;
  category: string;
  status: "Active" | "Inactive";
}

interface LaundryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "edit";
  initialData?: LaundryService;
  onSubmit: (service: LaundryService) => void;
}

export default function LaundryFormModal({
  isOpen,
  onClose,
  mode,
  initialData,
  onSubmit,
}: LaundryFormModalProps) {
  const [formData, setFormData] = useState<LaundryService>({
    name: "",
    description: "",
    pricePerKg: "",
    estimatedTime: "",
    category: "",
    status: "Active",
  });

  const [errors, setErrors] = useState<Partial<LaundryService>>({});

  useEffect(() => {
    if (initialData && mode === "edit") {
      setFormData(initialData);
    } else if (mode === "add") {
      setFormData({
        name: "",
        description: "",
        pricePerKg: "",
        estimatedTime: "",
        category: "",
        status: "Active",
      });
    }
  }, [initialData, mode, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof LaundryService]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<LaundryService> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nama layanan wajib diisi";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Deskripsi wajib diisi";
    }

    if (!formData.pricePerKg.trim()) {
      newErrors.pricePerKg = "Harga per kg wajib diisi";
    }

    if (!formData.estimatedTime.trim()) {
      newErrors.estimatedTime = "Estimasi waktu wajib diisi";
    }

    if (!formData.category.trim()) {
      newErrors.category = "Kategori wajib diisi";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const categories = [
    "Pakaian",
    "Pakaian Premium",
    "Perlengkapan Rumah",
    "Sepatu",
    "Tas",
    "Lainnya"
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Tambah Layanan Laundry Baru" : "Edit Layanan Laundry"}
          </DialogTitle>
          <DialogDescription>
            {mode === "add"
              ? "Isi form di bawah untuk menambah layanan laundry baru."
              : "Perbarui informasi layanan laundry di bawah."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">
                Nama
              </label>
              <div className="col-span-3">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Contoh: Cuci Reguler"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="description" className="text-right">
                Deskripsi
              </label>
              <div className="col-span-3">
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Deskripsi layanan"
                  rows={3}
                />
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">{errors.description}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="pricePerKg" className="text-right">
                Harga/Kg
              </label>
              <div className="col-span-3">
                <input
                  id="pricePerKg"
                  name="pricePerKg"
                  type="text"
                  value={formData.pricePerKg}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Contoh: Rp 5.000"
                />
                {errors.pricePerKg && (
                  <p className="text-red-500 text-xs mt-1">{errors.pricePerKg}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="estimatedTime" className="text-right">
                Estimasi
              </label>
              <div className="col-span-3">
                <input
                  id="estimatedTime"
                  name="estimatedTime"
                  type="text"
                  value={formData.estimatedTime}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Contoh: 2 hari"
                />
                {errors.estimatedTime && (
                  <p className="text-red-500 text-xs mt-1">{errors.estimatedTime}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="category" className="text-right">
                Kategori
              </label>
              <div className="col-span-3">
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Pilih Kategori</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-red-500 text-xs mt-1">{errors.category}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="status" className="text-right">
                Status
              </label>
              <div className="col-span-3">
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Active">Aktif</option>
                  <option value="Inactive">Tidak Aktif</option>
                </select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit">
              {mode === "add" ? "Tambah" : "Simpan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}