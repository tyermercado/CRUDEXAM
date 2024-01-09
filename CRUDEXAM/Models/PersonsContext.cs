using Microsoft.EntityFrameworkCore;

namespace CRUDEXAM.Models
{
    public class PersonsContext : DbContext
    {
        public PersonsContext(DbContextOptions<PersonsContext> options) :  base(options)
        {

        }
        public DbSet<Persons> Persons { get; set; }
    }
}
