using DopaChat.Data;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Infrastructure.Annotations;
using System.Data.Entity.ModelConfiguration;

namespace DopaChat.Models
{
    public class LanguageMapper : EntityTypeConfiguration<Language>
    {
        public LanguageMapper()
        {
            Property(a => a.ID).HasColumnAnnotation("ID", new IndexAnnotation(new[] { new IndexAttribute("ID") { IsUnique = true } }));
            Property(c => c.Value).IsRequired();
        }
    }
}