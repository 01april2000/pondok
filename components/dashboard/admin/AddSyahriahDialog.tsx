"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface AddSyahriahDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddClass: (className: string, monthlySyahriah: string, yearlySyahriah: string) => void;
}

export default function AddSyahriahDialog({ isOpen, onClose, onAddClass }: AddSyahriahDialogProps) {
  const [className, setClassName] = useState("");
  const [monthlySyahriah, setMonthlySyahriah] = useState("");
  const [yearlySyahriah, setYearlySyahriah] = useState("");

  const handleSubmit = () => {
    if (className && monthlySyahriah && yearlySyahriah) {
      onAddClass(className, monthlySyahriah, yearlySyahriah);
      // Reset form
      setClassName("");
      setMonthlySyahriah("");
      setYearlySyahriah("");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600">
        <DialogHeader>
          <DialogTitle className="text-white">Add New Class</DialogTitle>
          <DialogDescription className="text-slate-300">
            Enter the details for the new class including name and Syahriah amounts.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="className" className="text-right text-slate-300">
              Class Name
            </label>
            <input
              id="className"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              className="col-span-3 flex h-10 w-full rounded-md border border-slate-500 bg-slate-700 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="e.g., Class XIII"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="monthlySyahriah" className="text-right text-slate-300">
              Monthly Syahriah
            </label>
            <input
              id="monthlySyahriah"
              type="number"
              value={monthlySyahriah}
              onChange={(e) => setMonthlySyahriah(e.target.value)}
              className="col-span-3 flex h-10 w-full rounded-md border border-slate-500 bg-slate-700 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="e.g., 100000"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="yearlySyahriah" className="text-right text-slate-300">
              Yearly Syahriah
            </label>
            <input
              id="yearlySyahriah"
              type="number"
              value={yearlySyahriah}
              onChange={(e) => setYearlySyahriah(e.target.value)}
              className="col-span-3 flex h-10 w-full rounded-md border border-slate-500 bg-slate-700 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="e.g., 1200000"
            />
          </div>
        </div>
        <DialogFooter>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-300 bg-slate-600 border border-slate-500 rounded-md shadow-sm hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 ml-3 text-sm font-medium text-white bg-gradient-to-r from-emerald-600 to-teal-600 border border-transparent rounded-md shadow-sm hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300"
          >
            Add Class
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}