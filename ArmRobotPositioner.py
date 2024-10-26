from gpiozero.pins.pigpio import PiGPIOFactory
myFactory = PiGPIOFactory()

from gpiozero import Servo


#Tuned values for the 3 servos on the arm 
baseServo = Servo(12, min_pulse_width = 0.5/1000, max_pulse_width = 2.5/1000, pin_factory = myFactory)
midServo = Servo(18, min_pulse_width = 1.2/1000, max_pulse_width = 2.28/1000, pin_factory = myFactory)
armServo = Servo(13, min_pulse_width = 0.9/1000, max_pulse_width = 2.2/1000, pin_factory = myFactory)

ARMBIAS = -45 #in degrees
CONVERSION = 1/90

while True:
    #Angle Input
    inpu1 = float(input("Azimuth: "))
    inpu2 = float(input("Altitude: "))
    inpu3 = float(input("End Angle: "))
    
    
    if (inpu1 < 90 or inpu1 > 270):
        print("Point North")
    else:
        print("Point South")
        inpu1 = -1 * inpu1 + 180
        
        
    baseServo.value = float(CONVERSION*inpu1)
    midServo.value = float((CONVERSION*(inpu2+ARMBIAS)))
    armServo.value = float(CONVERSION*inpu3)
