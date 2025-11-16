"use client";

interface EditSPPModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingClass: string;
  monthlySpp: string;
  semesterSpp: string;
  onMonthlySppChange: (value: string) => void;
  onSemesterSppChange: (value: string) => void;
  onSave: () => void;
}

export default function EditSPPModal({
  isOpen,
  onClose,
  editingClass,
  monthlySpp,
  semesterSpp,
  onMonthlySppChange,
  onSemesterSppChange,
  onSave
}: EditSPPModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl shadow-2xl w-full max-w-md mx-4 border border-slate-600">
        <div className="px-6 py-4 border-b border-slate-600">
          <h3 className="text-lg font-semibold text-white">Edit SPP Pricing</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Class
              </label>
              <input
                type="text"
                value={editingClass}
                disabled
                className="w-full px-3 py-2 border border-slate-500 rounded-md bg-slate-600 text-slate-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Monthly SPP (Rp)
              </label>
              <input
                type="text"
                value={monthlySpp}
                onChange={(e) => onMonthlySppChange(e.target.value)}
                className="w-full px-3 py-2 border border-slate-500 rounded-md bg-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder:text-slate-400"
                placeholder="150000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Semester SPP (Rp)
              </label>
              <input
                type="text"
                value={semesterSpp}
                onChange={(e) => onSemesterSppChange(e.target.value)}
                className="w-full px-3 py-2 border border-slate-500 rounded-md bg-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder:text-slate-400"
                placeholder="750000"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-slate-300 bg-slate-600 rounded-md hover:bg-slate-500 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-md hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}