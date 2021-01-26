using AutoMapper;
using DopaChat.WebAPI.AutoMapperProfiles;
using Microsoft.Ajax.Utilities;
using System;
using System.Linq;

namespace DopaChat.WebAPI
{
    public static class AutoMapperConfig
    {
        public static void RegisterProfiles()
        {
            var profileType = typeof(Profile);

            var profiles = typeof(UserProfile).Assembly.GetTypes()
                .Where(t => profileType.IsAssignableFrom(t)
                    && t.GetConstructor(Type.EmptyTypes) != null)
                .Select(Activator.CreateInstance)
                .Cast<Profile>();

            Mapper.Initialize(a => profiles.ForEach(a.AddProfile));
            Mapper.AssertConfigurationIsValid();
        }
    }
}