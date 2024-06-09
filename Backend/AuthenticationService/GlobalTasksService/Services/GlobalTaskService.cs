using AutoMapper;
using GlobalTasksService.Models;
using GlobalTasksService.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Bson;
using MongoDB.Driver;

namespace GlobalTasksService.Services
{
    public class GlobalTaskService : IGlobalTasksService
    {
        private IMongoDb _mongoDb;
        private IMongoCollection<BsonDocument> _globalTasksColleciton;
        private IMapper _mapper;
        private IMessageService _messageService;
        public GlobalTaskService(IMongoDb mongoDb, IMapper mapper, IMessageService messageService)
        {
            _mapper = mapper;
            _messageService = messageService;
            _mongoDb = mongoDb;
            _globalTasksColleciton = _mongoDb.GetCollection("globalTasks");
        }
        public List<GlobalTask> GetGlobalTasks()
        {
            var allTasks = _globalTasksColleciton.Find(new BsonDocument()).ToList();

            return _mapper.Map<List<GlobalTask>>(allTasks);
        }
        
        public GlobalTask GetGlobalTaskById(string globalTaskId)
        {
            var filter = Builders<BsonDocument>.Filter.Eq("_id", globalTaskId);
            var globalTask = _globalTasksColleciton.Find(filter).FirstOrDefault();
            return _mapper.Map<GlobalTask>(globalTask);
        }

        public int AddGlobalTask(GlobalTask globalTask)
        {
            if (globalTask.TaskName.IsNullOrEmpty() || globalTask.TaskName.IsNullOrEmpty())
            {
                return 0;
            }
            _globalTasksColleciton.InsertOne(globalTask.ToBsonDocument());
            return 1;
        }

        public int UpdateGlobalTask(GlobalTask globalTask)
        {
            if (globalTask.TaskName.IsNullOrEmpty() || globalTask.TaskName.IsNullOrEmpty())
            {
                return 0;
            }
            var filter = Builders<BsonDocument>.Filter.Eq("_id", globalTask._id);
            _globalTasksColleciton.ReplaceOne(filter, globalTask.ToBsonDocument());
            return 1;
        }

        public int DeleteGlobalTask(string globalTaskId)
        {
            try
            {
                var filter = Builders<BsonDocument>.Filter.Eq("_id", globalTaskId);
                var result = _globalTasksColleciton.DeleteOne(filter);
                if(result.DeletedCount > 0)
                {
                    return 1;
                }
                else
                {
                    return 0;
                }

            }
            catch (Exception)
            {
                return 0;
            }
        }
        public int AddParticipant(string globalTaskId, string participantUserName)
        {
            var filter = Builders<BsonDocument>.Filter.Eq("_id", globalTaskId);
            var update = Builders<BsonDocument>.Update.Push("Participants", participantUserName);
            var result = _globalTasksColleciton.UpdateOne(filter, update);

            //Send message to userTasksService to add task to user

            var taskData = GetGlobalTaskById(globalTaskId);
            _messageService.SendMessage(participantUserName, taskData);


            if(result.ModifiedCount > 0)
            {
                return 1;
            }
            else
            {
                return 0;
            }
        }
    }
}
