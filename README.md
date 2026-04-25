
# 📊 Node.js JSON-to-CSV Data Transformer

A high-performance backend utility designed to handle structured data transformations using Node.js **WriteStreams**. This project is ideal for automating report generation or data migration tasks.

## 🛠 Advanced Concepts
- **Stream-Based I/O**: Instead of loading large files into memory, it uses `fs.createWriteStream` to pipe data directly to the disk, preventing memory overflow.
- **Dynamic Header Parsing**: Automatically detects JSON keys to build CSV headers.
- **RESTful File Handling**: Implements a two-step process: data ingestion (`POST /convert`) followed by a secure download link.
- **Timestamped Versioning**: Uses `Date.now()` to ensure unique file generation for every request.

## 🚀 Installation & Usage
1. **Clone**:
   ```bash
   git clone <repo-url>
   ```
2. **Install dependencies**:
   ```bash
   npm install express
   ```
3. **Run**:
   ```bash
   node server.js
   ```

## 🧪 Testing the API
Use a tool like Postman or `curl` to send a POST request:
```bash
curl -X POST http://localhost:3005/convert \
-H "Content-Type: application/json" \
-d '[{"id":1, "name":"Alice", "role":"Dev"}, {"id":2, "name":"Bob", "role":"Lead"}]'
```

## 📜 Technical Motivation
This project was built to demonstrate how to handle data exports without third-party libraries like `json2csv`. It showcases an understanding of the **Node.js Buffer/Stream** architecture.

## License
MIT
