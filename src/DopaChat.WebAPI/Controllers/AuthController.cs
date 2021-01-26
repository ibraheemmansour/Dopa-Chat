using DopaChat.Data;
using DopaChat.WebAPI.Classes;
using Newtonsoft.Json.Linq;
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
                return Unauthorized();
            }

            return Ok(JObject.FromObject(new
            {
                user.Nickname,
                user.FirstName,
                user.LastName,
                user.Email,
                user.Description,
                user.Languages,
                user.Keywords,
                user.CityId
            }));
        }
    }
}