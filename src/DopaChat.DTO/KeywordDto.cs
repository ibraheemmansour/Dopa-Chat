using Newtonsoft.Json;
using System.Collections.Generic;

namespace DopaChat.Models
{
    public class KeywordDto
    {
        [JsonIgnore]
        public string ID { get; set; }

        public string Title { get; set; }
    }
}