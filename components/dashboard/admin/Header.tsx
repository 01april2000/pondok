"use client";

interface HeaderProps {
  activeMenu: string;
  onMenuToggle?: () => void;
}

export default function Header({ activeMenu, onMenuToggle }: HeaderProps) {
  const getPageTitle = () => {
    switch (activeMenu) {
      case 'spp':
        return 'SPP Management';
      case 'syahriah':
        return 'Syahriah Management';
      case 'uang-saku':
        return 'Uang Saku Management';
      case 'laundry':
        return 'Laundry Management';
      default:
        return 'Dashboard';
    }
  };

  const getPageDescription = () => {
    switch (activeMenu) {
      case 'spp':
        return 'Manage SPP Dan Detail Transaksi SPP';
      case 'syahriah':
        return 'Manage Pembayaran Syahriah Dan Detail Transaksi Syahriah';
      case 'uang-saku':
        return 'Manage pocket money allowances';
      case 'laundry':
        return 'Manage laundry services and fees';
      default:
        return 'Admin dashboard for managing school operations';
    }
  };

  return (
    <header className="bg-gradient-to-r from-slate-800 to-slate-700 shadow-lg border-b border-slate-600">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          {/* Mobile menu button */}
          <button
            onClick={onMenuToggle}
            className="lg:hidden mr-4 p-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div>
            <h2 className="text-2xl font-bold text-white">
              {getPageTitle()}
            </h2>
            <p className="text-slate-300">
              {getPageDescription()}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full flex items-center justify-center shadow-md">
              <span className="text-white text-sm font-semibold">A</span>
            </div>
            <span className="text-slate-200 font-medium">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}