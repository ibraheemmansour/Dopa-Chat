using AutoMapper;
using DopaChat.Data;
using DopaChat.Models;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace DopaChat.WebAPI.Controllers
{
    [RoutePrefix("api/city")]
    public class CityController : ApiController
    {
        private DopaChatEntities db = new DopaChatEntities();

        public IList<CityDto> GetCities()
        {
            return Mapper.Map<List<City>, List<CityDto>>(db.Cities.ToList());
        }

        [HttpGet]
        [Route("{id}")]
        public IHttpActionResult GetCity(int id)
        {
            City city = db.Cities.Find(id);

            if (city == null)
            {
                return NotFound();
            }

            return Ok(Mapper.Map<City, CityDto>(city));
        }

        [HttpGet]
        [Route("all/{country_iso2}")]
        public IList<CityDto> GetCountryCities(string country_iso2)
        {
            var country_cities = from city in db.Cities
                                 where city.ISO2.ToLower() == country_iso2.ToLower()
                                 select city;

            return Mapper.Map<List<City>, List<CityDto>>(country_cities.ToList());
        }        
    }
}