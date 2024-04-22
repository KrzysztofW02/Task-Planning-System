using MongoDB.Bson;
using MongoDB.Driver;

namespace AuthenticationService.Repositories
{
    public interface IMongoDb
    {
        IMongoCollection<BsonDocument> GetCollection(string collectionName);
    }
}