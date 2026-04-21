using CarExplorer.Application.DependencyInjection;
using CarExplorer.Infrastructure.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllers();

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy
            .WithOrigins("http://16.171.197.206")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// Clean Architecture
builder.Services.AddApplication();
builder.Services.AddInfrastructure();

var app = builder.Build();

// Middleware
app.UseSwagger();
app.UseSwaggerUI();

// app.UseHttpsRedirection();

app.UseCors("AllowFrontend");

app.UseAuthorization();

app.MapControllers();

app.Run();