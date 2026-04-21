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
            var response = await _http.GetFromJsonAsync<MakeResponse>("getallmakes?format=json");
            return response?.Results ?? new List<MakeDto>();
        }

        public async Task<List<VehicleTypeDto>> GetVehicleTypesByMakeIdAsync(int makeId)
        {
            var response = await _http.GetFromJsonAsync<VehicleTypeResponse>(
                $"GetVehicleTypesForMakeId/{makeId}?format=json");

            return response?.Results ?? new List<VehicleTypeDto>();
        }

        public async Task<List<ModelDto>> GetModelsAsync(int makeId, int year, string? type)
        {
            var url = $"GetModelsForMakeIdYear/makeId/{makeId}/modelyear/{year}";
            if (!string.IsNullOrEmpty(type))
            {
                url += $"/vehicleType/{type}";
            }
            url += "?format=json";

            var response = await _http.GetFromJsonAsync<ModelResponse>(url);

            return response?.Results ?? new List<ModelDto>();
        }
    }
}