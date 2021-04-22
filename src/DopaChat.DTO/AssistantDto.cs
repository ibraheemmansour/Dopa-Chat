using Newtonsoft.Json;

namespace DopaChat.Models
{
    public class AssistantDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Address { get; set; }

        public int CityId { get; set; }

        [JsonIgnore]
        public CityDto City { get; set; }
    }
}