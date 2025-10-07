using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Fall2025_Project2_jlwallace6.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        private readonly MyApiConfig _config;
        private readonly HttpClient _httpClient;

        public SearchController(MyApiConfig config, HttpClient httpClient)
        {
            _config = config;
            _httpClient = httpClient;
        }

        [HttpGet("google")]
        public async Task<IActionResult> GoogleSearch(string query)
        {
            var apiKey = _config.GoogleApiKey;
            var SEID = _config.GoogleSEID;
            var url = $"https://www.googleapis.com/customsearch/v1?q={query}&key={apiKey}&cx={SEID}";

            var response = await _httpClient.GetStringAsync(url);
            return Content(response, "application/json");
        }
    }
}
