﻿using Newtonsoft.Json;

namespace DopaChat.Models
{
    public class KeywordDto
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("title")]
        public string Title { get; set; }
    }
}