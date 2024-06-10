using Microsoft.AspNetCore.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AuthenticationService.Models;
using AuthenticationService.Services;

namespace MicroservicesTests.Services
{
    [TestClass()]
    internal class AuthenticationServiceTests
    {
        private IUserService _userService;
        private UserModel _testUser;
        public AuthenticationServiceTests(IUserService userService)
        {
            _userService = userService; 
        }

        [TestInitialize()]
        public void Setup()
        {
            var _testUser = new UserModel
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

        }
    }
}
