using AutoMapper;
using DopaChat.Data;
using DopaChat.Models;

namespace DopaChat.WebAPI.AutoMapperProfiles
{
    public class AssistantProfile : Profile
    {
        protected override void Configure()
        {
            CreateMap<AssistantDto, Assistant>().MaxDepth(1);
            CreateMap<Assistant, AssistantDto>().MaxDepth(1);
        }
    }
}