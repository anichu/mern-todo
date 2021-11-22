const express = require('express');
const app = express();
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');

const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const port = process.env.PORT || 8000;

// app.use((req, res, next) => {
//   console.log('anis');
//   next();
// });

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log('Server is on up to ' + port);
});
