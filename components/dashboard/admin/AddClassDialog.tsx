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

interface AddClassDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddClass: (className: string, monthlySpp: string, semesterSpp: string) => void;
}

export default function AddClassDialog({ isOpen, onClose, onAddClass }: AddClassDialogProps) {
  const [className, setClassName] = useState("");
  const [monthlySpp, setMonthlySpp] = useState("");
  const [semesterSpp, setSemesterSpp] = useState("");

  const handleSubmit = () => {
    if (className && monthlySpp && semesterSpp) {
      onAddClass(className, monthlySpp, semesterSpp);
      // Reset form
      setClassName("");
      setMonthlySpp("");
      setSemesterSpp("");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600">
        <DialogHeader>
          <DialogTitle className="text-white">Add New Class</DialogTitle>
          <DialogDescription className="text-slate-300">
            Enter the details for the new class including name and SPP amounts.
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
            <label htmlFor="monthlySpp" className="text-right text-slate-300">
              Monthly SPP
            </label>
            <input
              id="monthlySpp"
              type="text"
              value={monthlySpp}
              onChange={(e) => setMonthlySpp(e.target.value)}
              className="col-span-3 flex h-10 w-full rounded-md border border-slate-500 bg-slate-700 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="e.g., 180000"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="semesterSpp" className="text-right text-slate-300">
              Semester SPP
            </label>
            <input
              id="semesterSpp"
              type="text"
              value={semesterSpp}
              onChange={(e) => setSemesterSpp(e.target.value)}
              className="col-span-3 flex h-10 w-full rounded-md border border-slate-500 bg-slate-700 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="e.g., 900000"
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