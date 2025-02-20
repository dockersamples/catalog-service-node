import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import * as productClient from "./service/productClient.mjs";
import { z } from "zod";

// Create an MCP server
const server = new McpServer({
  name: "Demo",
  version: "1.0.0"
});

// Get the list of products
server.tool("get-product-listing",
  "Get the list of products in the catalog",
  {},
  async () => {
    const productListing = await productClient.getProductListing();
    return { content: [{ type: "text", text: JSON.stringify(productListing) }]};
  }
);

// Get details about a specific product
server.tool("get-product-details",
  "Get the details for a specific product in the catalog",
  { id: z.string().describe("The id of the product to retrieve"), },
  async ({ id }) => {
    const product = await productClient.getProductById(id);
    return { content: [{ type: "text", text: JSON.stringify(product) }]};
  }
);

server.tool("create-product",
  "Create a new product in the catalog",
  { 
    name: z.string().describe("The name of the product"),
    price: z.number().describe("The price of the product"),
    upc: z.string().describe("The UPC code of the product"),
  },
  async ({ name, price, upc }) => {
    const product = await productClient.createProduct({ name, price, upc });
    return { content: [{ type: "text", text: JSON.stringify(product) }]};
  }
)

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);