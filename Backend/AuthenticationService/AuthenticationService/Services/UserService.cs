using AuthenticationService.Repositories;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Security.Cryptography;
using System.Text;

namespace AuthenticationService.Services
{
    public class UserService : IUserService
    {
        private IMongoDb _db;
        private IMongoCollection<BsonDocument> _usersCollection;
        public UserService(IMongoDb db)
        {
            _db = db;
            _usersCollection = _db.GetCollection("users");
        }
        public int AddUser(string Username, string Password)
        {

            if (Username == "" || Password == "")
            {
                return 0;
            }
            if (UserAlreadyExists(Username))
            {
                return 0;
            }

            string salt = CreateSalt();
            string hash = HashPassword(Password, salt);

            var user = new BsonDocument
            {
                { "Username", Username },
                { "Password", hash },
                { "Salt", salt },
                { "Role", "User" }
            };

            _usersCollection.InsertOne(user);
            return 1;


        }
        public bool AreUserCredendialsValid(string Password, string Username)
        {
            var user = _usersCollection.Find(Builders<BsonDocument>.Filter.Eq("Username", Username)).FirstOrDefault();
            if(user == null)
            {
                return false;
            }
            string hash = user["Password"].AsString;
            string salt = user["Salt"].AsString;

            if (hash == HashPassword(Password, salt))
            {
                return true;
            }
            else
            {
                return false;
            }

        }
        public string GetUserRole(string Username)
        {
            var user = _usersCollection.Find(Builders<BsonDocument>.Filter.Eq("Username", Username)).FirstOrDefault();
            if (user == null)
            {
                return null;
            }
            return user["Role"].AsString;
        }

        private bool UserAlreadyExists(string Username)
        {
            var user = _usersCollection.Find(Builders<BsonDocument>.Filter.Eq("Username", Username)).FirstOrDefault();

            if (user == null)
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        private string CreateSalt()
        {
            byte[] salt = new byte[16];

            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }

            return Convert.ToBase64String(salt);
        }
        private string HashPassword(string password, string salt)
        {
            byte[] passwordBytes = Encoding.UTF8.GetBytes(password);
            byte[] saltBytes = Encoding.UTF8.GetBytes(salt);
            byte[] passwordWithSaltBytes = new byte[passwordBytes.Length + saltBytes.Length];

            HashAlgorithm hashAlgorithm = SHA512.Create();

            passwordWithSaltBytes = passwordBytes.Concat(saltBytes).ToArray();

            return Convert.ToBase64String(hashAlgorithm.ComputeHash(passwordWithSaltBytes));
        }
    }
}
