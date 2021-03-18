using DopaChat.Models;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace DopaChat.WebAPI.Classes
{
    public class SearchQuery
    {
        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("country")]
        public string Country { get; set; }

        [JsonProperty("city")]
        public int City { get; set; }
        
        [JsonProperty("keywords")]
        public List<KeywordDto> Keywords { get; set; }
    }
}