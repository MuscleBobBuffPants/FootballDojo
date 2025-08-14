using FootballDojo.Client;
using FootballDojo.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register IHttpClientFactory
builder.Services.AddHttpClient();

// Register FootballDojo Client & Services
builder.Services.AddScoped<FootballDojoClient>();
builder.Services.AddScoped<IPlayersService, PlayersService>();
builder.Services.AddScoped<ITeamsService, TeamsService>();
builder.Services.AddScoped<IFixturesService, FixturesService>();
builder.Services.AddScoped<IStatsService, StatsService>();
builder.Services.AddScoped<IStandingsService, StandingsService>();

// Enable CORS
var corsPolicy = "AllowReactDev";
builder.Services.AddCors(options =>
{
    options.AddPolicy(corsPolicy, policy =>
    {
        policy.WithOrigins("http://localhost:5174",
                           "http://localhost:5173") // React dev server URLs
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

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

app.Run();