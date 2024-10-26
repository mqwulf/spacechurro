import geocoder
from skyfield.api import Topos, load, Star
from skyfield.data import hipparcos
from datetime import datetime, timezone
from skyfield.named_stars import named_star_dict

g = geocoder.ip('me')
latitude = g.latlng[0]
longitude = g.latlng[1]
print(f"Detected location: Latitude: {latitude}, Longitude: {longitude}")

planets = load('de421.bsp')
earth = planets['earth']
planet_names = {
    'sun': 'sun',
    'mercury': 'mercury',
    'venus': 'venus',
    'mars': 'mars',
    'jupiter': 'jupiter barycenter',  
    'saturn': 'saturn barycenter',    
    'uranus': 'uranus barycenter',    
    'neptune': 'neptune barycenter', 
}

with load.open(hipparcos.URL) as f:
    df = hipparcos.load_dataframe(f)
hip_to_name = {v: k for k, v in named_star_dict.items()}
def get_star_name(hip):
    return hip_to_name.get(hip, f"HIP{hip}")
df["name"] = df.index.map(get_star_name)

oberserver_location = earth + Topos(latitude_degrees=latitude, longitude_degrees=longitude)
utc_datetime = datetime.now(timezone.utc)

ts = load.timescale()
t = ts.from_datetime(utc_datetime)
print("\nPlanet Data:")
for planet_name, planet_key in planet_names.items():
    planet = planets[planet_key]
    astrometric = oberserver_location.at(t).observe(planet)
    alt, az, distance = astrometric.apparent().altaz()
    print(f"Planet Name: {planet_name}: Altitude: {alt.degrees:.2f}°, Azimuth: {az.degrees:.2f}°, Distance: {distance.km:.2f} km")

print("\nStar Data:")
sorted_df = df.sort_values(by="magnitude").head(100)
for index, row in sorted_df.iterrows():
    hip = index
    star = Star.from_dataframe(df.loc[hip])
    astrometric = oberserver_location.at(t).observe(star)
    alt, az, distance = astrometric.apparent().altaz()
    print(f"Star Name: {row['name']}, Magnitude: {row['magnitude']}, Altitude: {alt.degrees:.2f}°, Azimuth: {az.degrees:.2f}°, Distance: {distance.km:.2f} km")
