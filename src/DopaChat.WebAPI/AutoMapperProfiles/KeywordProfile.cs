using AutoMapper;
using DopaChat.Data;
using DopaChat.Models;

namespace DopaChat.WebAPI.AutoMapperProfiles
{
    public class KeywordProfile : Profile
    {
        protected override void Configure()
        {
            CreateMap<KeywordDto, Keyword>().MaxDepth(1);
            CreateMap<Keyword, KeywordDto>().MaxDepth(1);
        }
    }
}