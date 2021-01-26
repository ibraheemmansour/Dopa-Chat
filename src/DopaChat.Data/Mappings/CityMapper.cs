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
            Property(a => a.ID).HasColumnAnnotation("ID", new IndexAnnotation(new[] { new IndexAttribute("ID") { IsUnique = true } }));
            Property(c => c.CityName).IsRequired();
            Property(c => c.City_ascii).IsOptional();
            Property(c => c.Latitude).IsOptional();
            Property(c => c.Longitude).IsOptional();
            Property(c => c.Country).IsRequired();
            HasMany(c => c.Users);
        }
    }
}