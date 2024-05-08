using MongoDB.Bson;
using MongoDB.Driver;

namespace GlobalTasksService.Repositories
{
    public class MongoDb : IMongoDb
    {
        private static string _mongoConnectionString = "mongodb+srv://rafalzmu15:planner@planer.83ju39a.mongodb.net/?retryWrites=true&w=majority&appName=Planer";
        private static MongoClient? _client;

        public MongoDb()
        {
            if (_mongoConnectionString == "")
            {
                throw new Exception("MongoDB connection string is not set");
            }
            var settings = MongoClientSettings.FromConnectionString(_mongoConnectionString);

            settings.ServerApi = new ServerApi(ServerApiVersion.V1);
            _client = new MongoClient(settings);

            testDBConnection();
        }
        public IMongoCollection<BsonDocument> GetCollection(string collectionName)
        {
            return _client.GetDatabase("Planer").GetCollection<BsonDocument>(collectionName);
        }

        private bool testDBConnection()
        {
            var result = _client.GetDatabase("admin").RunCommand<BsonDocument>(new BsonDocument("ping", 1));
            if (result["ok"] == 1)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
