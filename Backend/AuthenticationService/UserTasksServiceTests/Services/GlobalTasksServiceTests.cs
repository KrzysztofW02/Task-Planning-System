using AutoMapper;
using GlobalTasksService.Models;
using GlobalTasksService.Repositories;
using GlobalTasksService.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MicroservicesTests.Services
{
	[TestClass()]
	public class GlobalTasksServiceTests
	{
		private GlobalTaskService _globalTasksService;
		private IMongoDb _mongoDb;
		private IMapper _mapper;
		private GlobalTask _globalTask;

		public GlobalTasksServiceTests()
		{
			_mongoDb = new MongoDb();
			_mapper = new MapperConfiguration(cfg => cfg.AddProfile<AutoMapperProfile>()).CreateMapper();
			_globalTasksService = new GlobalTaskService(_mongoDb, _mapper);

			_globalTask = new GlobalTask
			{
				TaskName = "TestTask",
				TaskDescription = "TestDescription",
				TaskStart = DateTime.Now,
				TaskEnd = DateTime.Now,
				Participants = new List<string> { "TestUser" }
			};
		}

		[TestMethod()]  
		public void AddAndDeleteTest()
		{
			//Add sample task
			var successResult = _globalTasksService.AddGlobalTask(_globalTask);
			var invalidGlobalTaks = new GlobalTask
			{
				TaskName = "",
				TaskDescription = "",
				TaskStart = DateTime.Now,
				TaskEnd = DateTime.Now,
				Participants = new List<string> { "TestUser" }
			};
			var failResult = _globalTasksService.AddGlobalTask(invalidGlobalTaks);

			//Delete sample task
			var successDeleteResult = _globalTasksService.DeleteGlobalTask(_globalTask._id);
			var failDeleteResult = _globalTasksService.DeleteGlobalTask("");

			//Assert
			Assert.AreEqual(1, successResult);
			Assert.AreEqual(0, failResult);

			Assert.AreEqual(successDeleteResult, 1);
			Assert.AreEqual(failDeleteResult, 0);
		}

		[TestMethod()]
		public void GetTest()
		{
			//Add sample task
			var successResult = _globalTasksService.AddGlobalTask(_globalTask);

			//Get all tasks
			var allTasks = _globalTasksService.GetGlobalTasks();

			//Delete sample task
			_globalTasksService.DeleteGlobalTask(_globalTask._id);

			//Assert
			Assert.AreEqual(1, successResult);
			Assert.IsTrue(allTasks.Count > 0);
		}


	}
}
