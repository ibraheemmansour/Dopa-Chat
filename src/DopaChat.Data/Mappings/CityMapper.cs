using DopaChat.Data;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Infrastructure.Annotations;
using System.Data.Entity.ModelConfiguration;

namespace DopaChat.Models
{
    public class CityMapper : EntityTypeConfiguration<City>
    {
        public CityMapper()
        {
            Property(a => a.Id).HasColumnAnnotation("Id", new IndexAnnotation(new[] { new IndexAttribute("ID") { IsUnique = true } }));
            Property(c => c.CityName).IsRequired();
            Property(c => c.City_ASCII).IsRequired();
            Property(c => c.Latitude).IsRequired();
            Property(c => c.Longitude).IsRequired();
            Property(c => c.Country).IsRequired();
            Property(c => c.ISO2).IsRequired();
            Property(c => c.ISO3).IsRequired();
            Property(c => c.AdminName).IsOptional();
            Property(c => c.Capital).IsOptional();
            Property(c => c.Population).IsOptional();
            HasMany(c => c.Users);
        }
    }
}