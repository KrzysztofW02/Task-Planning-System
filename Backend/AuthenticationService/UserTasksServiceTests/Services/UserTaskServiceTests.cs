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

        public UserTaskServiceTests()
        {
            _mapper = new MapperConfiguration(cfg => cfg.AddProfile<AutoMapperProfile>()).CreateMapper();
            _mongoDb = new MongoDb();
            _userTaskService = new UserTaskService(_mongoDb, _mapper); 
        }

        [TestMethod()]
        public void TaskAddGetDeleteTest()
        {
            //Adding test
            string userName = "TestUser";
            string taskName = "TestTask";
            string taskDescription = "TestDescription";
            DateTime taskStart = DateTime.Now;
            DateTime taskEnd = DateTime.Now;
            string category = "TestCategory";
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

            Assert.AreEqual(1, result);

            //Getting test
            var succesfulUserTasks = _userTaskService.GetUserTasks(userName);
            int succesfullDeleteResult = _userTaskService.DeleteUserTask(userName, taskName);

            Assert.IsTrue(succesfulUserTasks.Count == 1);
            Assert.AreEqual(taskName, succesfulUserTasks[0].TaskName);
            Assert.AreEqual(taskDescription, succesfulUserTasks[0].TaskDescription);
            Assert.AreEqual(category, succesfulUserTasks[0].Category);
            Assert.AreEqual(null, succesfulUserTasks[0].GlobalTaskId);
            //DateTime tests with tolerance of 1 second
            var tolerance = TimeSpan.FromSeconds(1);
            Assert.IsTrue((taskStart - succesfulUserTasks[0].TaskStart) < tolerance);
            Assert.IsTrue((taskEnd - succesfulUserTasks[0].TaskEnd) < tolerance);

            //Deleting test
            Assert.AreEqual(1, succesfullDeleteResult);
        }
    }
}