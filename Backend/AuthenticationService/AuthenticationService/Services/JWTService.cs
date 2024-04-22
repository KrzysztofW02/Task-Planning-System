using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AuthenticationService.Services
{
    public class JWTService : IJWTService
    {
        private readonly string _issuer;
        private readonly string _audience;
        private readonly string _secretKey;

        public JWTService()
        {
            _issuer = "AuthenticationAPI";
            _audience = "PlanerUser";
            _secretKey = "ThisShouldBeStoredInSecurePlaceNotHere";
        }
        public string GenerateSecurityToken(string username)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var exparationDate = DateTime.Now.AddHours(5);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, username),
            };
            var tokenDescriptor = new JwtSecurityToken(
                issuer: _issuer,
                audience: _audience,
                claims: claims,
                expires: exparationDate,
                signingCredentials: credentials
            );

            var tokenHandler = new JwtSecurityTokenHandler();

            return tokenHandler.WriteToken(tokenDescriptor);
        }
    }
}
