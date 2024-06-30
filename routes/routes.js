const express = require('express');

module.exports = (userController) => {
    const router = express.Router();

    router.get('/users/', userController.getAllUsers);
    router.get('/users/sorted/', userController.getUsersSorted);
    router.get('/users/:id/', userController.getUser);
    router.post('/users/', userController.addNewUser);
    router.put('/users/:id/', userController.updateUserInfoById);
    router.delete('/users/:id/', userController.deleteUserById);
    router.get('/users/age/:age/', userController.getUsersOlderThenGiven);
    router.get('/users/domain/:domain/', userController.getUsersByEmailDomain);

    router.post('/users/:id/cars/', userController.addCarToUser);
    router.get('/users/:id/cars/', userController.getAllUserCars);
    router.get('/users/:id/cars/:carId/', userController.getUserCarById);
    
    return router;
}
