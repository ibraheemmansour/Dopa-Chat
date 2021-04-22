using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace DopaChat.Models
{
    public class CityDto
    {
        public int Id { get; set; }
        public string CityName { get; set; }
        public string City_ASCII { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public string Country { get; set; }
        public string ISO2 { get; set; }
        public string ISO3 { get; set; }
        public string AdminName { get; set; }
        public string Capital { get; set; }
        public Nullable<double> Population { get; set; }

        [JsonIgnore]
        public IList<UserDto> Users { get; set; }

        [JsonIgnore]
        public IList<AssistantDto> Assistants { get; set; }
    }
}