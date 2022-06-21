speedFactor = 55
pin_L = DigitalPin.P1
pin_R = DigitalPin.P13
whiteline = 1
connected = 0
radio.set_group(77)
strip = neopixel.create(DigitalPin.P16, 4, NeoPixelMode.RGB)
pins.set_pull(pin_L, PinPullMode.PULL_NONE)
pins.set_pull(pin_R, PinPullMode.PULL_NONE)
basic.show_string("S")
radio.set_group(77)
# temporary code
#motor_run(100, 100); basic.pause(2000)
#motor_run(); basic.pause(300)
#motor_run(-100, -100, 70); basic.pause(2000)
#motor_run()
autonomni = True
turn = False
left = False
rovne = True
prava = False
def motor_run(left = 0, right = 0, speed_factor = 80):
    PCAmotor.motor_run(PCAmotor.Motors.M1, Math.map(Math.constrain(left * (speedFactor / 100), -100, 100), -100, 100, -255, 255))
    PCAmotor.motor_run(PCAmotor.Motors.M4, Math.map(Math.constrain(-1 * right * (speedFactor / 100), -100, 100), -100, 100, -255, 255))
ignore = False
okoli = 1
linie = 0
posledni = 0

def on_received_number(receivedNumber):
    global rovne, left, prava
    if receivedNumber == 1:
        rovne = True
        left = False
        prava = False
    elif receivedNumber == 2:
        rovne = False
        left = False
        prava = True
    elif receivedNumber == 3:
        rovne = False
        left = True
        prava = False
radio.on_received_number(on_received_number)

def on_forever():
    global ignore, linie, okoli, rovne, left, prava, turn, posledni
    l = False if (whiteline ^ pins.digital_read_pin(pin_L)) == 0 else True
    r = False if (whiteline ^ pins.digital_read_pin(pin_R)) == 0 else True
    if autonomni:
        
        if rovne:
            if pins.digital_read_pin(pin_L) == okoli and pins.digital_read_pin(pin_R) == okoli:
                motor_run(80, 80)
            elif pins.digital_read_pin(pin_L) == linie and pins.digital_read_pin(pin_R) == linie:
                motor_run(-80, -80)
            elif pins.digital_read_pin(pin_L) == linie and pins.digital_read_pin(pin_R) == okoli:
                motor_run(0, -80)
                posledni = 0
            elif pins.digital_read_pin(pin_L) == okoli and pins.digital_read_pin(pin_R) == linie:
                motor_run(-80, 0)
                

            basic.pause(50)
        elif prava:
            
            if pins.digital_read_pin(pin_L) == linie and pins.digital_read_pin(pin_R) == linie:
                motor_run(-80, 0)
            elif pins.digital_read_pin(pin_L) == okoli and pins.digital_read_pin(pin_R) == okoli:
                motor_run(0, -80)



            basic.pause(50)
        elif left:
                        
            if pins.digital_read_pin(pin_L) == okoli and pins.digital_read_pin(pin_R) == okoli:
                motor_run(-80, 0)
            elif pins.digital_read_pin(pin_L) == linie and pins.digital_read_pin(pin_R) == linie:
                motor_run(0, -80)
            
            basic.pause(50)
        
basic.forever(on_forever)




