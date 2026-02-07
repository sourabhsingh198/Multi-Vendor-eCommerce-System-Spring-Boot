import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
import {
  fetchSellerProducts,
  deleteProduct,
} from '../../../Redux Toolkit/Seller/sellerProductSlice';

const ProductTable = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { sellerProduct } = useAppSelector((store) => store);

  React.useEffect(() => {
    dispatch(fetchSellerProducts(localStorage.getItem("jwt")));
  }, [dispatch]);

  const handleDelete = (productId: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      dispatch(deleteProduct(productId));
    }
  };

  return (
    <>
      <h1 className="pb-5 font-bold text-xl">Products</h1>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#000" }}>
              <TableCell style={{ color: "#fff" }}>Images</TableCell>
              <TableCell style={{ color: "#fff" }}>Title</TableCell>
              <TableCell style={{ color: "#fff" }}>MRP</TableCell>
              <TableCell style={{ color: "#fff" }}>Selling Price</TableCell>
              <TableCell style={{ color: "#fff" }}>Color</TableCell>
              <TableCell style={{ color: "#fff" }}>Update</TableCell>
              <TableCell style={{ color: "#fff" }}>Delete</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sellerProduct.products.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex gap-2">
                    {item.images?.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt=""
                        className="w-20 rounded-md"
                      />
                    ))}
                  </div>
                </TableCell>

                <TableCell>{item.title}</TableCell>
                <TableCell>₹{item.mrpPrice}</TableCell>
                <TableCell>₹{item.sellingPrice}</TableCell>
                <TableCell>{item.color}</TableCell>

                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() =>
                      navigate(`/seller/update-product/${item.id}`)
                    }
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>

                <TableCell>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(item.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ProductTable;
