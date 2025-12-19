import { useState, useEffect } from "react";

const styles = {
  container: {
    padding: "40px 20px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  heading: {
    textAlign: "center",
    color: "#333",
    marginBottom: "40px",
  },
  productsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
  },
  productCard: {
    background: "white",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    padding: "20px",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s, box-shadow 0.3s",
    cursor: "pointer",
  },
  productCardHover: {
    transform: "translateY(-5px)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  },
  productImage: {
    width: "100%",
    height: "200px",
    objectFit: "contain",
    marginBottom: "15px",
  },
  productTitle: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "10px",
    minHeight: "40px",
  },
  productPrice: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#667eea",
    marginBottom: "10px",
  },
  productCategory: {
    fontSize: "12px",
    color: "#999",
    marginBottom: "10px",
  },
  loading: {
    textAlign: "center",
    padding: "40px",
    fontSize: "18px",
    color: "#999",
  },
};

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Available Products</h2>
      {loading ? (
        <div style={styles.loading}>Loading products...</div>
      ) : (
        <div style={styles.productsGrid}>
          {products.map((product) => (
            <div
              key={product.id}
              style={styles.productCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
              }}
            >
              <img src={product.image} alt={product.title} style={styles.productImage} />
              <p style={styles.productTitle}>{product.title}</p>
              <p style={styles.productCategory}>{product.category}</p>
              <p style={styles.productPrice}>${product.price}</p>
              <button
                style={{
                  background: "#667eea",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
