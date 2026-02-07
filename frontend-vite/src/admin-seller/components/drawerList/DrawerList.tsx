import * as React from "react";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../Redux Toolkit/Store";
import { performLogout } from "../../../Redux Toolkit/Customer/AuthSlice";

export interface Menu {
  name: string;
  path: string;
  icon: React.ReactElement<any>;
  activeIcon: React.ReactElement<any>;
}

interface DrawerListProps {
  toggleDrawer?: any;
  menu: Menu[];
  menu2: Menu[];
}

const DrawerList = ({ toggleDrawer, menu, menu2 }: DrawerListProps) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(performLogout());
  };

  const handleClick = (item: any) => () => {
    if (item.name === "Logout") {
      handleLogout();
    }
    navigate(item.path);
    if (toggleDrawer) toggleDrawer(false)();
  };

  return (
    <div className="h-full">
      <div className="flex flex-col justify-between h-full w-[300px] border-r py-5">
        {/* TOP MENU */}
        <div className="space-y-2">
          {menu.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <div
                key={item.name}
                onClick={handleClick(item)}
                className="pr-4 cursor-pointer"
              >
                <div
                  className={`flex items-center px-5 py-3 rounded-r-full transition-all
                    ${
                      isActive
                        ? "bg-[#b6cec7] text-black border-l-4 border-green-700 font-semibold"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  <ListItemIcon>
                    {isActive ? item.activeIcon : item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM MENU */}
        <div className="space-y-4">
          <Divider />
          <div className="space-y-2">
            {menu2.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <div
                  key={item.name}
                  onClick={handleClick(item)}
                  className="pr-4 cursor-pointer"
                >
                  <div
                    className={`flex items-center px-5 py-3 rounded-r-full transition-all
                      ${
                        isActive
                          ? "bg-[#b6cec7] text-black border-l-4 border-green-700 font-semibold"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                  >
                    <ListItemIcon>
                      {isActive ? item.activeIcon : item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.name} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawerList;
