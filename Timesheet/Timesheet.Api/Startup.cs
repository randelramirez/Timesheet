using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Timesheet.Api.Services;
using Timesheet.Infrastructure.Persistence;

namespace Timesheet.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        private const string specificOrigins = "LOCALHOST";

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var contextAssembly = typeof(TimesheetContext).GetTypeInfo().Assembly.GetName().Name;
            services.AddDbContextPool<TimesheetContext>(options => {
                options.UseSqlServer(Configuration.GetConnectionString(nameof(TimesheetContext)),  b => b.MigrationsAssembly(contextAssembly));
                //options.UseSqlServer(connection, b => b.MigrationsAssembly("Project.Api"))
                }
                );
            services.AddScoped<TaskService>();
            services.AddScoped<TimecardService>();

            services.AddCors(options =>
            {
                options.AddPolicy(name: specificOrigins,
                        builder =>
                        {   builder.WithOrigins("https://localhost", "http://localhost:3000")
                                .WithHeaders("Content-Type");
                        });
            });
            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.SeedDataTimesheetContext();
            }

            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseCors(specificOrigins);

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    
    }
}
