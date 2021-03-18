using Newtonsoft.Json;

namespace DopaChat.Models
{
    public class UserDto
    {
        [JsonProperty("id")]
        public int ID { get; set; }
        
        [JsonProperty("firstName")]
        public string FirstName { get; set; }

        [JsonProperty("lastName")]
        public string LastName { get; set; }

        [JsonProperty("nickname")]
        public string Nickname { get; set; }

        [JsonProperty("password")]
        public string Password { get; set; }

        [JsonProperty("email")]
        public string Email { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("languages")]
        public string Languages { get; set; }

        [JsonProperty("keywords")]
        public string Keywords { get; set; }

        [JsonProperty("country")]
        public string Country { get; set; }

        [JsonProperty("cityId")]
        public int CityId { get; set; }

        [JsonIgnore]
        public CityDto City { get; set; }
    }
}