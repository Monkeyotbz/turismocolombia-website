const express = require('express');
const app = express();
const port = 3000;

const propertiesRoutes = require('./routes/properties');
app.use('/properties', propertiesRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});