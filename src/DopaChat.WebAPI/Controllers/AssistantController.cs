using AutoMapper;
using DopaChat.Data;
using DopaChat.Models;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace DopaChat.WebAPI.Controllers
{
    [RoutePrefix("api/assistants")]
    public class AssistantController : ApiController
    {
        private DopaChatEntities db = new DopaChatEntities();

        public IList<AssistantDto> GetAssistants()
        {
            return Mapper.Map<List<Assistant>, List<AssistantDto>>(db.Assistants.ToList());
        }

        [HttpGet]
        [Route("{id}")]
        public IHttpActionResult GetAssistant(int id)
        {
            Assistant assistant = db.Assistants.Find(id);

            if (assistant == null)
            {
                return NotFound();
            }

            return Ok(Mapper.Map<Assistant, AssistantDto>(assistant));
        }

        [HttpGet]
        [Route("country/{id}")]
        public IHttpActionResult GetAssistantsByCountry(string id)
        {
            List<Assistant> assistants = new List<Assistant>();
            List<City> cities = db.Cities.Where(c=>c.ISO2 == id).ToList();

            foreach(City city in cities)
            {
                assistants.AddRange(db.Assistants.Where(a => a.CityId == city.Id).ToList());
            }

            return Ok(Mapper.Map<List<Assistant>, List<AssistantDto>>(assistants));
        }
    }
}