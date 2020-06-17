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

namespace film_tv_game.Controllers
{
    [Route("api/filmtvgames")]
    public class FilmTVGameControllers : Controller
    {
        private readonly Policy retryPolicy;
        private readonly Cluster cluster;

        public FilmTVGameControllers()
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

        [HttpGet("{Genre}")]
        public ActionResult GetGenre(string genre)
        {
            using (cluster)
            {
                return retryPolicy.Execute(() =>
                {
                    using (var session = cluster.Connect("ekm"))
                    {
                        IMapper mapper = new Mapper(session);

                        IEnumerable<FilmTvGameModel> result = mapper.Fetch<FilmTvGameModel>("SELECT * FROM voting WHERE genre = '" + genre + "' ALLOW FILTERING;");

                        session.Dispose();

                        return Ok(result);
                    }
                });
            }
        }

        [HttpPost]
        public ActionResult PostNewItem ([FromBody] string data)
        {
            using (cluster)
            {
                return retryPolicy.Execute(() =>
                {
                    using (var session = cluster.Connect("ekm"))
                    {
                        IMapper mapper = new Mapper(session);

                        var array = data.Split(",");
                        var title = array[0];
                        var genre = array[1];

                        FilmTvGameModel item = new FilmTvGameModel
                        {
                            Title = title,
                            Genre = genre,
                            Votes = 1
                        };

                        mapper.Insert(item);

                        session.Dispose();

                        return Ok();
                    }
                });
            }
        }
    }
}
