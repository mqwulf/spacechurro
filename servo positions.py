from gpiozero.pins.pigpio import PiGPIOFactory
myFactory = PiGPIOFactory()

from gpiozero import Servo

baseServo = Servo(12, min_pulse_width = 0.5/1000, max_pulse_width = 2.5/1000, pin_factory = myFactory)
midServo = Servo(18, min_pulse_width = 1.2/1000, max_pulse_width = 2.5/1000, pin_factory = myFactory)
armServo = Servo(13, min_pulse_width = 0.9/1000, max_pulse_width = 2.2/1000, pin_factory = myFactory)

while True:
    inpu1 = input("Angle1: ")
    inpu2 = input("Angle2: ")
    inpu3 = input("Angle3: ")
    baseServo.value = float(inpu1)
    midServo.value = float(inpu2)
    armServo.value = float(inpu3)