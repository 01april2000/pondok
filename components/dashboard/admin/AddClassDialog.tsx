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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Class</DialogTitle>
          <DialogDescription>
            Enter the details for the new class including name and SPP amounts.
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
            <label htmlFor="monthlySpp" className="text-right">
              Monthly SPP
            </label>
            <input
              id="monthlySpp"
              type="number"
              value={monthlySpp}
              onChange={(e) => setMonthlySpp(e.target.value)}
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="e.g., 180000"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="semesterSpp" className="text-right">
              Semester SPP
            </label>
            <input
              id="semesterSpp"
              type="number"
              value={semesterSpp}
              onChange={(e) => setSemesterSpp(e.target.value)}
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="e.g., 900000"
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