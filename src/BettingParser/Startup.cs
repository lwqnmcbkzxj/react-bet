using System;
using System.Net.Http;
using System.Text.Json;
using BettingParser.Abstractions;
using BettingParser.Configurations;
using BettingParser.Exceptions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using BettingParser.Factories;
using BettingParser.NewtonsoftJson;
using BettingParser.Services;
using Hellang.Middleware.ProblemDetails;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Serialization;

namespace BettingParser
{
    public class Startup
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _environment;

        public Startup(IConfiguration configuration, IWebHostEnvironment environment)
        {
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
            _environment = environment ?? throw new ArgumentNullException(nameof(environment));
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddHttpClient<INetClientFactory, NetClientFactory>(client =>
            {
                client.BaseAddress = new Uri("https://vprognoze.ru");
            });

            services.AddScoped<IParseService, ParseService>();
            services.Configure<NetClientOptions>(_configuration.GetSection("NetClient"));
            services.AddSingleton(provider => provider.GetRequiredService<IOptions<NetClientOptions>>().Value);

            services.AddProblemDetails(configure: options =>
            {
                options.IncludeExceptionDetails = (ctx, ex) => _environment.IsDevelopment();

                options.MapToStatusCode<ParserException>(StatusCodes.Status500InternalServerError);

                // This will map NotImplementedException to the 501 Not Implemented status code.
                options.MapToStatusCode<NotImplementedException>(statusCode: StatusCodes.Status501NotImplemented);

                // This will map HttpRequestException to the 503 Service Unavailable status code.
                options.MapToStatusCode<HttpRequestException>(statusCode: StatusCodes.Status503ServiceUnavailable);

                // Because exceptions are handled polymorphically, this will act as a "catch all" mapping, which is why it's added last.
                // If an exception other than NotImplementedException and HttpRequestException is thrown, this will handle it.
                options.MapToStatusCode<Exception>(statusCode: StatusCodes.Status500InternalServerError);
            });

            services.AddControllers().AddJsonOptions(
                options =>
                {
                    options.JsonSerializerOptions.PropertyNamingPolicy =
                        SnakeCaseNamingPolicy.SnakeCase;
                });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            });
            app.UseAuthentication();

            app.UseRouting();
            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}