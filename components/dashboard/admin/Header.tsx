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
        return 'Manage SPP pricing and track incoming transactions';
      case 'syahriah':
        return 'Manage Syahriah fees and payments';
      case 'uang-saku':
        return 'Manage pocket money allowances';
      case 'laundry':
        return 'Manage laundry services and fees';
      default:
        return 'Admin dashboard for managing school operations';
    }
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          {/* Mobile menu button */}
          <button
            onClick={onMenuToggle}
            className="lg:hidden mr-4 p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {getPageTitle()}
            </h2>
            <p className="text-gray-600">
              {getPageDescription()}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">A</span>
            </div>
            <span className="text-gray-700">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}