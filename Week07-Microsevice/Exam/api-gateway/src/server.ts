import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();
const PORT = 3000;

// Proxy config
app.use(
	'/api/orders',
	createProxyMiddleware({
		target: "http://order-service:3002",
		changeOrigin: true,
	})
);

app.use(
	'/api/customers',
	createProxyMiddleware({
		target: "http://customer-service:3001",
		changeOrigin: true,
	})
);

// Health check
app.get("/", (_req, res) => {
	res.send("API Gateway is running...");
});

app.listen(PORT, () => {
	console.log(`API Gateway listening on port ${PORT}`);
});
