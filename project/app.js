let timerH = document.querySelector('body div.stopwatch div div:nth-child(1) p')
let timerM = document.querySelector('body div.stopwatch div div:nth-child(3) p')
let timerS = document.querySelector('body div.stopwatch div div:nth-child(5) p')
let timerMS = document.querySelector('body div.stopwatch div div:nth-child(7) p')
let rotationLine = document.querySelector('div.line')
let buttonStart = document.querySelector('div.controls div i.icon-clock')
let buttonStop = document.querySelector('div.controls div i.icon-ccw')
let state = 0
let time = ['0','0','0','0']
let Interval = 1000 / 60
let WatchSys

function timerStart()
{
    function Sys()
    {
        WatchSys = setInterval(() =>
        {
            time[3] = parseInt(time[3]) + 1
            if(parseInt(time[3]) >= 60)
            {
                time[2] = parseInt(time[2]) + 1
                time[3] = 0
            }
            if(parseInt(time[2]) >= 60)
            {
                time[1] = parseInt(time[1]) + 1
                time[2] = 0
            }
            if(parseInt(time[1]) >= 60)
            {
                time[0] = parseInt(time[0]) + 1
                time[1] = 0
            }
            if(time[0].toString().length == 1) {time[0] = '0' + time[0]}
            else((time[0].toString()[0] == ''))
            if(time[1].toString().length == 1) {time[1] = '0' + time[1]}
            else((time[1].toString()[0] == ''))
            if(time[2].toString().length == 1) {time[2] = '0' + time[2]}
            else((time[2].toString()[0] == ''))
            if(time[3].toString().length == 1) {time[3] = '0' + time[3]}
            else((time[3].toString()[0] == ''))
            timerH.textContent = time[0]
            timerM.textContent = time[1]
            timerS.textContent = time[2]
            timerMS.textContent = time[3]
        },Interval)
    }
    if((state == 1)&&(rotationLine.style.animationPlayState === 'running'))
    {
        rotationLine.style.animationPlayState = 'paused'
        state = -1
        clearInterval(WatchSys)
    }
    else if ((state = -1)&&(rotationLine.style.animationPlayState === 'paused'))
    {
        rotationLine.style.animationPlayState = 'running'
        state = 1
        Sys()
    }
    else
    {
        rotationLine.classList.add('rotation')
        rotationLine.style.animationPlayState = 'running'
        state = 1
        Sys()
    }

}
function timerStop()
{
    time = ['0','0','0','0']
    timerH.textContent = '00'
    timerM.textContent = '00'
    timerS.textContent = '00'
    timerMS.textContent = '00'
    rotationLine.classList.remove('rotation')
    clearInterval(WatchSys)
    state = 0
}

document.addEventListener('click', (e) =>
{
    if(e.target == buttonStart) {timerStart()}
    else if(e.target == buttonStart.parentElement) {timerStart()}

    if(e.target == buttonStop) {timerStop()}
    else if(e.target == buttonStop.parentElement) {timerStop()}
})
