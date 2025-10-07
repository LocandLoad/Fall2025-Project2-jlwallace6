var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
var googleApiKey = builder.Configuration["SE:KEY"];
var googleSEID = builder.Configuration["SE:ID"];

builder.Services.AddSingleton(new MyApiConfig { GoogleApiKey = googleApiKey , GoogleSEID = googleSEID});

builder.Services.AddControllers();
builder.Services.AddHttpClient();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseDefaultFiles();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapStaticAssets();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}")
    .WithStaticAssets();


app.Run();



public class MyApiConfig
{
    public string GoogleApiKey { get; set; } = string.Empty;
    public string GoogleSEID { get; set; } = string.Empty;
}