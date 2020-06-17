using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cassandra;
using Cassandra.Mapping;
using film_tv_game.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Polly;

namespace Admin.Controllers
{
    [Route("api/filmtvgames")]
    public class ItemsController : Controller
    {
        private readonly Policy retryPolicy;
        private readonly Cluster cluster;

        public ItemsController()
        {
            retryPolicy = Policy.Handle<NoHostAvailableException>()
                .Retry();
            cluster = Cluster.Builder()
              .AddContactPoint("192.168.0.40")
              .WithReconnectionPolicy(new FixedReconnectionPolicy(400, 5000, 2 * 60000, 60 * 60000))
              .Build();
        }

        [HttpGet]
        public ActionResult GetAll()
        {
            using (cluster)
            {
                return retryPolicy.Execute(() =>
                {
                    using (var session = cluster.Connect("ekm"))
                    {
                        IMapper mapper = new Mapper(session);

                        IEnumerable<FilmTvGameModel> result = mapper.Fetch<FilmTvGameModel>();

                        session.Dispose();

                        return Ok(result);
                    }
                });
            }
        }

        [HttpDelete]
        public ActionResult Delete([FromBody] string title)
        {
            using (cluster)
            {
                return retryPolicy.Execute(() =>
                {
                    using (var session = cluster.Connect("ekm"))
                    {
                        IMapper mapper = new Mapper(session);

                        //IEnumerable<FilmTvGameModel> result = mapper.Fetch<FilmTvGameModel>();
                        mapper.Execute("DELETE FROM ekm.voting WHERE title = '" + title + "';");

                        session.Dispose();

                        return Ok();
                    }
                });
            }
        }
    }
}
