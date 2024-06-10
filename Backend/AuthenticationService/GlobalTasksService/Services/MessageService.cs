using System.Text;
using System.Text.Json;
using System.Threading.Channels;
using GlobalTasksService.Models;
using RabbitMQ.Client;

namespace GlobalTasksService.Services
{
    public class MessageService : IMessageService
    {
        private IModel _channel;

        public MessageService()
        {
            CreateConnection();
        }
        public void CreateConnection()
        {
            var factory = new ConnectionFactory
            {
                HostName = "rabbitmq",
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

        public void SendMessage(string userName, GlobalTask globalTask)
        {

            AddUserToGlobalEventMessage message = new AddUserToGlobalEventMessage
            {
                _id = globalTask._id,
                TaskName = globalTask.TaskName,
                TaskDescription = globalTask.TaskDescription,
                TaskStart = globalTask.TaskStart,
                TaskEnd = globalTask.TaskEnd,
                UserToAddID = userName
            };
            var body = Encoding.UTF8.GetBytes(JsonSerializer.Serialize(message));

            _channel.BasicPublish(exchange: string.Empty,
                             routingKey: "hello",
                             basicProperties: null,
                             body: body);

        }

    }
}
