import { useEffect, useState } from "react";
import ProductService from "../../services/ProductService";
import { Button } from "@mui/material";

export default function Product() {
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    const res = await ProductService.getList();
    setProducts(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      {products ? (
        <div className="flex items-center justify-between flex-wrap gap-10">
          {products.map((product: any) => (
            <div className="" key={product.id}>
              <img className="w-80" src={product.image} alt={product.name} />
              <h5>{product.name}</h5>
              <p>{product.description}</p>
              <span>${product.price}</span>
              <div>
                <Button variant="contained">Edit</Button>
                <Button variant="contained" color="error">
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>There is no products yet</div>
      )}
    </div>
  );
}
