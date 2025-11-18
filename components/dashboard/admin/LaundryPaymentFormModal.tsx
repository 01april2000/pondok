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

interface LaundryPaymentClass {
  id?: number;
  name: string;
  monthlyPrice: string;
  yearlyPrice: string;
}

interface LaundryPaymentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "edit";
  initialData?: LaundryPaymentClass;
  onSubmit: (classData: LaundryPaymentClass) => void;
}

export default function LaundryPaymentFormModal({
  isOpen,
  onClose,
  mode,
  initialData,
  onSubmit,
}: LaundryPaymentFormModalProps) {
  const [formData, setFormData] = useState<LaundryPaymentClass>({
    name: "",
    monthlyPrice: "",
    yearlyPrice: "",
  });

  const [errors, setErrors] = useState<Partial<LaundryPaymentClass>>({});

  useEffect(() => {
    if (initialData && mode === "edit") {
      setFormData(initialData);
    } else if (mode === "add") {
      setFormData({
        name: "",
        monthlyPrice: "",
        yearlyPrice: "",
      });
    }
  }, [initialData, mode, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof LaundryPaymentClass]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<LaundryPaymentClass> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nama kelas wajib diisi";
    }

    if (!formData.monthlyPrice.trim()) {
      newErrors.monthlyPrice = "Harga bulanan wajib diisi";
    }

    if (!formData.yearlyPrice.trim()) {
      newErrors.yearlyPrice = "Harga tahunan wajib diisi";
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

  const classOptions = [
    "Class X",
    "Class XI",
    "Class XII",
    "Class VII",
    "Class VIII",
    "Class IX"
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-slate-800 border border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-white">
            {mode === "add" ? "Tambah Kelas Laundry Baru" : "Edit Kelas Laundry"}
          </DialogTitle>
          <DialogDescription className="text-slate-300">
            {mode === "add"
              ? "Isi form di bawah untuk menambah kelas laundry baru."
              : "Perbarui informasi kelas laundry di bawah."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right text-slate-300">
                Nama Kelas
              </label>
              <div className="col-span-3">
                <select
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="" className="bg-slate-700">Pilih Kelas</option>
                  {classOptions.map((option) => (
                    <option key={option} value={option} className="bg-slate-700">
                      {option}
                    </option>
                  ))}
                </select>
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="monthlyPrice" className="text-right text-slate-300">
                Harga Bulanan
              </label>
              <div className="col-span-3">
                <input
                  id="monthlyPrice"
                  name="monthlyPrice"
                  type="text"
                  value={formData.monthlyPrice}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Contoh: 50000"
                />
                {errors.monthlyPrice && (
                  <p className="text-red-400 text-xs mt-1">{errors.monthlyPrice}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="yearlyPrice" className="text-right text-slate-300">
                Harga Tahunan
              </label>
              <div className="col-span-3">
                <input
                  id="yearlyPrice"
                  name="yearlyPrice"
                  type="text"
                  value={formData.yearlyPrice}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Contoh: 600000"
                />
                {errors.yearlyPrice && (
                  <p className="text-red-400 text-xs mt-1">{errors.yearlyPrice}</p>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} className="border-slate-600 text-slate-300 hover:bg-slate-700">
              Batal
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
              {mode === "add" ? "Tambah" : "Simpan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}