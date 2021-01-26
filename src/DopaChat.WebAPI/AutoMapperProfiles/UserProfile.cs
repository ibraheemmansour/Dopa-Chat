using AutoMapper;
using DopaChat.Data;
using DopaChat.Models;

namespace DopaChat.WebAPI.AutoMapperProfiles
{
    public class UserProfile : Profile
    {
        protected override void Configure()
        {
            CreateMap<UserDto, User>().MaxDepth(1);
            CreateMap<User, UserDto>().MaxDepth(1);
        }
    }
}