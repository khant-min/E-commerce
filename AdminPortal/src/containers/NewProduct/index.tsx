import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import ProductService from "../../services/ProductService";

type Product = {
  name: string;
  description: string;
  image: string;
  price: number;
  brand: string;
  category: string;
};

const CreateProduct: React.FC = () => {
  const [product, setProduct] = useState<Product>({
    name: "",
    description: "",
    image: "",
    price: 0,
    brand: "",
    category: "",
  });
  const [file, setFile] = useState();
  const [imageUrl, setImageUrl] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSelectChange = (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = e.target.name as keyof typeof product;
    setProduct({ ...product, [name]: e.target.value as string });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ ...product, image: imageUrl });
    const res = await ProductService.createProduct({
      ...product,
      image: imageUrl,
    });
  };

  useEffect(() => {
    const uploadImage = () => {
      const name = new Date().getTime() + file!.name;
      console.log(name);
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file!);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
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
        (err) => {
          console.log(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(
            (downloadUrl: string) => {
              console.log("File available at", downloadUrl);
              setImageUrl(downloadUrl);
              // got image url
            }
          );
        }
      );
    };
    file && uploadImage();
  }, [file]);

  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: "120vh",
        display: "grid",
      }}
    >
      <Box sx={{ mt: 4, placeSelf: "center" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create New Product
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={product.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Description"
            name="description"
            value={product.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            multiline
            rows={4}
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            value={product.price}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Brand"
            name="brand"
            value={product.brand}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={product.category}
              onChange={handleSelectChange}
              label="Category"
            >
              <MenuItem value="electronics">Electronics</MenuItem>
              <MenuItem value="fashion">Fashion</MenuItem>
              <MenuItem value="home">Home</MenuItem>
              <MenuItem value="beauty">Beauty</MenuItem>
              <MenuItem value="sports">Sports</MenuItem>
            </Select>
            <FormHelperText>Select a category</FormHelperText>
          </FormControl>

          <input
            required
            type="file"
            onChange={(e: any) => setFile(e.target.files[0])}
          />

          <Box sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Create Product
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateProduct;
