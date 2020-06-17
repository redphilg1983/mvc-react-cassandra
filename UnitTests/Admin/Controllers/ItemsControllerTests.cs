using Admin.Controllers;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace UnitTests.Admin.Controllers
{
    [TestClass]
    public class ItemsControllerTests
    {
        [TestMethod]
        public void GetAll()
        {
            var controller = new ItemsController();
            var result = controller.GetAll();
            Assert.IsInstanceOfType(result, typeof(Microsoft.AspNetCore.Mvc.OkObjectResult));
        }

        [TestMethod]
        public void Delete()
        {
            var controller = new ItemsController();
            var result = controller.Delete("Star Trek");
            Assert.IsInstanceOfType(result, typeof(Microsoft.AspNetCore.Mvc.OkResult));
        }
    }
}
