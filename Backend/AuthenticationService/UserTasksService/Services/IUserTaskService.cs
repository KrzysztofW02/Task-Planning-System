using UserTasksService.DTOs;
using UserTasksService.Models;

namespace UserTasksService.Services
{
    public interface IUserTaskService
    {
        int AddUserTask(UserTask userTask);
        List<UserTaskDto> GetUserTasks(string userID);
        int UpdateUserTask(UserTask userTask);
        int DeleteUserTask(string taskId);
        object GetUserTasksByDay(string userName, DateTime date);
    }
}