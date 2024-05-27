using System.Text;
using System.Threading.Channels;
using RabbitMQ.Client;

namespace GlobalTasksService.Services
{
    public class MessageService : IMessageService
    {
        private IModel _channel;

        public MessageService()
        {
            CreateConnection();
            SendMessage("TestUser", "TestGlobalID");
        }
        public void CreateConnection()
        {
            var factory = new ConnectionFactory
            {
                HostName = "localhost",
                UserName = "guest",
                Password = "guest",
                Port = 5672
            };
            var connection = factory.CreateConnection();
            _channel = connection.CreateModel();
            _channel.QueueDeclare(queue: "hello",
                     durable: false,
                     exclusive: false,
                     autoDelete: false,
                     arguments: null);
        }

        public void SendMessage(string userName, string globalTaskId)
        {
            var body = Encoding.UTF8.GetBytes(userName + ","+ globalTaskId);

            _channel.BasicPublish(exchange: string.Empty,
                             routingKey: "hello",
                             basicProperties: null,
                             body: body);

            Console.WriteLine(" [x] Sent {0}", userName + "," + globalTaskId);
        }

    }
}
