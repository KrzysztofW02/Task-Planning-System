using MongoDB.Bson;
using MongoDB.Driver;

namespace UserTasksService.Repositories
{
    public interface IMongoDb
    {
        IMongoCollection<BsonDocument> GetCollection(string collectionName);
    }
}