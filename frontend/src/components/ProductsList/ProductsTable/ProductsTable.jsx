import PropTypes from "prop-types";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  TablePagination,
  Paper,
  TextField,
  Box,
  debounce,
  Rating,
  Button,
  Grid,
} from "@mui/material";
import { stockInfo } from "../../../constants/product";
import ProductFormDialog from "../ProductFormDialog/ProductFormDialog";
import { useProductsTable } from "./ProductsTableHook";

const ProductsTable = ({ search, setSearch }) => {
  const {
    handleDialogOpen,
    handleDialogClose,
    products,
    total,
    setPage,
    dialogOpen,
    fetchProducts,
    limit,
    page,
    setLimit,
  } = useProductsTable({ search });

  return (
    <Paper
      sx={{
        p: 2,
        position: "relative",
      }}
    >
      <Grid
        container
        sx={{
          position: "sticky",
          top: 0,
          backgroundColor: "white",
          zIndex: 2,
          flexWrap: "nowrap",
        }}
        alignItems={"center"}
      >
        <TextField
          label="Rechercher un produit..."
          fullWidth
          variant="outlined"
          margin="normal"
          size="small"
          onChange={debounce((e) => {
            setPage(0);
            setSearch(e.target.value);
          }, 300)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleDialogOpen}
          sx={{
            ml: 2,
            whiteSpace: "nowrap",
            height: "39px",
            textTransform: "none",
          }}
          size="small"
        >
          Ajouter un produit
        </Button>
      </Grid>

      <>
        <TableContainer sx={{ maxHeight: "600px" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Stock</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.length > 0 ? (
                products.map((product) => {
                  const stock = stockInfo[product.inventoryStatus] || {
                    label: "Unknown",
                    color: "gray",
                  };

                  return (
                    <TableRow key={product._id}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>
                        <Rating
                          value={product.rating}
                          precision={0.1}
                          readOnly
                        />
                      </TableCell>
                      <TableCell>
                        <Box fontWeight="bold" color={stock.color}>
                          {stock.label}
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={5}>
                    <Box textAlign="center" py={4}>
                      No products found.
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{
            position: "sticky",
            bottom: 0,
            backgroundColor: "white",
            zIndex: 1,
          }}
        >
          <TablePagination
            component="div"
            count={total}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
            rowsPerPage={limit}
            onRowsPerPageChange={(e) => {
              setLimit(parseInt(e.target.value, 10));
              setPage(0);
            }}
            rowsPerPageOptions={[5, 10, 20]}
          />
        </Box>
      </>
      <ProductFormDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        onProductAdded={fetchProducts}
      />
    </Paper>
  );
};

ProductsTable.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
};
export default ProductsTable;
