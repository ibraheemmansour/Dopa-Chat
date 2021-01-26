using DopaChat.Data;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Infrastructure.Annotations;
using System.Data.Entity.ModelConfiguration;

namespace DopaChat.Models
{
    public class UserMapper : EntityTypeConfiguration<User>
    {
        public UserMapper()
        {
            Property(a => a.ID).HasColumnAnnotation("ID", new IndexAnnotation(new[] { new IndexAttribute("ID") { IsUnique = true } }));
            Property(c => c.FirstName).IsRequired();
            Property(c => c.LastName).IsRequired();
            Property(c => c.Nickname).IsRequired();
            Property(c => c.Password).IsRequired();
            Property(c => c.Email).IsOptional();
            Property(c => c.Description).IsRequired();
            Property(c => c.Languages).IsRequired();
            Property(c => c.Keywords).IsRequired();
            Property(c => c.CityId).IsRequired();
        }
    }
}