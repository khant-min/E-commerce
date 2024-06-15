import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  TextField,
  MenuItem,
  Input,
} from "@mui/material";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import ProductService from "../../services/ProductService";
import CategoryService from "../../services/CategoryService";
import SupplierService from "../../services/SupplierService";

const steps = [
  "Basic Info",
  "Pricing & Stock",
  "Product Details",
  "Supplier & Warehouse",
];

interface Category {
  id: number;
  name: string;
  phone: string;
  email: string;
}

interface Supplier {}

const ProductForm: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [categories, setCategories] = useState<Category[]>();
  const [supplier, setSupplier] = useState<Category[]>();
  const [formData, setFormData] = useState({
    sku: "",
    name: "",
    description: "",
    brand: "",
    categoryId: 0,
    costPrice: "",
    sellPrice: "",
    images: [] as File[],
    quantityInStock: "",
    weight: "",
    size: "",
    color: "",
    material: "",
    expirationDate: "",
    warehouseLocation: "",
    stockStatus: "",
    width: "",
    height: "",
    length: "",
    supplierId: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length! > 4) {
      return alert("Only maximum 4 files accepted.");
    }

    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        images: Array.from(e.target.files!),
      }));
    }
  };

  const handleSubmit = async () => {
    console.log(formData);
    const res = await ProductService.createProduct(formData);
    console.log(res);
  };

  const fetchCategories = async () => {
    const res = await CategoryService.getList();
    setCategories(res.data);
  };

  const fetchSupplier = async () => {
    const res = await SupplierService.getList();
    setSupplier(res.data);
  };

  useEffect(() => {
    fetchCategories();
    fetchSupplier();
  }, []);

  useEffect(() => {
    if (formData.images && formData.images.length > 0) {
      const uploadImages = async () => {
        const uploadPromises = formData.images.map((file) => {
          return new Promise((resolve, reject) => {
            const name = new Date().getTime() + file.name;
            const storageRef = ref(storage, name);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ${progress}% done`);
                switch (snapshot.state) {
                  case "paused":
                    console.log("Upload is paused");
                    break;
                  case "running":
                    console.log("Uploading");
                    break;
                  default:
                    break;
                }
              },
              (error) => {
                console.log(error);
                reject(error);
              },
              () => {
                getDownloadURL(uploadTask.snapshot.ref)
                  .then((downloadUrl) => {
                    console.log("File available at", downloadUrl);
                    resolve(downloadUrl);
                  })
                  .catch(reject);
              }
            );
          });
        });

        try {
          const urls: any = await Promise.all(uploadPromises);
          setFormData({ ...formData, images: urls });
        } catch (error) {
          console.error("Error uploading one or more files:", error);
        }
      };

      uploadImages();
    }
  }, [formData.images, storage]);

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label, i) => (
          <Step key={i}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && (
        <Box>
          <TextField
            required
            fullWidth
            label="SKU"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            required
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            required
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            required
            fullWidth
            label="Brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            select
            fullWidth
            label="Category"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            margin="normal"
          >
            {categories?.map((category) => (
              <MenuItem value={category.id}>{category.name}</MenuItem>
            ))}
          </TextField>
        </Box>
      )}

      {activeStep === 1 && (
        <Box>
          <TextField
            fullWidth
            label="Cost Price"
            name="costPrice"
            type="number"
            value={formData.costPrice}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Selling Price"
            name="sellPrice"
            type="number"
            value={formData.sellPrice}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Quantity In Stock"
            name="quantityInStock"
            type="number"
            value={formData.quantityInStock}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            select
            fullWidth
            label="Stock Status"
            name="stockStatus"
            value={formData.stockStatus}
            onChange={handleChange}
            margin="normal"
          >
            <MenuItem value="INSTOCK">In Stock</MenuItem>
            <MenuItem value="OUTOFSTOCK">Out of Stock</MenuItem>
          </TextField>
          <Input
            fullWidth
            required
            type="file"
            inputProps={{ multiple: true }}
            onChange={handleFileChange}
          />
        </Box>
      )}

      {activeStep === 2 && (
        <Box>
          <TextField
            fullWidth
            label="Weight"
            name="weight"
            type="number"
            value={formData.weight}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Size"
            name="size"
            value={formData.size}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Material"
            name="material"
            value={formData.material}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Expire Date"
            name="expirationDate"
            type="date"
            value={formData.expirationDate}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
      )}

      {activeStep === 3 && (
        <Box>
          <TextField
            fullWidth
            label="Warehouse Location"
            name="warehouseLocation"
            value={formData.warehouseLocation}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Width"
            name="width"
            type="number"
            value={formData.width}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Height"
            name="height"
            type="number"
            value={formData.height}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Length"
            name="length"
            type="number"
            value={formData.length}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            select
            fullWidth
            label="Supplier"
            name="supplierId"
            value={formData.supplierId}
            onChange={handleChange}
            margin="normal"
          >
            {supplier?.map((sup) => (
              <MenuItem value={sup.id}>{sup.name}</MenuItem>
            ))}
          </TextField>
        </Box>
      )}

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        {activeStep === steps.length - 1 ? (
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
        ) : (
          <Button onClick={handleNext} variant="contained" color="primary">
            Next
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default ProductForm;
