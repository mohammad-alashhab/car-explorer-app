using System.Net.Http.Json;
using CarExplorer.Application.DTOs;
using CarExplorer.Application.Interfaces;
using CarExplorer.Infrastructure.External;

namespace CarExplorer.Infrastructure.Services
{
    public class VehicleService : IVehicleService
    {
        private readonly HttpClient _http;

        public VehicleService(HttpClient http)
        {
            _http = http;
        }

        public async Task<List<MakeDto>> GetMakesAsync()
        {
            var response = await _http.GetFromJsonAsync<ApiResponse>("getallmakes?format=json");
            return response?.Results ?? new List<MakeDto>();
        }
    }
}