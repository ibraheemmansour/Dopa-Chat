using DopaChat.Data;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Infrastructure.Annotations;
using System.Data.Entity.ModelConfiguration;

namespace DopaChat.Models
{
    public class KeywordMapper : EntityTypeConfiguration<Keyword>
    {
        public KeywordMapper()
        {
            Property(a => a.Id).HasColumnAnnotation("Id", new IndexAnnotation(new[] { new IndexAttribute("Id") { IsUnique = true } }));
            Property(c => c.Title).IsRequired();
        }
    }
}