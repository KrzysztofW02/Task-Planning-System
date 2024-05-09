using Microsoft.VisualStudio.TestTools.UnitTesting;
using UserTasksService.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserTasksService.Repositories;
using AutoMapper;
using UserTasksService.Models;

namespace UserTasksService.Services.Tests
{
    [TestClass()]
    public class UserTaskServiceTests
    {
        private UserTaskService _userTaskService;
        private IMongoDb _mongoDb;
        private IMapper _mapper;
        private string userName = "TestUser";
        private string taskName = "TestTask";
        private string taskDescription = "TestDescription";
        private DateTime taskStart = DateTime.Now;
        private DateTime taskEnd = DateTime.Now;
        private string category = "TestCategory";

        public UserTaskServiceTests()
        {
            _mapper = new MapperConfiguration(cfg => cfg.AddProfile<AutoMapperProfile>()).CreateMapper();
            _mongoDb = new MongoDb();
            _userTaskService = new UserTaskService(_mongoDb, _mapper); 
        }

        [TestMethod()]
        public void Task1AddTest()
        {
            var exampleTask = new UserTask
            {
                UserName = userName,
                TaskName = taskName,
                TaskDescription = taskDescription,
                TaskStart = taskStart,
                TaskEnd = taskEnd,
                GlobalTaskId = null,
                Category = category
            };
            int result = _userTaskService.AddUserTask(exampleTask);

            //Delete sample task
            _userTaskService.DeleteUserTask(userName, taskName);

            Assert.AreEqual(1, result);
        }
        [TestMethod()]
        public void Task2GetTest()
        {
            //Add sample task
            var exampleTask = new UserTask
            {
                UserName = userName,
                TaskName = taskName,
                TaskDescription = taskDescription,
                TaskStart = taskStart,
                TaskEnd = taskEnd,
                GlobalTaskId = null,
                Category = category
            };
            _userTaskService.AddUserTask(exampleTask);

            //Get sample task
            var succesfulUserTasks = _userTaskService.GetUserTasks(userName);
            var failUserTask = _userTaskService.GetUserTasks("SomeUserThatDoeasntExist");

            //Delete sample task
            _userTaskService.DeleteUserTask(userName, taskName);

            //Assert
            Assert.IsTrue(succesfulUserTasks.Count == 1);
            Assert.AreEqual(taskName, succesfulUserTasks[0].TaskName);
            Assert.AreEqual(taskDescription, succesfulUserTasks[0].TaskDescription);
            Assert.AreEqual(category, succesfulUserTasks[0].Category);
            Assert.AreEqual(null, succesfulUserTasks[0].GlobalTaskId);

            //DateTime tests with tolerance of 1 second
            var tolerance = TimeSpan.FromSeconds(1);
            Assert.IsTrue((taskStart - succesfulUserTasks[0].TaskStart) < tolerance);
            Assert.IsTrue((taskEnd - succesfulUserTasks[0].TaskEnd) < tolerance);

            Assert.IsTrue(failUserTask == null);
        }

        [TestMethod()]
        public void Task3DeleteTest()
        {
            //Add sample task
            var exampleTask = new UserTask
            {
                UserName = userName,
                TaskName = taskName,
                TaskDescription = taskDescription,
                TaskStart = taskStart,
                TaskEnd = taskEnd,
                GlobalTaskId = null,
                Category = category
            };
            _userTaskService.AddUserTask(exampleTask);

            //Delete sample task
            int succesfullDeleteResult = _userTaskService.DeleteUserTask(userName, taskName);
            int nullFailDeleteResult = _userTaskService.DeleteUserTask(null, null);
            int emptyFailDeleteResult = _userTaskService.DeleteUserTask("", "");

            Assert.AreEqual(1, succesfullDeleteResult);
            Assert.AreEqual(0, nullFailDeleteResult);
            Assert.AreEqual(0, emptyFailDeleteResult);
        }

    }
}