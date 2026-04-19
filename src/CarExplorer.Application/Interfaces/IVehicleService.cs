using CarExplorer.Application.DTOs;

namespace CarExplorer.Application.Interfaces
{
    public interface IVehicleService
    {
        Task<List<MakeDto>> GetMakesAsync();
        Task<List<VehicleTypeDto>> GetVehicleTypesByMakeIdAsync(int makeId);
    }
}