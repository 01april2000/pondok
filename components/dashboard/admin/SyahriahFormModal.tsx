"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface SyahriahFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "edit";
  initialData?: {
    className: string;
    monthlySyahriah: string;
    yearlySyahriah: string;
  };
  onSubmit: (className: string, monthlySyahriah: string, yearlySyahriah: string) => void;
}

export default function SyahriahFormModal({ 
  isOpen, 
  onClose, 
  mode, 
  initialData,
  onSubmit 
}: SyahriahFormModalProps) {
  const [className, setClassName] = useState("");
  const [monthlySyahriah, setMonthlySyahriah] = useState("");
  const [yearlySyahriah, setYearlySyahriah] = useState("");

  // Reset form when modal opens or mode changes
  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && initialData) {
        setClassName(initialData.className);
        setMonthlySyahriah(initialData.monthlySyahriah);
        setYearlySyahriah(initialData.yearlySyahriah);
      } else {
        setClassName("");
        setMonthlySyahriah("");
        setYearlySyahriah("");
      }
    }
  }, [isOpen, mode, initialData]);

  const handleSubmit = () => {
    if (className && monthlySyahriah && yearlySyahriah) {
      onSubmit(className, monthlySyahriah, yearlySyahriah);
      onClose();
    }
  };

  const title = mode === "add" ? "Add New Class" : "Edit Syahriah Pricing";
  const description = mode === "add" 
    ? "Enter the details for the new class including name and Syahriah amounts."
    : "Update the Syahriah pricing for this class.";
  const submitButtonText = mode === "add" ? "Add Class" : "Save Changes";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600">
        <DialogHeader>
          <DialogTitle className="text-white">{title}</DialogTitle>
          <DialogDescription className="text-slate-300">
            {description}
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
              disabled={mode === "edit"}
              className="col-span-3 flex h-10 w-full rounded-md border border-slate-500 bg-slate-700 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="e.g., Class XIII"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="monthlySyahriah" className="text-right text-slate-300">
              Monthly Syahriah (Rp)
            </label>
            <input
              id="monthlySyahriah"
              type="text"
              value={monthlySyahriah}
              onChange={(e) => setMonthlySyahriah(e.target.value)}
              className="col-span-3 flex h-10 w-full rounded-md border border-slate-500 bg-slate-700 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="e.g., 100000"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="yearlySyahriah" className="text-right text-slate-300">
              Yearly Syahriah (Rp)
            </label>
            <input
              id="yearlySyahriah"
              type="text"
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
            {submitButtonText}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}