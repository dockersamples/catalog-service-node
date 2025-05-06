import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { ProductRow } from "./ProductRow";
import sampleProducts from "./sample-products.json";

function App() {
  const [catalog, setCatalog] = useState(null);
  const [errorOccurred, setErrorOccurred] = useState(false);

  const fetchCatalog = useCallback(() => {
    setErrorOccurred(false);

    fetch("/api/products")
      .then((response) => response.json())
      .then((data) => {
        setCatalog(data);
      })
      .catch((e) => {
        setErrorOccurred(e);
      });
  }, [setErrorOccurred, setCatalog]);

  const createProduct = useCallback(() => {
    const body = {
      price: 100 + Math.floor(Math.random() * 100),
      upc: 100000000000 + catalog.length + 1,
    };

    if (catalog.length < sampleProducts.length) {
      body.name = sampleProducts[catalog.length].name;
      body.description = sampleProducts[catalog.length].description;
    } else {
      body.name = `New Product #${catalog.length + 1}`;
      body.description = "A fancy description for an awesome product";
    }

    fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then(fetchCatalog);
  }, [catalog, fetchCatalog]);

  useEffect(() => {
    fetchCatalog();
  }, [fetchCatalog]);

  return (
    <>
      <h1>Demo catalog client</h1>

      <p>
        <button onClick={fetchCatalog}>Refresh catalog</button>
        &nbsp;
        <button onClick={createProduct}>Create product</button>
      </p>

      {catalog ? (
        <>
          {catalog.length === 0 ? (
            <em>There are no products... yet!</em>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>UPC</th>
                  <th>Inventory</th>
                  <th>Image</th>
                </tr>
              </thead>
              <tbody>
                {catalog.map((product) => (
                  <ProductRow
                    key={product.id}
                    product={product}
                    onChange={() => fetchCatalog()}
                  />
                ))}
              </tbody>
            </table>
          )}
        </>
      ) : (
        <>
          {errorOccurred ? (
            <p>
              An error occurred while fetching the catalog. Is the backend
              running?
            </p>
          ) : (
            <p>Loading catalog...</p>
          )}
        </>
      )}
    </>
  );
}

export default App;
