jest.mock("./usersDB");
const usersDB = require("./usersDB");
const { findUser, deleteUser } = require("./users");

// write some tests
describe("users", () => {
  beforeEach(() => {
    usersDB.all.mockReturnValue([
      {
        id: 0
      },
      {
        id: 1
      },
      {
        id: 2
      }
    ]);
  });

  describe("findUser", () => {
    test("find a existing user", async () => {
      const user = await findUser(1)

      expect(user).toBeTruthy()
      expect(user.id).toEqual(1)
    });

    test("find an non existing user", async() => {

      try {
        await findUser(8)
      } catch (error) {
        expect(error.message).toMatch("No user with id")
      }

    });

    test("find for a user but db is empty", async () => {
      usersDB.all.mockReturnValue([]);
      try {
        await findUser(8)
      } catch (error) {
        expect(error.message).toMatch("No user with id")
      }
    });
    
  });

  describe("deleteUser", () => {
    test("delete a existing user", async () => {
      const deletedId = await deleteUser(1)

      try {
        await findUser(deletedId)
        expect(true).toBe(false)
      } catch (error) {
        expect(error.message).toMatch("No user with id")
      }


    });

    test("when is trying to delete a user which id is not in our repository", async () => {
      try {
        const deletedId = await deleteUser(9)
        expect(true).toBe(false)
      } catch (error) {
        expect(error.message).toMatch("No user with id")
      }
      
    });

    test("when is trying to delete a user but our user repository is empty", async () => {

      usersDB.all.mockReturnValue([]);

      try {
        const deletedId = await deleteUser(9)
        expect(true).toBe(false)
      } catch (error) {
        expect(error.message).toMatch("No user with id")
      }

    });
  });
});
