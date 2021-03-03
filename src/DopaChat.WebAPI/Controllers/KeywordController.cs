using AutoMapper;
using DopaChat.Data;
using DopaChat.Models;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace DopaChat.WebAPI.Controllers
{
    [RoutePrefix("api/keyword")]
    public class KeywordController : ApiController
    {
        private DopaChatEntities db = new DopaChatEntities();

        public IList<KeywordDto> GetKeywords()
        {
            return Mapper.Map<List<Keyword>, List<KeywordDto>>(db.Keywords.ToList());
        }      
    }
}