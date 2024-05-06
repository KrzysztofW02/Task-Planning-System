using MongoDB.Bson;
using MongoDB.Driver;

namespace GlobalTasksService.Repositories
{
    public interface IMongoDb
    {
        IMongoCollection<BsonDocument> GetCollection(string collectionName);
    }
}