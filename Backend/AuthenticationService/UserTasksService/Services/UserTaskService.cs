using AutoMapper;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Bson;
using MongoDB.Driver;
using UserTasksService.DTOs;
using UserTasksService.Models;
using UserTasksService.Repositories;

namespace UserTasksService.Services
{
    public class UserTaskService : IUserTaskService
    {
        private IMongoDb _db;
        private IMongoCollection<BsonDocument> _userTasksCollection;
        private IMapper _mapper;
        public UserTaskService(IMongoDb mongoDb, IMapper mapper)
        {
            _db = mongoDb;
            _userTasksCollection = _db.GetCollection("userTasks");
            _mapper = mapper;
        }

        public int AddUserTask(UserTask userTask)
        {
            if(userTask.UserName == "" || userTask.TaskName == "" || userTask.TaskDescription == "")
            {
                return 0;
            }
            _userTasksCollection.InsertOne(userTask.ToBsonDocument());
            return 1;
        }

        public List<UserTaskDto> GetUserTasks(string userName)
        {
            var userTasksBson = _userTasksCollection.Find(Builders<BsonDocument>.Filter.Eq("UserName", userName)).ToList();
            if (userTasksBson.Count == 0)
            {
                Console.WriteLine("No tasks found");
                return null;
            }
            else
            {
                return _mapper.Map<List<UserTaskDto>>(userTasksBson);
            }
        }

        public int UpdateUserTask(UserTask userTask)
        {
            if(userTask.UserName == "" || userTask.TaskName == "")
            {
                return 0;
            }
            var filter = Builders<BsonDocument>.Filter.Eq("_id", userTask._id);
            _userTasksCollection.ReplaceOne(filter, _mapper.Map<BsonDocument>(userTask));

            return 1;
        }

        public int DeleteUserTask(string taskId)
        {
            if(taskId.IsNullOrEmpty())
            {
                return 0;
            }
            var filter = Builders<BsonDocument>.Filter.Eq("_id", taskId);
            _userTasksCollection.DeleteOne(filter);
            return 1;
        }

        public object GetUserTasksByDay(string userName, DateTime date)
        {
            var userTasksBson = _userTasksCollection.Find(Builders<BsonDocument>.Filter.And(
                Builders<BsonDocument>.Filter.Eq("UserName", userName),
                Builders<BsonDocument>.Filter.Gte("TaskStart", date.Date),
                Builders<BsonDocument>.Filter.Lt("TaskStart", date.Date.AddDays(1))
                )).ToList();
            if (userTasksBson.Count == 0)
            {
                return null;
            }
            else
            {
                return _mapper.Map<List<UserTaskDto>>(userTasksBson);
            }

        }
    }
}