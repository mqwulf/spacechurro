from gpiozero.pins.pigpio import PiGPIOFactory
from gpiozero import Servo
import geocoder
from skyfield.api import Topos, load, Star
from skyfield.data import hipparcos
from datetime import datetime, timezone
from skyfield.named_stars import named_star_dict
myFactory = PiGPIOFactory()

g = geocoder.ip('me')
latitude = g.latlng[0]
longitude = g.latlng[1]
print(f"Detected location: Latitude: {latitude}, Longitude: {longitude}")

planets = load('de421.bsp')
earth = planets['earth']
planet_names = {
    'moon' : 'moon',
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

object_data = {}

for planet_name, planet_key in planet_names.items():
    planet = planets[planet_key]
    astrometric = oberserver_location.at(t).observe(planet)
    alt, az, distance = astrometric.apparent().altaz()
    object_data[planet_name.lower()] = {'altitude': alt.degrees, 'azimuth': az.degrees}

sorted_df = df.sort_values(by="magnitude").head(100)

for index, row in sorted_df.iterrows():
    hip = index
    star = Star.from_dataframe(df.loc[hip])
    astrometric = oberserver_location.at(t).observe(star)
    alt, az, distance = astrometric.apparent().altaz()
    object_data[row['name'].lower()] = {'altitude': alt.degrees, 'azimuth': az.degrees}

def get_object_data(object_name):
    object_name = object_name.lower()
    if object_name in object_data:
        return object_data[object_name]
    else:
        return f"Object '{object_name}' not found in the data."



#Tuned values for the 3 servos on the arm 
baseServo = Servo(12, min_pulse_width = 0.5/1000, max_pulse_width = 2.5/1000, pin_factory = myFactory)
midServo = Servo(18, min_pulse_width = 1.2/1000, max_pulse_width = 2.28/1000, pin_factory = myFactory)
armServo = Servo(13, min_pulse_width = 0.9/1000, max_pulse_width = 2.2/1000, pin_factory = myFactory)

ARMBIAS = -40 #in degrees
BASEBIAS = 0
CONVERSION = 1/90

def findStar(object):
    print("Object: " + str(object))
    direction = ""
    
    object_info = get_object_data(object)
    if 'error' in object_info:
        return object_info['error']

    alt = object_info['altitude']
    az = object_info['azimuth']

    cords = {'altitude': alt, 'azimuth': az}

     
    direction = 0

    print("Azimuth " + str(cords['altitude']))
    print("Altitude " + str(cords['azimuth']))

    if (cords['azimuth'] < 90 or cords['azimuth'] > 270):
        direction = "Point North"
        if(cords['azimuth']>270):
            cords['azimuth'] = cords['azimuth'] - 360
            
    else:
        direction = "Point South"
        cords['azimuth'] = cords['azimuth'] - 180
    
    base = float(CONVERSION*-1*(cords['azimuth']+BASEBIAS))
    mid = float((CONVERSION*(cords['altitude']+ARMBIAS)))
    print("Base: " + str(base))
    print("Mid: " + str(mid))
    baseServo.value = base
    midServo.value = mid
    ##armServo.value = float(CONVERSION*inpu3)
    return direction

