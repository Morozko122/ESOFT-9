const express = require('express')
const port = 3000

const UserService = require('./services/userServices');
const UserController = require('./controllers/userControllers');
const routes = require('./routes/routes');

const userModel = require('./repositories/InMemoryUserModel');

const userService = new UserService(userModel);
const userController = new UserController(userService);
const app = express()
app.use(express.json());
app.use('/api', routes(userController));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
}) 

