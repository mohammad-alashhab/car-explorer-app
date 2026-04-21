# build stage
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# copy csproj
COPY CarExplorer.API/*.csproj CarExplorer.API/
COPY CarExplorer.Application/*.csproj CarExplorer.Application/
COPY CarExplorer.Infrastructure/*.csproj CarExplorer.Infrastructure/
COPY CarExplorer.Domain/*.csproj CarExplorer.Domain/

RUN dotnet restore CarExplorer.API/CarExplorer.API.csproj

# copy other files
COPY . .

WORKDIR /src/CarExplorer.API

RUN dotnet publish -c Release -o /app/out

# runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:10.0

WORKDIR /app

ENV ASPNETCORE_ENVIRONMENT=Production
ENV ASPNETCORE_URLS=http://+:8080

COPY --from=build /app/out .

EXPOSE 8080

ENTRYPOINT ["dotnet", "CarExplorer.API.dll"]