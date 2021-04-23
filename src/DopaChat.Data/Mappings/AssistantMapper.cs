using DopaChat.Data;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Infrastructure.Annotations;
using System.Data.Entity.ModelConfiguration;

namespace DopaChat.Models
{
    public class AssistantMapper : EntityTypeConfiguration<Assistant>
    {
        public AssistantMapper()
        {
            Property(a => a.Id).HasColumnAnnotation("Id", new IndexAnnotation(new[] { new IndexAttribute("Id") { IsUnique = true } }));
            Property(c => c.Name).IsRequired();
            Property(c => c.Address).IsRequired();
            Property(c => c.ProfilePicture).IsOptional();
            Property(c => c.Website).IsOptional();
            Property(c => c.Telephone).IsOptional();
            Property(c => c.CityId).IsRequired();
        }
    }
}