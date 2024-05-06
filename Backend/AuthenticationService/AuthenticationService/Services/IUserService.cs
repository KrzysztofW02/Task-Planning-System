namespace AuthenticationService.Services
{
    public interface IUserService
    {
        int AddUser(string Username, string Password);

        bool AreUserCredendialsValid(string Password, string Username);
        string GetUserRole(string Username);
    }
}