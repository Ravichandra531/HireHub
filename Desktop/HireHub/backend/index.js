require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const cors = require('cors');
const authRoutes = require('./routes/authen')
const jobRoutes = require('./routes/jobs');

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
