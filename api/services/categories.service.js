const {faker} = require("@faker-js/faker");

class CategoriesService {

  constructor(){
    this.categories = [];
    this.generate()
  }

  generate(){
    const limit = 100;

    for (let index = 0; index < limit; index++) {
      this.categories.push({
        id: faker.string.uuid(),
        name: faker.commerce.department(),
      })
    }

  }

  async create(data){
    const newcategory = {
      id: faker.string.uuid(),
      ...data
    }
    this.categories.push(newcategory);
    return newcategory;
  }

  async find(){
    return this.categories;
  }

  async findOne(id){
    return this.categories.find(category => category.id === id);
  }

  async update(id, changes){
    const index = this.categories.findIndex(category => category.id === id);
    if(index === -1){
      throw new Error("category not found");
    }
    const category = this.categories[index]
    this.categories[index] = {
      ...category,
      ...changes
    };
    return this.categories[index];
  }

  async delete(id){
    const index = this.categories.findIndex(category => category.id === id);
    if(index === -1){
      throw new Error("category not found");
    }
    this.categories.splice(index, 1);
    return { id };
  }

}

module.exports = CategoriesService;
