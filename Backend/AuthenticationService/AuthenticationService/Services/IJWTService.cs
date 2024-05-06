namespace AuthenticationService.Services
{
    public interface IJWTService
    {
        string GenerateSecurityToken(string username, string userRole);
    }
}