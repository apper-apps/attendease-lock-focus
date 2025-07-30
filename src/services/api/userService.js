import usersData from "@/services/mockData/users.json";

let users = [...usersData];

const userService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...users];
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    return users.find(user => user.Id === parseInt(id));
  },

  async create(userData) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newUser = {
      Id: Math.max(...users.map(u => u.Id)) + 1,
      ...userData,
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    return newUser;
  },

  async update(id, userData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = users.findIndex(user => user.Id === parseInt(id));
    if (index !== -1) {
      users[index] = { ...users[index], ...userData };
      return users[index];
    }
    throw new Error("User not found");
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = users.findIndex(user => user.Id === parseInt(id));
    if (index !== -1) {
      const deletedUser = users.splice(index, 1)[0];
      return deletedUser;
    }
    throw new Error("User not found");
  },

  async getByRole(role) {
    await new Promise(resolve => setTimeout(resolve, 200));
    return users.filter(user => user.role === role);
  }
};

export default userService;