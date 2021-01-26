using Newtonsoft.Json;
using System.Collections.Generic;

namespace DopaChat.Models
{
    public class CityDto
    {
        public int ID { get; set; }
        public string CityName { get; set; }
        public string City_ascii { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public string Country { get; set; }

        [JsonIgnore]
        public IList<UserDto> Users { get; set; }
    }
}