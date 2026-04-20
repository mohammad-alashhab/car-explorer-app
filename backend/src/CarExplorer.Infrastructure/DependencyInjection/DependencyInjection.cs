using Microsoft.Extensions.DependencyInjection;
using CarExplorer.Application.Interfaces;
using CarExplorer.Infrastructure.Services;

namespace CarExplorer.Infrastructure.DependencyInjection
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services)
        {
            // HttpClient
            // External APIs
            // Services implementation

            services.AddHttpClient<IVehicleService, VehicleService>(client =>
            {
                client.BaseAddress = new Uri("https://vpic.nhtsa.dot.gov/api/vehicles/");
            });

            return services;
        }
    }
}