const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const stateRoute = require('./routes/api/states');

//Import middlewares for JSON response
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'views')));

app.use("/api/", stateRoute);
app.listen(PORT, () => console.log(`server connected on PORT ${PORT}`))