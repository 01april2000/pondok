"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { X, DollarSign, Plus, Wallet } from "lucide-react";

interface Santri {
  id: number;
  nis: string;
  name: string;
  class: string;
  balance: number;
}

interface Transaction {
  id: number;
  santriId: number;
  santriName: string;
  description: string;
  amount: number;
  type: "topup" | "withdrawal";
  time: string;
  status: "Completed" | "Pending" | "Failed";
  statusColor: "green" | "yellow" | "red";
}

interface UangSakuFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "edit";
  initialData?: {
    transaction?: Transaction;
    santriId?: number;
  };
  onSubmit: (transaction: any) => void;
  santriBalances?: { [key: number]: number };
}

export default function UangSakuFormModal({
  isOpen,
  onClose,
  mode,
  initialData,
  onSubmit,
  santriBalances = {},
}: UangSakuFormModalProps) {
  const [santriId, setSantriId] = useState<number>(initialData?.santriId || 0);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"topup" | "withdrawal">("topup");
  const [status, setStatus] = useState<"Completed" | "Pending" | "Failed">("Completed");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Sample santri data - in a real app, this would come from an API
  const santriList: Santri[] = [
    { id: 1, nis: "2023001", name: "Ahmad Fauzi", class: "X-A", balance: santriBalances[1] || 250000 },
    { id: 2, nis: "2023002", name: "Siti Nurhaliza", class: "XI-B", balance: santriBalances[2] || 150000 },
    { id: 3, nis: "2023003", name: "Budi Santoso", class: "X-C", balance: santriBalances[3] || 50000 },
    { id: 4, nis: "2023004", name: "Rina Wijaya", class: "XII-A", balance: santriBalances[4] || 300000 },
    { id: 5, nis: "2023005", name: "Andi Pratama", class: "XI-C", balance: santriBalances[5] || 75000 },
    { id: 6, nis: "2023006", name: "Dewi Lestari", class: "X-B", balance: santriBalances[6] || 200000 },
    { id: 7, nis: "2023007", name: "Eko Susilo", class: "XII-B", balance: santriBalances[7] || 100000 },
    { id: 8, nis: "2023008", name: "Fitri Handayani", class: "X-D", balance: santriBalances[8] || 180000 },
  ];

  // Initialize form with data when editing
  useEffect(() => {
    if (mode === "edit" && initialData?.transaction) {
      const transaction = initialData.transaction;
      setSantriId(transaction.santriId);
      setDescription(transaction.description);
      setAmount(transaction.amount.toString());
      setType(transaction.type);
      setStatus(transaction.status);
    } else if (mode === "add") {
      // Reset form for adding new transaction
      setDescription("");
      setAmount("");
      setType("topup");
      setStatus("Completed");
      setErrors({});
      // Set santriId from initialData if available (for topup action)
      if (initialData?.santriId) {
        setSantriId(initialData.santriId);
      }
    }
  }, [mode, initialData]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!santriId) {
      newErrors.santriId = "Santri harus dipilih";
    }

    if (!description.trim()) {
      newErrors.description = "Deskripsi harus diisi";
    }

    if (!amount.trim()) {
      newErrors.amount = "Jumlah harus diisi";
    } else if (isNaN(Number(amount)) || Number(amount) <= 0) {
      newErrors.amount = "Jumlah harus berupa angka positif";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const selectedSantri = santriList.find(s => s.id === santriId);
    const transactionData = {
      id: mode === "edit" ? initialData?.transaction?.id : Date.now(),
      santriId,
      santriName: selectedSantri?.name || "",
      description,
      amount: Number(amount),
      type,
      time: mode === "edit" ? initialData?.transaction?.time : "Just now",
      status,
      statusColor: status === "Completed" ? "green" : status === "Pending" ? "yellow" : "red",
    };

    onSubmit(transactionData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl shadow-2xl max-w-md w-full border border-slate-600">
        <div className="flex items-center justify-between p-4 border-b border-slate-600">
          <AlertTitle className="text-lg font-semibold text-white">
            {mode === "add" ? "Tambah Transaksi Uang Saku" : "Edit Transaksi Uang Saku"}
          </AlertTitle>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Santri Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Santri
            </label>
            <select
              value={santriId}
              onChange={(e) => setSantriId(Number(e.target.value))}
              className={`w-full px-3 py-2 border rounded-md bg-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                errors.santriId ? "border-red-500" : "border-slate-500"
              }`}
              disabled={mode === "edit" || (mode === "add" && !!initialData?.santriId)} // Disable when editing or when santriId is preset for topup
            >
              <option value={0}>Pilih Santri</option>
              {santriList.map((santri) => (
                <option key={santri.id} value={santri.id}>
                  {santri.nis} - {santri.name} ({santri.class})
                </option>
              ))}
            </select>
            {errors.santriId && (
              <p className="mt-1 text-sm text-red-400">{errors.santriId}</p>
            )}
          </div>

          {/* Transaction Type */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Jenis Transaksi
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2 text-slate-300">
                <input
                  type="radio"
                  value="topup"
                  checked={type === "topup"}
                  onChange={(e) => setType(e.target.value as "topup" | "withdrawal")}
                  className="text-emerald-500 focus:ring-emerald-500"
                />
                <span>Top Up</span>
              </label>
              <label className="flex items-center space-x-2 text-slate-300">
                <input
                  type="radio"
                  value="withdrawal"
                  checked={type === "withdrawal"}
                  onChange={(e) => setType(e.target.value as "topup" | "withdrawal")}
                  className="text-emerald-500 focus:ring-emerald-500"
                />
                <span>Penarikan</span>
              </label>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Deskripsi
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Contoh: Top up uang saku bulanan"
              className={`w-full px-3 py-2 border rounded-md bg-slate-700 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                errors.description ? "border-red-500" : "border-slate-500"
              }`}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-400">{errors.description}</p>
            )}
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Jumlah (Rp)
            </label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              className={`w-full px-3 py-2 border rounded-md bg-slate-700 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                errors.amount ? "border-red-500" : "border-slate-500"
              }`}
            />
            {errors.amount && (
              <p className="mt-1 text-sm text-red-400">{errors.amount}</p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as "Completed" | "Pending" | "Failed")}
              className="w-full px-3 py-2 border border-slate-500 rounded-md bg-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>
          </div>

          {/* Current Balance Display */}
          {santriId && (
            <Alert className="bg-slate-900/50 border-slate-600">
              <DollarSign className="h-4 w-4 text-emerald-400" />
              <AlertTitle className="text-slate-200">Saldo Saat Ini</AlertTitle>
              <AlertDescription className="text-slate-300">
                {santriList.find(s => s.id === santriId)?.name}: Rp {santriList.find(s => s.id === santriId)?.balance.toLocaleString('id-ID')}
              </AlertDescription>
            </Alert>
          )}

          {/* Form Actions */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="border-slate-500 text-slate-300 hover:bg-slate-600 hover:text-white"
            >
              Batal
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
            >
              {mode === "add" ? "Tambah Transaksi" : "Simpan Perubahan"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}