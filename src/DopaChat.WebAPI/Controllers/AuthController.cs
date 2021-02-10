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

        [HttpPost]
        public IHttpActionResult AuthenticateUser([FromBody]LoginBody model)
        {
            var user = db.Users.FirstOrDefault(x => x.Nickname.ToLower() == model.Username.ToLower());

            if (user == null)
            {
                return NotFound();
            }

            if (!user.Password.ToLower().Equals(model.Password.ToLower()))
            {
                return BadRequest();
            }

            return Ok(JObject.FromObject(new
            {
                nickname = user.Nickname,
                firstName = user.FirstName,
                lastName = user.LastName,
                email = user.Email,
                description = user.Description,
                language = user.Languages,
                keywords = user.Keywords,
                city = user.CityId,
                access_token = Guid.NewGuid().ToString("N")
            }));
        }
    }
}