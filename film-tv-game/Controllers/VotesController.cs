using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cassandra;
using Cassandra.Mapping;
using film_tv_game.Models;
using Microsoft.AspNetCore.Mvc;
using Polly;

namespace film_tv_game.Controllers
{
    [Route("api/votes")]
    public class VotesController : Controller
    {
        private readonly Policy retryPolicy;
        private readonly Cluster cluster;

        public VotesController()
        {
            retryPolicy = Policy.Handle<NoHostAvailableException>()
                .Retry();
            cluster = Cluster.Builder()
              .AddContactPoint("192.168.0.40")
              .WithReconnectionPolicy(new FixedReconnectionPolicy(400, 5000, 2 * 60000, 60 * 60000))
              .Build();
        }

        [HttpPut]
        public ActionResult UpdateVotes([FromBody] string titleAndVote)
        {
            using (cluster)
            {
                return retryPolicy.Execute(() =>
                {
                    using (var session = cluster.Connect("ekm"))
                    {
                        IMapper mapper = new Mapper(session);

                        var array = titleAndVote.Split(",");

                        string title = array[0].ToString();
                        int vote = Int32.Parse(array[2]) + 1;

                        mapper.Execute("UPDATE ekm.voting SET votes = " + vote + " WHERE title = '" + title + "' IF EXISTS;");

                        session.Dispose();

                        return Ok();
                    }
                });
            }
        }
    }
}
