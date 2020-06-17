using film_tv_game.Controllers;
using film_tv_game.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;
using System.Collections.Generic;
using System.Text;

namespace UnitTests.film_tv_game.Controllers
{
    [TestClass]
    public class FilmTCGamesControllerTests
    {
        [TestMethod]
        public void GetAll()
        {
            var controller = new FilmTVGameControllers();
            var result = controller.GetAll();
            Assert.IsInstanceOfType(result, typeof(Microsoft.AspNetCore.Mvc.OkObjectResult));
        }

        [TestMethod]
        public void GetGenre()
        {
            var controller = new FilmTVGameControllers();
            var result = controller.GetGenre("Film");
            Assert.IsInstanceOfType(result, typeof(Microsoft.AspNetCore.Mvc.OkObjectResult));
        }

        [TestMethod]
        public void PostNewItem()
        {
            var controller = new FilmTVGameControllers();
            var result = controller.PostNewItem("Star Trek, Film, 1");
            Assert.IsInstanceOfType(result, typeof(Microsoft.AspNetCore.Mvc.OkResult));
        }
    }
}
