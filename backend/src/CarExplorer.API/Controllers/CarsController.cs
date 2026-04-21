using CarExplorer.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CarExplorer.API.Controllers
{
    [ApiController]
    [Route("api/cars")]
    public class CarsController : ControllerBase
    {
        private readonly IVehicleService _service;

        public CarsController(IVehicleService service)
        {
            _service = service;
        }

        [HttpGet("makes")]
        public async Task<IActionResult> GetMakes()
        {
            var data = await _service.GetMakesAsync();
            return Ok(data);
        }

        [HttpGet("types/{makeId}")]
        public async Task<IActionResult> GetVehicleTypes(int makeId)
        {
            if (makeId <= 0)
                return BadRequest("Invalid Make Id");

            var data = await _service.GetVehicleTypesByMakeIdAsync(makeId);
            return Ok(data);
        }

        [HttpGet("models")]
        public async Task<IActionResult> GetModels(int makeId, int year, string? type)
        {
            if (makeId <= 0 || year <= 0)
                return BadRequest("Invalid input");

            var data = await _service.GetModelsAsync(makeId, year, type);
            return Ok(data);
        }
    }
}