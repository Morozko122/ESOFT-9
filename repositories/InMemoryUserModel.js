let users = [

    {
        id: 1,
        name: 'Щукин Давид',
        email: 'shukin.d@example.mail',
        age: 40,
        cars: []
    },
    {
        id: 2,
        name: 'Фадеева Маргарита',
        email: 'fadeeva.m@example.mail',
        age: 21,
        cars: []
    },
    {
        id: 3,
        name: 'Голубева Асия',
        email: 'golubeva.a@example.mail',
        age: 36,
        cars: []
    },
    {
        id: 4,
        name: 'Савин Ярослав',
        email: 'savin.y@example.mail',
        age: 18,
        cars: []
    },
    {
        id: 5,
        name: 'Галкина Дарина',
        email: 'galkina.d@example.mail',
        age: 22,
        cars: []
    },
    {
        id: 6,
        name: 'Поляков Иван',
        email: 'polyakov.i@example.mail',
        age: 51,
        cars: []
    },
    {
        id: 7,
        name: 'Назарова Василиса',
        email: 'nazarova.v@example.mail',
        age: 37,
        cars: []
    },
    {
        id: 8,
        name: 'Анисимова Фатима',
        email: 'anisimova.f@example.mail',
        age: 19,
        cars: []
    },
    {
        id: 9,
        name: 'Галкина Эмилия',
        email: 'galkina.e@example.mail',
        age: 23,
        cars: []
    },
    {
        id: 10,
        name: 'Рудаков Тимур',
        email: 'rudakov.t@example.mail',
        age: 33,
        cars: []
    }
];

class InMemoryUserModel {
    constructor(usersEx, idEx) {
        this.users = usersEx;
        this.currentId = idEx;
    }

    async create(userData) {
        const validation = this.validateUserData(userData);
        if (validation !== true) {
            return validation;
        }
        const user = { id: ++this.currentId, ...userData };
        this.users.push(user);
        return user;
    }

    validateUserData(userData) {
        if (!userData.name || typeof userData.name !== 'string' || userData.name.trim() === '') {
            return 'Недопустимое имя / Invalid name';
        }
        if (!userData.email || typeof userData.email !== 'string' || userData.email.trim() === '' || !/\S+@\S+\.\S+/.test(userData.email)) {
            return 'Недопустимый адрес электронной почты / Invalid email';
        }
        if (userData.age === undefined || typeof userData.age !== 'number' || userData.age <= 0) {
            return 'Недопустимый возраст / Invalid age';
        }
        return true;
    }

    async getAllUsers() {
        return this.users;
    }

    async getById(id) {
        return this.users.find(user => user.id === parseInt(id));
    }

    async update(id, userData) {
        const index = this.users.findIndex(user => user.id === parseInt(id));
        if (index !== -1) {
            this.users[index] = { ...this.users[index], ...userData };
            return this.users[index];
        }
        return null;
    }

    async delete(id) {
        const index = this.users.findIndex(user => user.id === parseInt(id));
        if (index !== -1) {
            this.users.splice(index, 1);
            return this.users;
        }
        return null;
    }

    async getOlderThen(age) {
        const users = this.users.filter(user => user.age > parseInt(age));
        return users.length > 0 ? users : null;
    }

    async getSorted() {
        return this.users.slice().sort((first, second) => first.name.localeCompare(second.name));
    }

    async getUserDomain(domain) {
        if (!domain || typeof domain !== 'string' || !domain.includes('.')) {
            return { error: 'Некорректный домен / Invalid domain' };
        }
        const regex = new RegExp(`@${domain}$`, 'i');
        const filteredUsers = this.users.filter(user => regex.test(user.email));
        return filteredUsers.length > 0 ? filteredUsers : { error: 'Пользователи с таким доменом не найдены / Users with given domain not found' };
    }

    async addCar(id, carData) {
        const user = this.users.find(user => user.id === parseInt(id));
        if (!user) {
            return { error: 'Пользователь не найден / User not found' };
        }
        const carId = user.cars.length ? user.cars[user.cars.length - 1].id + 1 : 1;
        const car = { id: carId, ...carData };
        user.cars.push(car);
        return car;
    }
    async getAllCars(id) {
        const user = this.users.find(user => user.id === parseInt(id));
        if (!user) {
            return { error: 'Пользователь не найден / User not found' };
        }
        return user.cars;
    }
    async getCarId(userId, carId) {
        const user = this.users.find(user => user.id === parseInt(userId));
        if (!user) {
            return { error: 'Пользователь не найден / User not found' };
        }
        const car = user.cars.find(car => car.id === parseInt(carId));
        return car || { error: 'Машина не найдена / Car not found' };
    }
}

const inMemoryUserModel = new InMemoryUserModel(users, 10);
module.exports = inMemoryUserModel;