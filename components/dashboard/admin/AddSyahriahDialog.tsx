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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Class</DialogTitle>
          <DialogDescription>
            Enter the details for the new class including name and Syahriah amounts.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="className" className="text-right">
              Class Name
            </label>
            <input
              id="className"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="e.g., Class XIII"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="monthlySyahriah" className="text-right">
              Monthly Syahriah
            </label>
            <input
              id="monthlySyahriah"
              type="number"
              value={monthlySyahriah}
              onChange={(e) => setMonthlySyahriah(e.target.value)}
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="e.g., 100000"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="yearlySyahriah" className="text-right">
              Yearly Syahriah
            </label>
            <input
              id="yearlySyahriah"
              type="number"
              value={yearlySyahriah}
              onChange={(e) => setYearlySyahriah(e.target.value)}
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="e.g., 1200000"
            />
          </div>
        </div>
        <DialogFooter>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 ml-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Class
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}