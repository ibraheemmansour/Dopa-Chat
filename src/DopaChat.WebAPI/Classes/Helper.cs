using DopaChat.Data;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DopaChat.WebAPI.Classes
{
    public class Helper
    {
        private DopaChatEntities db = new DopaChatEntities();

        public Dictionary<string, string> GetKeywords(List<string> keywords)
        {
            Dictionary<string, string> keyValuePairs = new Dictionary<string, string>();

            foreach(string id in keywords)
            {
                Keyword keyword = db.Keywords.FirstOrDefault(x => x.Id == id);

                if (keyword != null)
                {
                    keyValuePairs.Add(id, keyword.Title);
                }
            }

            return keyValuePairs;
        }

        public string GetLanguage(string languages)
        {
            StringBuilder stringBuilder = new StringBuilder();
            string[] codes = languages.Split(',');

            foreach(string code in codes)
            {
                Language language = db.Languages.FirstOrDefault(l => l.Id == code);

                if (language != null)
                {
                    stringBuilder.Append(language.Value);
                }
            }

            return stringBuilder.ToString();
        }
    }
}