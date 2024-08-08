using CapaDatos;
using CapaLogica.Interfaces;
using CapaLogica.Services;

namespace CapaPresentacion
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddSqlServer<FinalP2Context>(builder.Configuration.GetConnectionString("AppConnection"));
            builder.Services.AddScoped<IPacientes, PacienteServices>();
            builder.Services.AddScoped<IDoctores, DoctorServices>();
            builder.Services.AddScoped<ILogin, LoginServices>();
            builder.Services.AddScoped<IEspecialidades, EspecialidadServices>();
            builder.Services.AddScoped<ICitas, CitasServices>();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseCors(policy => policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
