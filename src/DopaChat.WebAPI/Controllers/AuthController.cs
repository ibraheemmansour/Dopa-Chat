using DopaChat.Data;
using DopaChat.WebAPI.Classes;
using Newtonsoft.Json.Linq;
using System;
using System.Linq;
using System.Web.Http;

namespace DopaChat.WebAPI.Controllers
{
    [RoutePrefix("api/auth")]
    public class AuthController : ApiController
    {
        private DopaChatEntities db = new DopaChatEntities();
        Helper helper;

        public AuthController()
        {
            helper = new Helper();
        }

        [HttpPost]
        public IHttpActionResult AuthenticateUser([FromBody]LoginBody model)
        {
            var user = db.Users.FirstOrDefault(x => x.Nickname.ToLower() == model.Username.ToLower());

            if (user == null)
            {
                return NotFound();
            }

            string country = string.Empty;
            City city = db.Cities.FirstOrDefault(x => x.Id == user.CityId);

            if (city != null)
            {
                country = city.ISO2;
            }

            if (!user.Password.ToLower().Equals(model.Password.ToLower()))
            {
                return BadRequest();
            }

            return Ok(JObject.FromObject(new
            {
                id = user.Id,
                nickname = user.Nickname,
                firstName = user.FirstName,
                lastName = user.LastName,
                email = user.Email,
                description = user.Description,
                languages = user.Languages,
                password = user.Password,
                keywords = (helper.GetKeywords(user.Keywords.Split(',').ToList())),
                cityId = user.CityId,
                cityName = city.CityName,
                country = country,
                access_token = Guid.NewGuid().ToString("N")
            }));
        }
    }
}