using AuthenticationService.Models;

namespace AuthenticationService.Services.Tests
{
    [TestClass()]
    public class UserServiceTests
    {
        private IUserService _userService;
        private UserModel _testUser;
        public UserServiceTests(IUserService userService)
        {
            _userService = userService; 
            _testUser = new UserModel
            {
                Username = "TestUser",
                Password = "TestPassword"
            };
        }

        [TestMethod()]
        public void AddDeleteUserTest()
        {
            //Act
            var result = _userService.AddUser(_testUser.Username, _testUser.Password);
            var deleteResult = _userService.DeleteUser(_testUser.Username);

            //Assert;
            Assert.AreEqual(0, result);
            Assert.IsNotNull(result);

            Assert.AreEqual(0, deleteResult);
        }
        [TestMethod()]
        public void LogInTest()
        {
            //Arrange
            _userService.AddUser(_testUser.Username, _testUser.Password);

            //Act
            var result = _userService.AreUserCredendialsValid(_testUser.Username, _testUser.Password);
            var invalidPasswordResult = _userService.AreUserCredendialsValid(_testUser.Username, "InvalidPassword");
            var invalidUsernameResult = _userService.AreUserCredendialsValid("InvalidUsername", _testUser.Password);


            //Clean up
            _userService.DeleteUser(_testUser.Username);

            //Assert
            Assert.IsTrue(result);
            Assert.IsFalse(invalidPasswordResult);
            Assert.IsFalse(invalidUsernameResult);
        }
    }
}