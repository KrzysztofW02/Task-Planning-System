FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /source

EXPOSE 80
EXPOSE 443

# Copy everything
COPY . .
# Restore as distinct layers
RUN dotnet restore
# Build and publish a release
RUN dotnet publish -c Release -o /app

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build-env /app ./


ENTRYPOINT ["dotnet", "AuthenticationService.dll"]