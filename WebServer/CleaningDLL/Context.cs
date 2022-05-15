using Npgsql;

namespace CleaningDLL
{
    public class Context
    {
        public static ApplicationContext Db { get; private set; }
        public static NpgsqlConnection npgsql { get; private set; }
        public Context(ApplicationContext applicationContext)
        {
            Db = applicationContext;
            npgsql = new NpgsqlConnection(ApplicationContext.ConnectionString);
            npgsql.Open();
        }
    }
}
