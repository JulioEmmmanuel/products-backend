const {faker} = require("@faker-js/faker");

class UsersService {

  constructor(){
    this.users = [];
    this.generate()
  }

  generate(){
    const limit = 100;

    for (let index = 0; index < limit; index++) {
      this.users.push({
        id: faker.string.uuid(),
        name: faker.person.firstName(),
        lastName: faker.person.lastName(),
        sex: faker.person.sex()
      })
    }

  }

  async create(data){
    const newuser = {
      id: faker.string.uuid(),
      ...data
    }
    this.users.push(newuser);
    return newuser;
  }

  async find(){
    return this.users;
  }

  async findOne(id){
    return this.users.find(user => user.id === id);
  }

  async update(id, changes){
    const index = this.users.findIndex(user => user.id === id);
    if(index === -1){
      throw new Error("user not found");
    }
    const user = this.users[index]
    this.users[index] = {
      ...user,
      ...changes
    };
    return this.users[index];
  }

  async delete(id){
    const index = this.users.findIndex(user => user.id === id);
    if(index === -1){
      throw new Error("user not found");
    }
    this.users.splice(index, 1);
    return { id };
  }

}

module.exports = UsersService;
