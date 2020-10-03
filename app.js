document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid'),
          doodler = document.createElement('div');
    let doodlerLeftSpace = 50,
        doodlerBottomSpace = 150,
        isGameOver = false,
        platformCount = 5,
        platforms = []

    function createDoodler(){
        grid.appendChild(doodler);
        doodler.classList.add('doodler')
        doodler.style.left = doodlerLeftSpace + 'px'
        doodler.style.bottom = doodlerBottomSpace + 'px'
    }

    class Platform {
        constructor(newPlatBottom){
            this.bottom = newPlatBottom
            this.left = Math.random() * 315
            this.visual = document.createElement('div')

            const visual = this.visual
            visual.classList.add('platform')
            visual.style.left = this.left + 'px'
            visual.style.bottom = this.bottom + 'px'

            grid.appendChild(visual)
        }
    }

    function createPlatforms(){
        for(let i = 0; i < platformCount; i++){
            let platGap = 600 / platformCount,
                newPlatBottom = 100 + i * platGap,
                newPlatform = new Platform(newPlatBottom)
            platforms.push(newPlatform)
        }
    }

    function movePlatforms(){
        if(doodlerBottomSpace > 200){
            platforms.forEach(platform => {
                platform.bottom -= 4
                let visual = platform.visual
                visual.style.bottom = platform.bottom + 'px'
            })
        }
    }

    function start(){
        if(!isGameOver){
            createDoodler()
            createPlatforms()
            setInterval(movePlatforms, 30)
        }
    }

    //attach to a button
    start()
})