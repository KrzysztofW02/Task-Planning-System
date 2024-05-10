using GlobalTasksService.Models;
using MongoDB.Bson;

namespace GlobalTasksService.Services
{
    public interface IGlobalTasksService
    {
        int AddGlobalTask(GlobalTask globalTask);
        int DeleteGlobalTask(string globalTaskId);
        List<GlobalTask> GetGlobalTasks();
        int UpdateGlobalTask(GlobalTask globalTask);
    }
}