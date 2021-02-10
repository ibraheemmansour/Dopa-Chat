using Newtonsoft.Json;

namespace DopaChat.WebAPI.Classes
{
    public static class ErrorResponseHelper
    {
        #region AuthController
        public static string UserNotFound = JsonConvert.SerializeObject(new { code = 1000, error = "UserNotFound", description = "The user entered is not found." });
        public static string InvalidPassword = JsonConvert.SerializeObject(new { code = 1001, error = "InvalidPassword", description = "The password entered is incorrect." });
        #endregion
    }
}