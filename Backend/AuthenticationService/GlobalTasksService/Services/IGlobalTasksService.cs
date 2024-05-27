using GlobalTasksService.Models;
using MongoDB.Bson;

namespace GlobalTasksService.Services
{
    public interface IGlobalTasksService
    {
        List<GlobalTask> GetGlobalTasks();
        GlobalTask GetGlobalTaskById(string globalTaskId);
        int AddGlobalTask(GlobalTask globalTask);
        int DeleteGlobalTask(string globalTaskId);
        int UpdateGlobalTask(GlobalTask globalTask);
        int AddParticipant(string globalTaskId, string participantUserName);
    }
}