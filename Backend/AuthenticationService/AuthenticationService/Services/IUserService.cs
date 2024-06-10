namespace AuthenticationService.Services
{
    public interface IUserService
    {
        int AddUser(string Username, string Password);
        int DeleteUser(string Username);

        bool AreUserCredendialsValid(string Password, string Username);
        string GetUserRole(string Username);
    }
}