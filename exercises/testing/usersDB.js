let users = new Array(20).fill(0)
.map((_, i) => {
  return {
    id: `${i}`,
    createdAt: Date.now() + i,
    email: `readycoder${i}@gmail.com`
  }
})

const all = () => users

const setAll = (array) => users = array 

module.exports = { all, setAll } 