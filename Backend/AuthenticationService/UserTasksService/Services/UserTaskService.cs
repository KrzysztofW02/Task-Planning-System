using AutoMapper;
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
            var filter = Builders<BsonDocument>.Filter.And(
                Builders<BsonDocument>.Filter.Eq("TaskName", userTask.TaskName),
                Builders<BsonDocument>.Filter.Eq("UserID", userTask.UserName)
                );
            _userTasksCollection.ReplaceOne(filter, _mapper.Map<BsonDocument>(userTask));

            return 1;
        }

        public int DeleteUserTask(string userName, string taskName)
        {
            if(userName == "" || taskName == "")
            {
                return 0;
            }
            var filter = Builders<BsonDocument>.Filter.And(
                Builders<BsonDocument>.Filter.Eq("TaskName", taskName),
                Builders<BsonDocument>.Filter.Eq("UserName", userName)
                );
            _userTasksCollection.DeleteOne(filter);
            return 1;
        }
    }
}
