using GlobalTasksService.Models;

namespace GlobalTasksService.Services
{
    public interface IMessageService
    {
        void CreateConnection();
        void SendMessage(string userName, GlobalTask globalTask);
    }
}