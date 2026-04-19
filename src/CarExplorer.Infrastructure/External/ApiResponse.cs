using CarExplorer.Application.DTOs;

namespace CarExplorer.Infrastructure.External
{
    public class ApiResponse
    {
        public List<MakeDto> Results { get; set; }
    }
}