import geocoder
from skyfield.api import Topos, load
from datetime import datetime, timezone

g = geocoder.ip('me')
latitude = g.latlng[0]
longitude = g.latlng[1]
print(f"Detected location: Latitude: {latitude}, Longitude: {longitude}")

planets = load('de421.bsp')
earth = planets['earth']
mars = planets['mars']
sun = planets['sun']

oberserver_location = earth + Topos(latitude_degrees=latitude, longitude_degrees=longitude)

utc_datetime = datetime.now(timezone.utc)

ts = load.timescale()
t = ts.from_datetime(utc_datetime)
astrometric = oberserver_location.at(t).observe(sun)
alt, az, distance = astrometric.apparent().altaz()
print(f"Altitude: {alt.degrees:.2f}°, Azimuth: {az.degrees:.2f}°, Distance: {distance.km:.2f} km")
