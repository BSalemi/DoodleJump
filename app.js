document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid'),
          doodler = document.createElement('div');
    let doodlerLeftSpace = 50,
        startPoint = 150,
        doodlerBottomSpace = startPoint,
        isGameOver = false,
        platformCount = 5,
        platforms = [],
        upTimerId,
        downTimerId,
        leftTimerId,
        isJumping = true,
        isGoingLeft = false,
        isGoingRight = false

    function createDoodler(){
        grid.appendChild(doodler);
        doodler.classList.add('doodler')
        doodlerLeftSpace = platforms[0].left 
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

    function jump(){
        clearInterval(downTimerId)
        isJumping = true
        upTimerId = setInterval(function (){
            doodlerBottomSpace += 20
            doodler.style.bottom = doodlerBottomSpace + 'px'
            if (doodlerBottomSpace > startPoint + 200) {
                fall()
            }
        }, 30)
    }

    function fall(){
        clearInterval(upTimerId)
        isJumping = false
        downTimerId = setInterval(function () {
            doodlerBottomSpace -= 5
            doodler.style.bottom = doodlerBottomSpace + 'px'

            if(doodlerBottomSpace <= 0){
                gameOver()
            }
            platforms.forEach(platform => {
                if (
                    (doodlerBottomSpace >=  platform.bottom) && (doodlerBottomSpace <= platform.bottom + 15) && 
                    ((doodlerLeftSpace + 60) >= platform.left) && (doodlerLeftSpace <= (platform.left + 85)) && !isJumping
                ) {
                    startPoint = doodlerBottomSpace
                    jump()
                }
            })
        }, 30)
    }

    function gameOver(){
        console.log("Game Over!")
        isGameOver = true
        clearInterval(upTimerId)
        clearInterval(downTimerId)
    }

    function control(e){
        if(e.key === "ArrowLeft"){
            moveLeft()
        } else if(e.key="ArrowRight"){
            //move right
        } else if(e.key === "ArrowUp"){
            // moveStraight
        }
    }

    function moveLeft(){
        isGoingLeft = true
        leftTimerId = setInterval(function(){
            doodlerLeftSpace -= 5
            doodler.style.left = doodlerLeftSpace + 'px'
        }, 30)
    }

    function start(){
        if(!isGameOver){
            createPlatforms()
            createDoodler()
            setInterval(movePlatforms, 30)
            jump()
            document.addEventListener('keyup', control)
        }
    }

    //attach to a button
    start()
})