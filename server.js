const express = require('express');
const soap = require('soap');
const fs = require('fs');

const app = express()
// Define a simple SOAP service
const service = {
  MyService: {
    MyPort: {
      MyFunction: function (args) {
        const name = args.name
        return {
          result: `Hello, ${name} this is a simple SOAP API response!`,
        };
      },
    },
  },
};

// Define the path for the SOAP service
const servicePath = '/soap';

// Serve the WSDL file
app.get(servicePath, (req, res) => {
  res.setHeader('Content-Type', 'text/xml');
  const xml = fs.readFileSync('MyService.wsdl', 'utf8');
  res.send(xml);
});

// Create the SOAP server
const xml = fs.readFileSync('MyService.wsdl', 'utf8');
const server = soap.listen(app, servicePath, service, xml);

// Start the server
const port = 3000;
app.listen(port, function () {
  console.log(`SOAP API listening at http://localhost:${port}${servicePath}?wsdl`);
});