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
    }
}