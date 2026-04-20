using Microsoft.Extensions.DependencyInjection;

namespace CarExplorer.Application.DependencyInjection
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            // services.AddScoped<ICarService, CarService>();

            return services;
        }
    }
}