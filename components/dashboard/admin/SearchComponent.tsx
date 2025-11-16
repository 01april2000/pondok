"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { DollarSign } from "lucide-react";

interface TransactionItem {
  id: number;
  name: string;
  description: string;
  amount: string;
  time: string;
  status: string;
  statusColor: string;
}

interface SearchComponentProps {
  items: TransactionItem[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  placeholder?: string;
  title?: string;
  onSearchSelect?: (value: string) => void;
  onCloseSearch?: () => void;
  currentPage?: number;
  setCurrentPage?: (page: number) => void;
  monthlyCurrentPage?: number;
  setMonthlyCurrentPage?: (page: number) => void;
}

export default function SearchComponent({
  items,
  searchTerm,
  setSearchTerm,
  placeholder = "Cari transaksi...",
  title = "Transaksi",
  onSearchSelect,
  onCloseSearch,
  currentPage,
  setCurrentPage,
  monthlyCurrentPage,
  setMonthlyCurrentPage,
}: SearchComponentProps) {
  const [showSearchCommand, setShowSearchCommand] = useState(false);

  // Filter items based on search term
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchSelect = (value: string) => {
    setSearchTerm(value);
    setShowSearchCommand(false);
    if (onSearchSelect) {
      onSearchSelect(value);
    }
    // Reset pagination when searching
    if (setCurrentPage) setCurrentPage(1);
    if (monthlyCurrentPage && setMonthlyCurrentPage) setMonthlyCurrentPage(1);
  };

  const handleCloseSearch = () => {
    setSearchTerm("");
    setShowSearchCommand(false);
    if (onCloseSearch) {
      onCloseSearch();
    }
    // Reset pagination when clearing search
    if (setCurrentPage) setCurrentPage(1);
    if (monthlyCurrentPage && setMonthlyCurrentPage) setMonthlyCurrentPage(1);
  };

  return (
    <>
      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowSearchCommand(true)}
          className="text-slate-300 border-slate-500 hover:bg-slate-600 hover:text-white bg-slate-600"
        >
          Search...
        </Button>
        {searchTerm && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleCloseSearch}
            className="text-emerald-400 border-emerald-500 hover:bg-emerald-600 hover:text-white"
          >
            Tampilkan Semua
          </Button>
        )}
      </div>

      {/* Search Command Dialog */}
      {showSearchCommand && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowSearchCommand(false)}
        >
          <div
            className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl shadow-2xl max-w-md w-full border border-slate-600"
            onClick={(e) => e.stopPropagation()}
          >
            <Command className="rounded-lg border border-slate-600 bg-slate-900/50">
              <CommandInput
                placeholder={placeholder}
                value={searchTerm}
                onValueChange={setSearchTerm}
                className="text-slate-100 placeholder:text-slate-400"
              />
              <CommandList>
                <CommandEmpty className="text-slate-400">
                  Tidak ada {title.toLowerCase()} yang ditemukan.
                </CommandEmpty>
                <CommandGroup heading={<span className="text-slate-400">{title}</span>}>
                  {filteredItems.slice(0, 10).map((item) => (
                    <CommandItem
                      key={item.id}
                      onSelect={() => handleSearchSelect(item.name)}
                      className="text-slate-100 data-[selected=true]:bg-slate-700 data-[selected=true]:text-white"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 ${
                            item.statusColor === "green"
                              ? "bg-emerald-500/20"
                              : item.statusColor === "yellow"
                              ? "bg-yellow-500/20"
                              : "bg-red-500/20"
                          } rounded-full flex items-center justify-center`}
                        >
                          <DollarSign
                            className={`w-4 h-4 ${
                              item.statusColor === "green"
                                ? "text-emerald-400"
                                : item.statusColor === "yellow"
                                ? "text-yellow-400"
                                : "text-red-400"
                            }`}
                          />
                        </div>
                        <div>
                          <div className="font-medium text-slate-100">{item.name}</div>
                          <div className="text-sm text-slate-400">{item.description}</div>
                        </div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        </div>
      )}
    </>
  );
}