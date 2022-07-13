let seconds = 60;
let minutes = 25;
let timer;
let stageControl = 0; //control cicle execution
let studyTime = true; //state timer study
let breakTime = false; //state timer break
let statePointer = document.querySelectorAll(".pointer");
let som = document.querySelector('audio');
let running = false;


function start() {
    if (studyTime == true) {
        cron('study');
        running = true

    } else if (breakTime == true) {
        cron('coffe')
        running = true


    }
}

function cron(control) {
    if (minutes == 0 && seconds == 0) {
        switch (control) {
            case 'study':
                console.log("Hora de estudar")
                minutes = 25
                document.querySelector('.pomodoro .state .state-1').classList.add('active');
                document.querySelector('.pomodoro .state .state-2').classList.remove('active');
                document.querySelector('.pomodoro .state .state-3').classList.remove('active');
                break;
            case 'coffe':
                console.log("Bora parar")
                if (stageControl !== 3) {
                    minutes = 5;
                    document.querySelector('.pomodoro .state .state-1').classList.remove('active');
                    document.querySelector('.pomodoro .state .state-2').classList.add('active');
                    document.querySelector('.pomodoro .state .state-3').classList.remove('active');
                } else {
                    minutes = 15
                    document.querySelector('.pomodoro .state .state-1').classList.remove('active');
                    document.querySelector('.pomodoro .state .state-2').classList.remove('active');
                    document.querySelector('.pomodoro .state .state-3').classList.add('active');
                }


                stageControl++;
                break;
        }
    }

    if (running == false) {
        timer = setInterval(() => {
                if (seconds != 0) {
                    seconds--
                } else if (seconds == 0) {
                    minutes--;
                    seconds = 60;
                }

                if (minutes == 0 && seconds == 0) {
                    clearInterval(timer)
                    running = false
                    som.play();
                    if (studyTime == true) {
                        studyTime = false;
                        breakTime = true;
                        controls(0)
                    } else if (breakTime == true) {
                        studyTime = true;
                        breakTime == false;
                        controls(1)
                    }
                    if (stageControl !== 4) {
                        //if you want auto start
                        //start()
                    } else {
                        reset()
                    }



                }
                document.querySelector(".pomodoro .time").innerHTML = `${fixZero(minutes)}:${fixZero(seconds)}`;
            }, 5


        )
    }


}
//Function control the pointers 
function controls(i) {
    if (i == 0) {
        let el = document.querySelector(".pointer.green-animated");
        el.classList.remove("green-animated");
        el.classList.add("green")
    } else {
        let point = document.querySelectorAll(".pointer.green");
        let pointEl = point[point.length - 1]

        if (pointEl !== null) {
            if (pointEl.nextElementSibling !== null) {
                pointEl.nextElementSibling.classList.add("green-animated")
            }


        }
    }


}

function fixZero(N) {
    return N < 10 ? `0${N}` : N;
}

function stop() {
    clearInterval(timer);
    running = false

}

function reset() {
    running = false
    clearInterval(timer)
    document.querySelector('.pomodoro .state .state-1').classList.add('active');
    document.querySelector('.pomodoro .state .state-2').classList.remove('active');
    document.querySelector('.pomodoro .state .state-3').classList.remove('active');
    minutes = 0;
    seconds = 0;
    stageControl = 0;
    document.querySelector(".pomodoro .time").innerHTML = `${fixZero(minutes)}:${fixZero(seconds)}`;
    for (let i in statePointer) {
        statePointer[i].classList.remove('green');
        statePointer[i].classList.remove('green-animated');
        statePointer[0].classList.add('green-animated')
    }
}