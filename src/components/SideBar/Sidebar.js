import Image from "next/image";
import LogoutButtton from "../Buttons/LogoutButtton";

const Sidebar = ({ children }) => {
  return (
    <aside className="fixed top-0 left-0 z-40 w-72 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-blue-gray-50">
      <div className="flex flex-col justify-between h-full">
        <div className="pt-10 space-y-5">
          <Image className="m-auto" src="/logoicon.png" alt="logo" width="190" height="190" />
          {children}
        </div>
        <div className="flex flex-col items-center justify-center p-5 space-y-3">
          <LogoutButtton size="sm" variant="icon" />
          <p className="text-sm">	&#169; {new Date().getFullYear()} SosteniPro</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
