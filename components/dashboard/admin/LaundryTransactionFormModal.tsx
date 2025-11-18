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

interface LaundryTransaction {
  id?: number;
  santriId: number;
  santriName: string;
  santriClass: string;
  serviceName: string;
  weight: number;
  totalPrice: string;
  date: string;
  status: "Completed" | "Processing" | "Pending" | "Cancelled";
  paymentMethod: "Cash" | "Transfer" | "Uang Saku";
}

interface LaundryTransactionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "edit";
  initialData?: LaundryTransaction;
  onSubmit: (transaction: LaundryTransaction) => void;
  santriList?: Array<{ id: number; name: string; class: string }>;
  laundryServices?: Array<{ id: number; name: string; pricePerKg: string }>;
}

export default function LaundryTransactionFormModal({
  isOpen,
  onClose,
  mode,
  initialData,
  onSubmit,
  santriList = [],
  laundryServices = [],
}: LaundryTransactionFormModalProps) {
  const [formData, setFormData] = useState<LaundryTransaction>({
    santriId: 0,
    santriName: "",
    santriClass: "",
    serviceName: "",
    weight: 0,
    totalPrice: "",
    date: new Date().toISOString().split('T')[0],
    status: "Pending",
    paymentMethod: "Cash",
  });

  const [errors, setErrors] = useState<Partial<LaundryTransaction>>({});

  useEffect(() => {
    if (initialData && mode === "edit") {
      setFormData(initialData);
    } else if (mode === "add") {
      setFormData({
        santriId: 0,
        santriName: "",
        santriClass: "",
        serviceName: "",
        weight: 0,
        totalPrice: "",
        date: new Date().toISOString().split('T')[0],
        status: "Pending",
        paymentMethod: "Cash",
      });
    }
  }, [initialData, mode, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    // Handle special cases
    if (name === "santriId") {
      const selectedSantri = santriList.find(s => s.id === parseInt(value));
      if (selectedSantri) {
        setFormData((prev) => ({
          ...prev,
          santriId: selectedSantri.id,
          santriName: selectedSantri.name,
          santriClass: selectedSantri.class,
        }));
      }
    } else if (name === "serviceName") {
      const selectedService = laundryServices.find(s => s.name === value);
      if (selectedService) {
        const pricePerKg = parseInt(selectedService.pricePerKg.replace(/[^\d]/g, ''));
        const weight = formData.weight || 0;
        const totalPrice = pricePerKg * weight;
        setFormData((prev) => ({
          ...prev,
          serviceName: value,
          totalPrice: `Rp ${totalPrice.toLocaleString('id-ID')}`,
        }));
      }
    } else if (name === "weight") {
      const weight = parseFloat(value) || 0;
      const selectedService = laundryServices.find(s => s.name === formData.serviceName);
      if (selectedService) {
        const pricePerKg = parseInt(selectedService.pricePerKg.replace(/[^\d]/g, ''));
        const totalPrice = pricePerKg * weight;
        setFormData((prev) => ({
          ...prev,
          weight,
          totalPrice: `Rp ${totalPrice.toLocaleString('id-ID')}`,
        }));
      } else {
        if (name === 'weight') {
          setFormData((prev) => ({ ...prev, weight: parseFloat(value) || 0 }));
        } else {
          setFormData((prev) => ({ ...prev, [name]: value }));
        }
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof LaundryTransaction]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: any = {};

    if (!formData.santriId) {
      newErrors.santriId = "Santri wajib dipilih";
    }

    if (!formData.serviceName.trim()) {
      newErrors.serviceName = "Layanan wajib dipilih";
    }

    if (!formData.weight || formData.weight <= 0) {
      newErrors.weight = "Berat harus lebih dari 0";
    }

    if (!formData.date.trim()) {
      newErrors.date = "Tanggal wajib diisi";
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

  const statusOptions = [
    { value: "Pending", label: "Menunggu" },
    { value: "Processing", label: "Diproses" },
    { value: "Completed", label: "Selesai" },
    { value: "Cancelled", label: "Dibatalkan" },
  ];

  const paymentMethodOptions = [
    { value: "Cash", label: "Tunai" },
    { value: "Transfer", label: "Transfer" },
    { value: "Uang Saku", label: "Uang Saku" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-slate-800 border border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-white">
            {mode === "add" ? "Tambah Transaksi Laundry Baru" : "Edit Transaksi Laundry"}
          </DialogTitle>
          <DialogDescription className="text-slate-300">
            {mode === "add"
              ? "Isi form di bawah untuk menambah transaksi laundry baru."
              : "Perbarui informasi transaksi laundry di bawah."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="santriId" className="text-right text-slate-300">
                Santri
              </label>
              <div className="col-span-3">
                <select
                  id="santriId"
                  name="santriId"
                  value={formData.santriId}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="" className="bg-slate-700">Pilih Santri</option>
                  {santriList.map((santri) => (
                    <option key={santri.id} value={santri.id} className="bg-slate-700">
                      {santri.name} - {santri.class}
                    </option>
                  ))}
                </select>
                {errors.santriId && (
                  <p className="text-red-400 text-xs mt-1">{errors.santriId}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="serviceName" className="text-right text-slate-300">
                Layanan
              </label>
              <div className="col-span-3">
                <select
                  id="serviceName"
                  name="serviceName"
                  value={formData.serviceName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="" className="bg-slate-700">Pilih Layanan</option>
                  {laundryServices.map((service) => (
                    <option key={service.id} value={service.name} className="bg-slate-700">
                      {service.name} - {service.pricePerKg}/kg
                    </option>
                  ))}
                </select>
                {errors.serviceName && (
                  <p className="text-red-400 text-xs mt-1">{errors.serviceName}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="weight" className="text-right text-slate-300">
                Berat (Kg)
              </label>
              <div className="col-span-3">
                <input
                  id="weight"
                  name="weight"
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={formData.weight}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Contoh: 2.5"
                />
                {errors.weight && (
                  <p className="text-red-400 text-xs mt-1">{errors.weight}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="totalPrice" className="text-right text-slate-300">
                Total Harga
              </label>
              <div className="col-span-3">
                <input
                  id="totalPrice"
                  name="totalPrice"
                  type="text"
                  value={formData.totalPrice}
                  readOnly
                  className="w-full px-3 py-2 bg-slate-600 border border-slate-600 rounded-md text-slate-300"
                  placeholder="Akan dihitung otomatis"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="date" className="text-right text-slate-300">
                Tanggal
              </label>
              <div className="col-span-3">
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                {errors.date && (
                  <p className="text-red-400 text-xs mt-1">{errors.date}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="paymentMethod" className="text-right text-slate-300">
                Metode Bayar
              </label>
              <div className="col-span-3">
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  {paymentMethodOptions.map((option) => (
                    <option key={option.value} value={option.value} className="bg-slate-700">
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="status" className="text-right text-slate-300">
                Status
              </label>
              <div className="col-span-3">
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value} className="bg-slate-700">
                      {option.label}
                    </option>
                  ))}
                </select>
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