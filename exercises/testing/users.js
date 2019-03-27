const usersDB = require('./usersDB')

// Test DELETE
const allUsers = () => usersDB.all()

// simulate async db call with promise
const findUser = (id) => new Promise((resolve, reject) => {
  const user = usersDB.all().find(user => user.id === id)
  if (user) {
    return resolve(user)
  }
  reject(new Error(`No user with id "${id}"`))
})

// simulate async db call with promise
const deleteUser = (id) => new Promise((resolve, reject) => {
  const i = usersDB.all().findIndex(user => user.id === id)

  if (i < 0) {
    return reject(new Error(`No user with id "${id}"`))
  }

  usersDB.setAll(usersDB.all().slice(i, 1))
  resolve({id})
})

module.exports = {
  findUser,
  deleteUser
}
