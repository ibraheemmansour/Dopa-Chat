using AutoMapper;
using DopaChat.Data;
using DopaChat.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace DopaChat.WebAPI.Controllers
{
    [RoutePrefix("api/user")]
    public class UserController : ApiController
    {
        private DopaChatEntities db = new DopaChatEntities();

        public IList<UserDto> GetUsers()
        {
            return Mapper.Map<List<User>, List<UserDto>>(db.Users.ToList());
        }

        [HttpGet]
        [Route("{id}")]
        public IHttpActionResult GetUser(string id)
        {
            User user = db.Users.Find(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(Mapper.Map<User, UserDto>(user));
        }

        public IHttpActionResult PostUser([FromBody] UserDto userDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                User user = Mapper.Map<UserDto, User>(userDto);

                db.Users.Add(user);
                db.SaveChanges();

                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Route("{username}")]
        public IHttpActionResult PutUser(string username, [FromBody] UserDto userDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            User user = db.Users.Find(username);

            if (user == null)
            {
                return NotFound();
            }

            user.FirstName = userDto.FirstName;
            user.LastName = userDto.LastName;
            user.Nickname = userDto.Nickname;
            user.Email = userDto.Email;
            user.Description = userDto.Description;
            user.Keywords = userDto.Keywords;
            user.Languages = userDto.Languages;

            db.SaveChanges();

            return Ok(user);
        }

        public IHttpActionResult DeleteUser(string username)
        {
            User user = db.Users.Find(username);

            if (user == null)
            {
                return NotFound();
            }

            db.Users.Remove(user);
            db.SaveChanges();

            return Ok();
        }
    }
}