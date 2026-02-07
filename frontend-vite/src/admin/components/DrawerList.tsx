import * as React from "react";
import DrawerList from "../../admin seller/components/drawerList/DrawerList";

// Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import CategoryIcon from "@mui/icons-material/Category";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";

const menu = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: <DashboardIcon />,
    activeIcon: <DashboardIcon />,
  },
  {
    name: "Coupons",
    path: "/admin/coupon",
    icon: <LocalOfferIcon />,
    activeIcon: <LocalOfferIcon />,
  },
  {
    name: "Add New Coupon",
    path: "/admin/add-coupon",
    icon: <AddIcon />,
    activeIcon: <AddIcon />,
  },
  {
    name: "Home Page",
    path: "/admin/home-grid",
    icon: <HomeIcon />,
    activeIcon: <HomeIcon />,
  },
//   {
//     name: "Electronics Category",
//     path: "/admin/electronics-category",
//     icon: <ElectricBoltIcon />,
//     activeIcon: <ElectricBoltIcon />,
//   },
  {
    name: "Shop By Category",
    path: "/admin/shop-by-category",
    icon: <CategoryIcon />,
    activeIcon: <CategoryIcon />,
  },
  {
    name: "Deals",
    path: "/admin/deals",
    icon: <LocalOfferIcon />,
    activeIcon: <LocalOfferIcon />,
  },
];

const menu2 = [
  {
    name: "Account",
    path: "/admin/account",
    icon: <AccountBoxIcon />,
    activeIcon: <AccountBoxIcon />,
  },
  {
    name: "Logout",
    path: "/",
    icon: <LogoutIcon />,
    activeIcon: <LogoutIcon />,
  },
];

interface DrawerListProps {
  toggleDrawer?: any;
}

const AdminDrawerList = ({ toggleDrawer }: DrawerListProps) => {
  return (
    <DrawerList
      toggleDrawer={toggleDrawer}
      menu={menu}
      menu2={menu2}
    />
  );
};

export default AdminDrawerList;
