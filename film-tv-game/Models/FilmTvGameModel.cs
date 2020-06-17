using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Cassandra.Mapping.Attributes;

namespace film_tv_game.Models
{
    [Table("ekm.voting")]
    public class FilmTvGameModel
    {
        public string Title { get; set; }

        public string Genre { get; set; }

        public int Votes { get; set; }
    }
}
