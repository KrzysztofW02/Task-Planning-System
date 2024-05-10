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
		private UserTask _exampleTask;

		public UserTaskServiceTests()
		{
			_mapper = new MapperConfiguration(cfg => cfg.AddProfile<AutoMapperProfile>()).CreateMapper();
			_mongoDb = new MongoDb();
			_userTaskService = new UserTaskService(_mongoDb, _mapper); 
			_exampleTask = new UserTask
			{
                UserName = "TestUser",
                TaskName = "TestTaskName",
                TaskDescription = "TestDescription",
                TaskStart = DateTime.Now,
                TaskEnd = DateTime.Now,
                GlobalTaskId = null,
                Category = "ExampleCategory"
            };

		}

		[TestMethod()]
		public void Task1AddTest()
		{
			int result = _userTaskService.AddUserTask(_exampleTask);

			//Delete sample task
			_userTaskService.DeleteUserTask(_exampleTask._id);

			Assert.AreEqual(1, result);
		}
		[TestMethod()]
		public void Task2GetTest()
		{
			//Add sample task
			_userTaskService.AddUserTask(_exampleTask);

			//Get sample task
			var succesfulUserTasks = _userTaskService.GetUserTasks(_exampleTask.UserName);
			var failUserTask = _userTaskService.GetUserTasks("SomeUserThatDoeasntExist");

			//Delete sample task
			_userTaskService.DeleteUserTask(_exampleTask._id);

			//Assert
			Assert.IsTrue(succesfulUserTasks.Count == 1);
			Assert.AreEqual(_exampleTask.TaskName, succesfulUserTasks[0].TaskName);
			Assert.AreEqual(_exampleTask.TaskDescription, succesfulUserTasks[0].TaskDescription);
			Assert.AreEqual(_exampleTask.Category, succesfulUserTasks[0].Category);
			Assert.AreEqual(null, succesfulUserTasks[0].GlobalTaskId);

			//DateTime tests with tolerance of 1 second
			var tolerance = TimeSpan.FromSeconds(1);
			Assert.IsTrue((_exampleTask.TaskStart - succesfulUserTasks[0].TaskStart) < tolerance);
			Assert.IsTrue((_exampleTask.TaskEnd - succesfulUserTasks[0].TaskEnd) < tolerance);

			Assert.IsTrue(failUserTask == null);
		}

		[TestMethod()]
		public void Task3DeleteTest()
		{
			//Add sample task
			_userTaskService.AddUserTask(_exampleTask);

			//Delete sample task
			int succesfullDeleteResult = _userTaskService.DeleteUserTask(_exampleTask._id);
			int nullFailDeleteResult = _userTaskService.DeleteUserTask(null);
			int emptyFailDeleteResult = _userTaskService.DeleteUserTask("");

			Assert.AreEqual(1, succesfullDeleteResult);
			Assert.AreEqual(0, nullFailDeleteResult);
			Assert.AreEqual(0, emptyFailDeleteResult);
		}

	}
}