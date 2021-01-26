using AutoMapper;
using DopaChat.Data;
using DopaChat.Models;

namespace DopaChat.WebAPI.AutoMapperProfiles
{
    public class LanguageProfile : Profile
    {
        protected override void Configure()
        {
            CreateMap<LanguageDto, Language>().MaxDepth(1);
            CreateMap<Language, LanguageDto>().MaxDepth(1);
        }
    }
}