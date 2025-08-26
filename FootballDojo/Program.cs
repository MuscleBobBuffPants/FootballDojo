using FootballDojo.Client;
using FootballDojo.Services;
using Microsoft.Extensions.DependencyInjection;
using System.Net.Http;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register IHttpClientFactory
builder.Services.AddHttpClient();

// Register FootballDojo Client & Services
builder.Services.AddScoped<FootballDojoClient>(sp =>
{
    var httpClientFactory = sp.GetRequiredService<IHttpClientFactory>();
    var apiHost = Environment.GetEnvironmentVariable("FOOTBALLDOJO_API_HOST");
    var apiKey = Environment.GetEnvironmentVariable("FOOTBALLDOJO_API_KEY");

    return new FootballDojoClient(httpClientFactory, apiHost, apiKey);
});
builder.Services.AddScoped<IPlayersService, PlayersService>();
builder.Services.AddScoped<ITeamsService, TeamsService>();
builder.Services.AddScoped<IFixturesService, FixturesService>();
builder.Services.AddScoped<IStatsService, StatsService>();
builder.Services.AddScoped<IStandingsService, StandingsService>();
builder.Services.AddScoped<IVenuesService, VenuesService>();

// Enable CORS
var corsPolicy = "AllowReactDev";
builder.Services.AddCors(options =>
{
    options.AddPolicy(corsPolicy, policy =>
    {
        policy.WithOrigins(
            "http://localhost:5174",
            "http://localhost:5173",
            "https://FootballDojo.azurewebsites.net") // Add Azure URL
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseDefaultFiles();  // serves index.html
app.UseStaticFiles();   // serves everything in wwwroot

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors(corsPolicy);

app.MapControllers();

app.MapFallbackToFile("index.html");

app.Run();