let speedFactor = 55
let pin_L = DigitalPin.P1
let pin_R = DigitalPin.P13
let whiteline = 1
let connected = 0
radio.setGroup(77)
let strip = neopixel.create(DigitalPin.P16, 4, NeoPixelMode.RGB)
pins.setPull(pin_L, PinPullMode.PullNone)
pins.setPull(pin_R, PinPullMode.PullNone)
basic.showString("S")
radio.setGroup(77)
//  temporary code
// motor_run(100, 100); basic.pause(2000)
// motor_run(); basic.pause(300)
// motor_run(-100, -100, 70); basic.pause(2000)
// motor_run()
let autonomni = true
let turn = false
let left = false
let rovne = true
let prava = false
function motor_run(left: number = 0, right: number = 0, speed_factor: number = 80) {
    PCAmotor.MotorRun(PCAmotor.Motors.M1, Math.map(Math.constrain(left * (speedFactor / 100), -100, 100), -100, 100, -255, 255))
    PCAmotor.MotorRun(PCAmotor.Motors.M4, Math.map(Math.constrain(-1 * right * (speedFactor / 100), -100, 100), -100, 100, -255, 255))
}

let ignore = false
let okoli = 1
let linie = 0
let posledni = 0
radio.onReceivedNumber(function on_received_number(receivedNumber: number) {
    
    if (receivedNumber == 1) {
        rovne = true
        left = false
        prava = false
    } else if (receivedNumber == 2) {
        rovne = false
        left = false
        prava = true
    } else if (receivedNumber == 3) {
        rovne = false
        left = true
        prava = false
    }
    
})
basic.forever(function on_forever() {
    
    let l = (whiteline ^ pins.digitalReadPin(pin_L)) == 0 ? false : true
    let r = (whiteline ^ pins.digitalReadPin(pin_R)) == 0 ? false : true
    if (autonomni) {
        if (rovne) {
            if (pins.digitalReadPin(pin_L) == okoli && pins.digitalReadPin(pin_R) == okoli) {
                motor_run(80, 80)
            } else if (pins.digitalReadPin(pin_L) == linie && pins.digitalReadPin(pin_R) == linie) {
                motor_run(-80, -80)
            } else if (pins.digitalReadPin(pin_L) == linie && pins.digitalReadPin(pin_R) == okoli) {
                motor_run(0, -80)
                posledni = 0
            } else if (pins.digitalReadPin(pin_L) == okoli && pins.digitalReadPin(pin_R) == linie) {
                motor_run(-80, 0)
            }
            
            basic.pause(50)
        } else if (prava) {
            if (pins.digitalReadPin(pin_L) == linie && pins.digitalReadPin(pin_R) == linie) {
                motor_run(-80, 0)
            } else if (pins.digitalReadPin(pin_L) == okoli && pins.digitalReadPin(pin_R) == okoli) {
                motor_run(0, -80)
            }
            
            basic.pause(50)
        } else if (left) {
            if (pins.digitalReadPin(pin_L) == okoli && pins.digitalReadPin(pin_R) == okoli) {
                motor_run(-80, 0)
            } else if (pins.digitalReadPin(pin_L) == linie && pins.digitalReadPin(pin_R) == linie) {
                motor_run(0, -80)
            }
            
            basic.pause(50)
        }
        
    }
    
})
