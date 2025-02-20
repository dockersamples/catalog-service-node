import fetch from 'node-fetch';

export async function getProductListing() {
  const response = await fetch('http://host.docker.internal:3000/api/products');
  return response.json();
}

export async function getProductById(id) {
  const response = await fetch(`http://host.docker.internal:3000/api/products/${id}`);
  return response.json();
}

export async function createProduct(product) {
  const response = await fetch('http://host.docker.internal:3000/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  return response.json();
}