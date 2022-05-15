using Microsoft.EntityFrameworkCore;
using CleaningDLL.Entity;
using System;

namespace CleaningDLL
{
    public class ApplicationContext : DbContext
    {
        public DbSet<AuthToken> AuthTokens { get; set; } = null!;
        public DbSet<Address> Address { get; set; } = null!;
        public DbSet<RoomType> RoomType { get; set; } = null!;
        public DbSet<Order> Order { get; set; } = null!;
        public DbSet<Brigade> Brigade { get; set; } = null!;
        public DbSet<Client> Client { get; set; } = null!;
        public DbSet<ClientAddresses> ClientAddresses { get; set; } = null!;
        public DbSet<Consumable> Consumable { get; set; } = null!;
        public DbSet<ConsumptionRate> ConsumptionRate { get; set; } = null!;
        public DbSet<Contract> Contract { get; set; } = null!;
        public DbSet<Delivery> Delivery { get; set; } = null!;
        public DbSet<DeliveryContent> DeliveryContent { get; set; } = null!;
        public DbSet<DeliveryContract> DeliveryContract { get; set; } = null!;
        public DbSet<Employee> Employee { get; set; } = null!;
        public DbSet<Inventory> Inventory { get; set; } = null!;
        public DbSet<InventoryType> InventoryType { get; set; } = null!;
        public DbSet<Position> Position { get; set; } = null!;
        public DbSet<ProvidedService> ProvidedService { get; set; } = null!;
        public DbSet<Provider> Provider { get; set; } = null!;
        public DbSet<PurchaseRequisition> PurchaseRequisition { get; set; } = null!;
        public DbSet<ReferenceUnitsOfMeasurement> ReferenceUnitsOfMeasurement { get; set; } = null!;
        public DbSet<RequisitionContent> RequisitionContent { get; set; } = null!;
        public DbSet<Service> Service { get; set; } = null!; 
        public DbSet<BrigadeInventory> BrigadeInventory { get; set; } = null!;
        public DbSet<ConsumablesService> ConsumablesService { get; set; } = null!;
        public DbSet<Status> Status { get; set; } = null!;
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
            Database.Migrate();
            new Context(this);
        }
        public static string ConnectionString = "Host=45.10.244.15;Port=55532;Database=work100004;Username=work100004;Password=IFNz81Glc|9b~JiPOviN";
        public static DbContextOptions<ApplicationContext> GetDb()
        {
            var optionsBuilder = new DbContextOptionsBuilder<ApplicationContext>();
            return optionsBuilder.UseNpgsql(ConnectionString).Options;
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Ignore<Human>();
            modelBuilder.Entity<Employee>().HasIndex(s => s.PhoneNumber).IsUnique();
            modelBuilder.Entity<Employee>().HasIndex(s => s.PassportData).IsUnique();
            modelBuilder.Entity<Client>().HasIndex(s => s.PhoneNumber).IsUnique();
            modelBuilder.Entity<Provider>().HasIndex(s => s.CompanyName).IsUnique();
            modelBuilder.Entity<Provider>().HasIndex(s => s.ProviderTelefonNumber).IsUnique();
            modelBuilder.Entity<ReferenceUnitsOfMeasurement>().HasIndex(s => s.Unit).IsUnique();
            modelBuilder.Entity<Consumable>().HasIndex(s => s.ConsumableName).IsUnique();
            modelBuilder.Entity<Employee>().HasIndex(s => s.Login).IsUnique();
            modelBuilder.Entity<Employee>().HasIndex(s => s.Password).IsUnique();

            modelBuilder.Entity<Position>(EntityConfigure.PositionConfigure);
            modelBuilder.Entity<Brigade>(EntityConfigure.BrigadeConfigure);
            modelBuilder.Entity<Employee>(EntityConfigure.EmployeeConfigure);
            modelBuilder.Entity<InventoryType>(EntityConfigure.InventoryTypeConfigure);
            modelBuilder.Entity<Service>(EntityConfigure.ServiceConfigure);
            modelBuilder.Entity<ReferenceUnitsOfMeasurement>(EntityConfigure.ReferenceUnitsOfMeasurementConfigure);
            modelBuilder.Entity<RoomType>(EntityConfigure.RoomTypeConfigure);
        }
    }
}
