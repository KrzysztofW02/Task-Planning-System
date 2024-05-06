using GlobalTasksService.Models;
using GlobalTasksService.Repositories;
using MongoDB.Bson;
using MongoDB.Driver;

namespace GlobalTasksService.Services
{
    public class GlobalTasksService
    {
        private IMongoDb _mongoDb;
        private IMongoCollection<BsonDocument> _globalTasksColleciton;
        public GlobalTasksService(IMongoDb mongoDb)
        {
            _mongoDb = mongoDb;
            _globalTasksColleciton = _mongoDb.GetCollection("globalTasks");
        }
        public List<GlobalTask> GetTasks()
        {
            var allTasks = _globalTasksColleciton.Find(new BsonDocument()).ToList();

            return allTasks.Select(task => new GlobalTask
            {
                TaskName = task["Name"].AsString,
                TaskDescription = task["Description"].AsString,
                TaskStart = task["Start"].ToUniversalTime(),
            }).ToList();
        }
    }
}
