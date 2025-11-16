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
    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Edit SPP Pricing</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Class
              </label>
              <input
                type="text"
                value={editingClass}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Monthly SPP (Rp)
              </label>
              <input
                type="number"
                value={monthlySpp}
                onChange={(e) => onMonthlySppChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="150000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Semester SPP (Rp)
              </label>
              <input
                type="number"
                value={semesterSpp}
                onChange={(e) => onSemesterSppChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="750000"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}