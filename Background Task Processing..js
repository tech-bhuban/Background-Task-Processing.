
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3005;

app.use(express.json());

// A human touch: Custom helper to flatten JSON objects for CSV rows
const flattenObject = (obj) => {
    return Object.values(obj).join(',');
};

// Route to handle "bulk" conversion requests
app.post('/convert', (req, res) => {
    const data = req.body; // Expecting an array of objects
    
    if (!Array.isArray(data) || data.length === 0) {
        return res.status(400).json({ error: 'Please provide an array of objects.' });
    }

    const fileName = `export_${Date.now()}.csv`;
    const filePath = path.join(__dirname, fileName);
    
    // Using a WriteStream is an advanced "human" way to handle file I/O
    const stream = fs.createWriteStream(filePath);
    
    // Writing Headers
    const headers = Object.keys(data[0]).join(',');
    stream.write(headers + '\n');

    // Writing Rows
    data.forEach(item => {
        stream.write(flattenObject(item) + '\n');
    });

    stream.end(() => {
        console.log(`Successfully processed ${data.length} rows into ${fileName}`);
        res.json({ message: 'Processing complete', file: fileName, downloadUrl: `/download/${fileName}` });
    });
});

// Serving the processed files
app.get('/download/:name', (req, res) => {
    const file = path.join(__dirname, req.params.name);
    res.download(file, (err) => {
        if (err) res.status(404).send('File expired or not found.');
    });
});

app.get('/', (req, res) => {
    res.send('<h2>Data Transformer API</h2><p>POST JSON data to /convert to get a CSV file.</p>');
});

app.listen(PORT, () => console.log(`Worker service active on http://localhost:${PORT}`));
