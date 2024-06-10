using System.Text;
using System.Text.Json;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using UserTasksService.Models;

namespace UserTasksService.Services
{
    public class MessageService : IMessageService
    {
        private IUserTaskService _userService;
        public MessageService(IUserTaskService userService)
        {
            _userService = userService;
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
            var channel = connection.CreateModel();

            channel.QueueDeclare(queue: "hello",
                                 durable: false,
                                 exclusive: false,
                                 autoDelete: false,
                                 arguments: null);

            var consumer = new EventingBasicConsumer(channel);
            Console.WriteLine(" [*] Waiting for messages.");
            consumer.Received += (model, ea) =>
            {
                var body = ea.Body.ToArray();
                var message = JsonSerializer.Deserialize<AddUserToGlobalEventMessage>(Encoding.UTF8.GetString(body));
                AddGlobalEventToUser(message);

            };
            channel.BasicConsume(queue: "hello",
                                 autoAck: true,
                                 consumer: consumer);

        }
        public void AddGlobalEventToUser(AddUserToGlobalEventMessage message)
        {
            var userTasks = _userService.GetUserTasks(message.UserToAddID);
            if (userTasks.FindAll(x => x.GlobalTaskId == message._id).Count != 0 )
            {
                return;
            }
            var task = new UserTask
            {
                UserName = message.UserToAddID,
                TaskName = message.TaskName,
                TaskDescription = "Global Event",
                TaskStart = message.TaskStart,
                TaskEnd = message.TaskEnd,
                GlobalTaskId = message._id,
                Category = "Global Event"
            };

            _userService.AddUserTask(task);
            Console.WriteLine(JsonSerializer.Serialize(message));
        }
    }

}
