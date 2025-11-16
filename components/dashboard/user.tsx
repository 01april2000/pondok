"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Wallet,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  CreditCard,
  DollarSign,
  BookOpen,
  Shirt,
  Home,
  Calendar,
  Clock,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  User as UserIcon,
  GraduationCap,
  IdCard,
  Cake
} from "lucide-react";

interface Transaction {
  id: string;
  type: "topup" | "allocation" | "expense";
  amount: number;
  category?: string;
  description: string;
  date: string;
  status: "completed" | "pending";
}

interface BalanceCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  amount: number;
  color: string;
  bgColor: string;
}

export default function User() {
  const [totalBalance, setTotalBalance] = useState(2500000);
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState("");
  const [showAllocationModal, setShowAllocationModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [allocationAmount, setAllocationAmount] = useState("");

  // Santri information
  const santriInfo = {
    name: "Ahmad Fadillah",
    nis: "2024001",
    kelas: "VII-A",
    umur: 13,
    foto: "/api/placeholder/80/80"
  };

  const [balanceCategories, setBalanceCategories] = useState<BalanceCategory[]>([
    {
      id: "uang_spp",
      name: "Uang SPP",
      icon: <BookOpen className="w-5 h-5" />,
      amount: 800000,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      id: "uang_saku",
      name: "Uang Saku",
      icon: <DollarSign className="w-5 h-5" />,
      amount: 500000,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      id: "uang_laundry",
      name: "Uang Laundry",
      icon: <Shirt className="w-5 h-5" />,
      amount: 200000,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      id: "syahriah",
      name: "Syahriah",
      icon: <Home className="w-5 h-5" />,
      amount: 400000,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      type: "topup",
      amount: 500000,
      description: "Top up via Transfer Bank",
      date: "2025-11-15",
      status: "completed"
    },
    {
      id: "2",
      type: "allocation",
      amount: 200000,
      category: "Uang SPP",
      description: "Alokasi ke Uang SPP",
      date: "2025-11-14",
      status: "completed"
    },
    {
      id: "3",
      type: "expense",
      amount: 50000,
      category: "Uang Saku",
      description: "Pengeluaran harian",
      date: "2025-11-13",
      status: "completed"
    },
    {
      id: "4",
      type: "allocation",
      amount: 100000,
      category: "Uang Laundry",
      description: "Alokasi ke Uang Laundry",
      date: "2025-11-12",
      status: "completed"
    }
  ]);

  const handleTopUp = () => {
    const amount = parseFloat(topUpAmount);
    if (amount && amount > 0) {
      setTotalBalance(prev => prev + amount);
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        type: "topup",
        amount,
        description: `Top up via Transfer Bank`,
        date: new Date().toISOString().split('T')[0],
        status: "completed"
      };
      setTransactions(prev => [newTransaction, ...prev]);
      setTopUpAmount("");
      setShowTopUpModal(false);
    }
  };

  const handleAllocation = () => {
    const amount = parseFloat(allocationAmount);
    if (amount && amount > 0 && selectedCategory) {
      const categoryIndex = balanceCategories.findIndex(cat => cat.id === selectedCategory);
      if (categoryIndex !== -1 && totalBalance >= amount) {
        const updatedCategories = [...balanceCategories];
        updatedCategories[categoryIndex].amount += amount;
        setBalanceCategories(updatedCategories);
        setTotalBalance(prev => prev - amount);
        
        const category = balanceCategories[categoryIndex].name;
        const newTransaction: Transaction = {
          id: Date.now().toString(),
          type: "allocation",
          amount,
          category,
          description: `Alokasi ke ${category}`,
          date: new Date().toISOString().split('T')[0],
          status: "completed"
        };
        setTransactions(prev => [newTransaction, ...prev]);
        setAllocationAmount("");
        setSelectedCategory("");
        setShowAllocationModal(false);
      }
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "topup":
        return <ArrowUpRight className="w-4 h-4 text-green-600" />;
      case "allocation":
        return <ChevronRight className="w-4 h-4 text-blue-600" />;
      case "expense":
        return <ArrowDownRight className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Santri Information Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {santriInfo.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></div>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">{santriInfo.name}</h2>
            <p className="text-gray-600 mb-3">Informasi Santri</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <IdCard className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500">NIS</p>
                  <p className="text-sm font-medium text-gray-800">{santriInfo.nis}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <GraduationCap className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500">Kelas</p>
                  <p className="text-sm font-medium text-gray-800">{santriInfo.kelas}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Cake className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500">Umur</p>
                  <p className="text-sm font-medium text-gray-800">{santriInfo.umur} tahun</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <UserIcon className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  <p className="text-sm font-medium text-green-600">Aktif</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">Dashboard Pengguna</h2>
            <p className="text-blue-100">Kelola keuangan dan alokasi untuk {santriInfo.name}</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
            <Wallet className="w-8 h-8" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <p className="text-blue-100 text-sm mb-1">Saldo Total</p>
            <p className="text-2xl font-bold">{formatCurrency(totalBalance)}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <p className="text-blue-100 text-sm mb-1">Total Dialokasikan</p>
            <p className="text-2xl font-bold">
              {formatCurrency(balanceCategories.reduce((sum, cat) => sum + cat.amount, 0))}
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <p className="text-blue-100 text-sm mb-1">Tersedia</p>
            <p className="text-2xl font-bold">
              {formatCurrency(totalBalance - balanceCategories.reduce((sum, cat) => sum + cat.amount, 0))}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => setShowTopUpModal(true)}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-4 flex items-center justify-between hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 rounded-full p-2">
              <Plus className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="font-semibold">Top Up Saldo</p>
              <p className="text-green-100 text-sm">Tambah uang ke akun Anda</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5" />
        </button>

        <button
          onClick={() => setShowAllocationModal(true)}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-4 flex items-center justify-between hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 rounded-full p-2">
              <CreditCard className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="font-semibold">Alokasikan Uang</p>
              <p className="text-blue-100 text-sm">Bagikan ke kategori</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Balance Categories */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
          Kategori Saldo
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {balanceCategories.map((category) => (
            <div
              key={category.id}
              className={cn(
                "rounded-xl p-4 border-2 border-gray-100 hover:border-gray-200 transition-all duration-200",
                category.bgColor
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={cn("p-2 rounded-lg bg-white/50", category.color)}>
                  {category.icon}
                </div>
                <span className={cn("text-xs font-medium", category.color)}>
                  {category.id.replace('_', ' ').toUpperCase()}
                </span>
              </div>
              <p className="text-gray-700 text-sm mb-1">{category.name}</p>
              <p className="text-xl font-bold text-gray-900">{formatCurrency(category.amount)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-blue-600" />
          Riwayat Transaksi
        </h3>
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-all duration-200"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 rounded-lg bg-gray-50">
                  {getTransactionIcon(transaction.type)}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{transaction.description}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>{transaction.date}</span>
                    {transaction.category && (
                      <>
                        <span>•</span>
                        <span className="font-medium">{transaction.category}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className={cn(
                  "font-semibold",
                  transaction.type === "topup" ? "text-green-600" : 
                  transaction.type === "expense" ? "text-red-600" : "text-blue-600"
                )}>
                  {transaction.type === "topup" ? "+" : "-"}
                  {formatCurrency(transaction.amount)}
                </p>
                <div className="flex items-center space-x-1 text-xs">
                  {transaction.status === "completed" ? (
                    <>
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span className="text-green-500">Selesai</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-3 h-3 text-yellow-500" />
                      <span className="text-yellow-500">Menunggu</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Up Modal */}
      {showTopUpModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Top Up Saldo</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jumlah
                </label>
                <input
                  type="number"
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Masukkan jumlah"
                />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowTopUpModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  onClick={handleTopUp}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Top Up
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Allocation Modal */}
      {showAllocationModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Alokasikan Uang</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategori
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Pilih kategori</option>
                  {balanceCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jumlah
                </label>
                <input
                  type="number"
                  value={allocationAmount}
                  onChange={(e) => setAllocationAmount(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Masukkan jumlah"
                />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowAllocationModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  onClick={handleAllocation}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Alokasikan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}