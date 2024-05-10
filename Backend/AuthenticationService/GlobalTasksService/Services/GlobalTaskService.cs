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
        public GlobalTaskService(IMongoDb mongoDb, IMapper mapper)
        {
            _mapper = mapper;
            _mongoDb = mongoDb;
            _globalTasksColleciton = _mongoDb.GetCollection("globalTasks");
        }
        public List<GlobalTask> GetGlobalTasks()
        {
            var allTasks = _globalTasksColleciton.Find(new BsonDocument()).ToList();

            return _mapper.Map<List<GlobalTask>>(allTasks);
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
    }
}
