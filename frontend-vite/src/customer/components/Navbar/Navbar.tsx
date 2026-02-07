import {
  Avatar,
  Badge,
  Box,
  Button,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import "./Navbar.css";
import ClothwaveLogo from "../../../assets/clothwave-logo.png";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import StorefrontIcon from "@mui/icons-material/Storefront";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { mainCategory } from "../../../data/category/mainCategory";
import CategorySheet from "./CategorySheet";
import DrawerList from "./DrawerList";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { FavoriteBorder } from "@mui/icons-material";

const BRAND_COLOR = "#b6cec7";

const Navbar = () => {
  const [showSheet, setShowSheet] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("men");
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const dispatch = useAppDispatch();
  const { user, cart, sellers } = useAppSelector((store) => store);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const becomeSellerClick = () => {
    if (sellers.profile?.id) navigate("/seller");
    else navigate("/become-seller");
  };

  return (
    <Box
      sx={{ zIndex: 2 }}
      className="sticky top-0 left-0 right-0 bg-white blur-bg bg-opacity-80"
    >
      <div className="flex items-center justify-between px-5 lg:px-20 h-[70px] border-b">
        {/* LEFT SIDE */}
        <div className="flex items-center gap-9">
          <div className="flex items-center gap-2">
            {!isLarge && (
              <IconButton onClick={toggleDrawer(true)}>
                <MenuIcon className="text-gray-700" sx={{ fontSize: 29 }} />
              </IconButton>
            )}

            {/* LOGO */}
            <img
              src={ClothwaveLogo}
              alt="Clothwave"
              onClick={() => navigate("/")}
              className="cursor-pointer"
              style={{ height: "100px", objectFit: "contain" }}
            />
          </div>

          {/* MAIN CATEGORY */}
          {isLarge && (
            <ul className="flex items-center font-medium text-gray-800">
              {mainCategory.map((item) => (
                <li
                  key={item.categoryId}
                  onMouseLeave={() => setShowSheet(false)}
                  onMouseEnter={() => {
                    setSelectedCategory(item.categoryId);
                    setShowSheet(true);
                  }}
                  className="cursor-pointer h-[70px] px-4 flex items-center border-b-2 border-transparent"
                  style={{
                    transition: "all 0.2s ease",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.color = BRAND_COLOR;
                    e.currentTarget.style.borderBottomColor = BRAND_COLOR;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.color = "";
                    e.currentTarget.style.borderBottomColor = "transparent";
                  }}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex gap-1 lg:gap-6 items-center">
          <IconButton onClick={() => navigate("/search-products")}>
            <SearchIcon className="text-gray-700" sx={{ fontSize: 29 }} />
          </IconButton>

          {user.user ? (
            <Button
              onClick={() => navigate("/account/orders")}
              className="flex items-center gap-2"
            >
              <Avatar
                sx={{ width: 29, height: 29 }}
                src="https://cdn.pixabay.com/photo/2015/04/15/09/28/head-723540_640.jpg"
              />
              <h1 className="font-semibold hidden lg:block">
                {user.user?.fullName?.split(" ")[0]}
              </h1>
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{ backgroundColor: BRAND_COLOR }}
              startIcon={<AccountCircleIcon />}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          )}

          <IconButton onClick={() => navigate("/wishlist")}>
            <FavoriteBorder sx={{ fontSize: 29 }} className="text-gray-700" />
          </IconButton>

          <IconButton onClick={() => navigate("/cart")}>
            <Badge badgeContent={cart.cart?.cartItems.length} color="primary">
              <AddShoppingCartIcon sx={{ fontSize: 29 }} className="text-gray-700" />
            </Badge>
          </IconButton>

          {isLarge && (
            <Button
              onClick={becomeSellerClick}
              startIcon={<StorefrontIcon />}
              variant="outlined"
              sx={{ borderColor: BRAND_COLOR, color: BRAND_COLOR }}
            >
              Become Seller
            </Button>
          )}
        </div>
      </div>

      {/* DRAWER */}
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <DrawerList toggleDrawer={toggleDrawer} />
      </Drawer>

      {/* CATEGORY SHEET */}
      {showSheet && selectedCategory && (
        <div
          onMouseLeave={() => setShowSheet(false)}
          onMouseEnter={() => setShowSheet(true)}
          className="categorySheet absolute top-[4.41rem] left-20 right-20"
        >
          <CategorySheet
            setShowSheet={setShowSheet}
            selectedCategory={selectedCategory}
          />
        </div>
      )}
    </Box>
  );
};

export default Navbar;
