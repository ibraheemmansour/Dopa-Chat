using Newtonsoft.Json;

namespace DopaChat.Models
{
    public class UserDto
    {
        public int ID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Nickname { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Description { get; set; }
        public string Languages { get; set; }
        public string Keywords { get; set; }
        public int CityId { get; set; }

        [JsonIgnore]
        public CityDto City { get; set; }
    }
}