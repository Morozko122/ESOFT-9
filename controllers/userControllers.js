class UserController {
    constructor(userService) {
        this.userService = userService;
        this.HTTP_STATUS = {
            OK: 200,
            CREATED: 201,
            NO_CONTENT: 204,
            BAD_REQUEST: 400,
            NOT_FOUND: 404,
            INTERNAL_ERROR: 500,
        };
    }
    addNewUser = async (req, res) => {
        try {
            const user = await this.userService.addNewUser(req.body);
            res.status(this.HTTP_STATUS.CREATED).json(user);
        } catch (error) {
            res.status(this.HTTP_STATUS.INTERNAL_ERROR).json({ error: error.message });
        }
    }
    getAllUsers = async (req, res) => {
        try {
            const users = await this.userService.getAllUsers();
            res.status(this.HTTP_STATUS.OK).json(users);
        } catch (error) {
            res.status(this.HTTP_STATUS.INTERNAL_ERROR).json({ error: error.message });
        }
    }
    getUser = async (req, res) => {
        try {
            const user = await this.userService.getUserById(req.params.id);
            res.status(this.HTTP_STATUS.OK).json(user);
        } catch (error) {
            res.status(this.HTTP_STATUS.INTERNAL_ERROR).json({ error: error.message });
        }
    }
    updateUserInfoById = async (req, res) => {
        try {
            const user = await this.userService.updateUserInfoById(req.params.id, req.body);
            res.status(this.HTTP_STATUS.CREATED).json(user);
        } catch (error) {
            res.status(this.HTTP_STATUS.INTERNAL_ERROR).json({ error: error.message });
        }
    }
    deleteUserById = async (req, res) => {
        try {
            const users = await this.userService.deleteUserById(req.params.id);
            res.status(this.HTTP_STATUS.OK).json(users);
        } catch (error) {
            res.status(this.HTTP_STATUS.INTERNAL_ERROR).json({ error: error.message });
        }
    }
    getUsersOlderThenGiven = async (req, res) => {
        try {
            const users = await this.userService.getUsersOlderThenGiven(req.params.age);
            res.status(this.HTTP_STATUS.OK).json(users);
        } catch (error) {
            res.status(this.HTTP_STATUS.INTERNAL_ERROR).json({ error: error.message });
        }
    }
    getUsersSorted = async (req, res) => {
        try {
            const users = await this.userService.getUsersSorted();
            res.status(this.HTTP_STATUS.OK).json(users);
        } catch (error) {
            res.status(this.HTTP_STATUS.INTERNAL_ERROR).json({ error: error.message });
        }
    }
    getUsersByEmailDomain = async (req, res) => {
        try {
            const users = await this.userService.getUsersByEmailDomain(req.params.domain);
            res.status(this.HTTP_STATUS.OK).json(users);
        } catch (error) {
            res.status(this.HTTP_STATUS.INTERNAL_ERROR).json({ error: error.message });
        }
    }
    addCarToUser = async (req, res) => {
        try {
            const car = await this.userService.addCarToUser(req.params.id, req.body);
            res.status(this.HTTP_STATUS.CREATED).json(car);
        } catch (error) {
            res.status(this.HTTP_STATUS.INTERNAL_ERROR).json({ error: error.message });
        }
    }

    getAllUserCars = async (req, res) => {
        try {
            const car = await this.userService.getAllUserCars(req.params.id, req.params.carId);
            res.status(this.HTTP_STATUS.OK).json(car);
        } catch (error) {
            res.status(this.HTTP_STATUS.INTERNAL_ERROR).json({ error: error.message });
        }
    }
    getUserCarById = async (req, res) => {
        try {
            const car = await this.userService.getUserCarById(req.params.id, req.params.carId);
            if (!car) {
                return res.status(this.HTTP_STATUS.NOT_FOUND).json({ error: 'Машины не найдена / Car not found' });
            }
            res.status(this.HTTP_STATUS.OK).json(car);
        } catch (error) {
            res.status(this.HTTP_STATUS.INTERNAL_ERROR).json({ error: error.message });
        }
    }
}
module.exports = UserController;