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

namespace filmtvgames.Controllers
{
    [Route("api/filmtvgames")]
    public class FilmTVGames : Controller
    {
        private readonly Policy retryPolicy;
        private readonly Cluster cluster;

        public FilmTVGames()
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

                        IEnumerable<FilmTvGame> result = mapper.Fetch<FilmTvGame>();

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

                        IEnumerable<FilmTvGame> result = mapper.Fetch<FilmTvGame>("SELECT * FROM voting WHERE genre = '" + genre + "' ALLOW FILTERING;");

                        session.Dispose();

                        return Ok(result);
                    }
                });
            }
        }
    }
}
