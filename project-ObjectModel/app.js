class Stopwatch
{
    constructor()
    {
        this.timerH = document.querySelector('body div.stopwatch div div:nth-child(1) p');
        this.timerM = document.querySelector('body div.stopwatch div div:nth-child(3) p');
        this.timerS = document.querySelector('body div.stopwatch div div:nth-child(5) p');
        this.timerMS = document.querySelector('body div.stopwatch div div:nth-child(7) p');
        this.rotationLine = document.querySelector('div.line');
        this.buttonStart = document.querySelector('div.controls div i.icon-clock');
        this.buttonStop = document.querySelector('div.controls div i.icon-ccw');
        this.state = 0;
        this.time = ['0', '0', '0', '0'];
        this.Interval = 1000 / 60;
        this.WatchSys = null;
        this.init();
    }

    timerStart()
    {
        if(this.state === 1 && this.rotationLine.style.animationPlayState === 'running')
        {
            this.rotationLine.style.animationPlayState = 'paused';
            this.state = -1;
            clearInterval(this.WatchSys);
        }
        else if(this.state === -1 && this.rotationLine.style.animationPlayState === 'paused')
        {
            this.rotationLine.style.animationPlayState = 'running';
            this.state = 1;
            this.startTimer();
        }
        else
        {
            this.rotationLine.classList.add('rotation');
            this.rotationLine.style.animationPlayState = 'running';
            this.state = 1;
            this.startTimer();
        }
    }

    startTimer()
    {
        this.WatchSys = setInterval(() =>
        {
            this.time[3] = parseInt(this.time[3]) + 1;
            if(parseInt(this.time[3]) >= 60)
            {
                this.time[2] = parseInt(this.time[2]) + 1;
                this.time[3] = 0;
            }
            if (parseInt(this.time[2]) >= 60)
            {
                this.time[1] = parseInt(this.time[1]) + 1;
                this.time[2] = 0;
            }
            if (parseInt(this.time[1]) >= 60)
            {
                this.time[0] = parseInt(this.time[0]) + 1;
                this.time[1] = 0;
            }
            this.updateDisplay();
        }, this.Interval);
    }

    updateDisplay()
    {
        this.time = this.time.map(t => t.toString().padStart(2, '0'));
        this.timerH.textContent = this.time[0];
        this.timerM.textContent = this.time[1];
        this.timerS.textContent = this.time[2];
        this.timerMS.textContent = this.time[3];
    }

    timerStop()
    {
        this.time = ['0', '0', '0', '0'];
        this.updateDisplay();
        this.rotationLine.classList.remove('rotation');
        clearInterval(this.WatchSys);
        this.state = 0;
    }

    init()
    {
        document.addEventListener('click', (e) =>
        {
            if(e.target === this.buttonStart || e.target === this.buttonStart.parentElement) { this.timerStart(); }
            if(e.target === this.buttonStop || e.target === this.buttonStop.parentElement) { this.timerStop(); }
        });
    }
}

const stopwatch = new Stopwatch();