using AutoMapper;
using DopaChat.Data;
using DopaChat.Models;
using DopaChat.WebAPI.Classes;
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
        Helper helper;

        public UserController()
        {
            helper = new Helper();
        }

        public IList<UserDto> GetUsers()
        {
            return Mapper.Map<List<User>, List<UserDto>>(db.Users.ToList());
        }

        [HttpGet]
        [Route("{nickname}")]
        public IHttpActionResult GetUser(string nickname)
        {
            User user = db.Users.FirstOrDefault(x=> x.Nickname == nickname);

            if (user == null)
            {
                return NotFound();
            }

            var keywordsDict = helper.GetKeywords(user.Keywords.Split(',').ToList());
            string keywords = string.Empty; 
            foreach (var kvp in keywordsDict)
            {
                keywords += (kvp.Value + ",");
            }
            user.Keywords = keywords.Remove(keywords.Length - 1, 1);

            return Ok(Mapper.Map<User, UserDto>(user));
        }

        [HttpPost]
        [Route("search")]
        public IList<UserDto> SearchUsers([FromBody] SearchQuery body)
        {
            List<User> users = new List<User>();

            db.Users.ToList().ForEach(user =>
            {
                var found = user.Keywords.Split(',').FirstOrDefault(x => body.Keywords.Select(k => k.Id).Contains(x));
                if (!string.IsNullOrEmpty(found) && !users.Any(x => x.Id == user.Id) && user.Id != body.Id)
                {
                    var city = db.Cities.FirstOrDefault(x => x.Id == user.CityId);

                    if (city != null)
                    {
                        user.Country = city.ISO2;
                    }

                    List<string> keywords = new List<string>();
                    user.Keywords.Split(',').ToList().ForEach(id => {
                        var keyword = db.Keywords.FirstOrDefault(k => k.Id == id);
                        if (keyword != null)
                        {
                            keywords.Add(keyword.Title);
                        }
                    });
                    user.Keywords = string.Join(",", keywords);
                    users.Add(user);
                }
            });

            if (body.showLocation)
            {
                users.AddRange(db.Users.Where(x => x.CityId == body.City && x.Id != body.Id).ToList());
            }

            return Mapper.Map<List<User>, List<UserDto>>(users.ToList());
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
        [Route("{nickname}")]
        public IHttpActionResult PutUser(string nickname, [FromBody] UserDto userDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            User user = db.Users.FirstOrDefault(x=> x.Nickname == nickname);

            if (user == null)
            {
                return NotFound();
            }

            user.FirstName = userDto.FirstName;
            user.LastName = userDto.LastName;
            user.Nickname = userDto.Nickname;
            //user.Email = userDto.Email;
            user.Description = userDto.Description;
            user.Keywords = userDto.Keywords;
            user.Languages = userDto.Languages;
            user.Country = userDto.Country;
            user.CityId = userDto.CityId;

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