import { useEffect, useState } from "react";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        alert("Unable to load products right now. Please try again later.");
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
        <center>
      <h1>Products</h1>

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h3>{product.title}</h3>
            <p>Category: {product.category}</p>
            <p>Price: ${Number(product.price)}</p>
            <img src={product.image} alt={product.title} />
          </li>
        ))}
      </ul>
      </center>
    </div>
    
  );
}

export default Home;