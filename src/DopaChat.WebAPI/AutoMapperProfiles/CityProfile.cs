using AutoMapper;
using DopaChat.Data;
using DopaChat.Models;

namespace DopaChat.WebAPI.AutoMapperProfiles
{
    public class CityProfile : Profile
    {
        protected override void Configure()
        {
            CreateMap<CityDto, City>().MaxDepth(1);
            CreateMap<City, CityDto>().MaxDepth(1);
        }
    }
}