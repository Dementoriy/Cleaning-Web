using Microsoft.EntityFrameworkCore;
using CleaningDLL.Entity;
using System;

namespace CleaningDLL
{
    public class ApplicationContext : DbContext
    {
        public DbSet<AuthToken> AuthTokens { get; set; }
        public DbSet<Address> Address { get; set; }
        public DbSet<RoomType> RoomType { get; set; }
        public DbSet<Order> Order { get; set; }
        public DbSet<Brigade> Brigade { get; set; }
        public DbSet<Client> Client { get; set; }
        public DbSet<ClientAddresses> ClientAddresses { get; set; }
        public DbSet<Consumable> Consumable { get; set; }
        public DbSet<ConsumptionRate> ConsumptionRate { get; set; }
        public DbSet<Contract> Contract { get; set; }
        public DbSet<Delivery> Delivery { get; set; }
        public DbSet<DeliveryContent> DeliveryContent { get; set; }
        public DbSet<DeliveryContract> DeliveryContract { get; set; }
        public DbSet<Employee> Employee { get; set; }
        public DbSet<Inventory> Inventory { get; set; }
        public DbSet<InventoryType> InventoryType { get; set; }
        public DbSet<Position> Position { get; set; }
        public DbSet<ProvidedService> ProvidedService { get; set; }
        public DbSet<Provider> Provider { get; set; }
        public DbSet<PurchaseRequisition> PurchaseRequisition { get; set; }
        public DbSet<ReferenceUnitsOfMeasurement> ReferenceUnitsOfMeasurement { get; set; }
        public DbSet<RequisitionContent> RequisitionContent { get; set; }
        public DbSet<Service> Service { get; set; }
        public DbSet<BrigadeInventory> BrigadeInventory { get; set; }
        public DbSet<ConsumablesService> ConsumablesService { get; set; }
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
            Database.Migrate();
            Context.AddDb(this);
        }
        public static DbContextOptions<ApplicationContext> GetDb()
        {
            var optionsBuilder = new DbContextOptionsBuilder<ApplicationContext>();
            return optionsBuilder.UseNpgsql("Host=45.10.244.15;Port=55532;Database=work100004;Username=work100004;Password=IFNz81Glc|9b~JiPOviN").Options;
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
        }
    }
}
