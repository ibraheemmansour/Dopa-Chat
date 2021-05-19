using Newtonsoft.Json;

namespace DopaChat.Models
{
    public class AssistantDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Address { get; set; }

        public string ProfilePicture { get; set; }

        public string Website { get; set; }

        public string Telephone { get; set; }

        public int CityId { get; set; }

        public string CityName { get; set; }

        [JsonIgnore]
        public CityDto City { get; set; }
    }
}