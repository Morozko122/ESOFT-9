class UserService {
    constructor(userModel){
        this.userModel = userModel;
    }

    async addNewUser(userData) {
        return this.userModel.create(userData);
    }
    async getAllUsers() {
        return this.userModel.getAllUsers();
    }
    async getUserById(id){
        return this.userModel.getById(id);
    }
    async updateUserInfoById(id, userData) {
        return this.userModel.update(id, userData);
    }
    async deleteUserById(id){
        return this.userModel.delete(id);
    }
    async getUsersOlderThenGiven(age){
        return this.userModel.getOlderThen(age);
    }
    async getUsersSorted(){
        return this.userModel.getSorted();
    }
    async getUsersByEmailDomain(domain){
        return this.userModel.getUserDomain(domain);
    }
    async addCarToUser (id, carData){
        return this.userModel.addCar(id, carData);
    }
    async getAllUserCars (id){
        return this.userModel.getAllCars(id);
    }
    async getUserCarById (userId, carId){
        return this.userModel.getCarId(userId, carId);
    }
}
module.exports = UserService;