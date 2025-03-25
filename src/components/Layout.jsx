
import SideBar from './SideBar';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar (Fixed on the left) */}
      <div className="w-64 fixed inset-y-0 left-0 bg-gray-100 shadow-lg">
        <SideBar />
      </div>

      {/* Main Content Wrapper */}
      <div className="flex-1  flex flex-col ml-64">
        {/* Fixed Header */}
        <Header />

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-auto p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  );
};


export default Layout;

