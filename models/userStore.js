const users = new Map();

// Dummy initial data
users.set('1', {
  id: '1',
  email: 'john@example.com',
  password: 'hashed_password_1', // In real app, use proper password hashing
  name: 'John Doe',
  role: 'user',
  createdAt: new Date()
});

users.set('2', {
  id: '2',
  email: 'jane@example.com',
  password: 'hashed_password_2',
  name: 'Jane Smith',
  role: 'admin',
  createdAt: new Date()
});

const UserStore = {
  create: (userData) => {
    const id = String(users.size + 1);
    const user = {
      id,
      ...userData,
      createdAt: new Date()
    };
    users.set(id, user);
    return user;
  },

  findByEmail: (email) => {
    return Array.from(users.values()).find(user => user.email === email);
  },

  findById: (id) => {
    return users.get(id);
  },

  list: () => {
    return Array.from(users.values()).map(({ password, ...user }) => user);
  },

  update: (id, userData) => {
    const user = users.get(id);
    if (!user) return null;
    const updatedUser = { ...user, ...userData };
    users.set(id, updatedUser);
    return updatedUser;
  }
};

module.exports = UserStore;