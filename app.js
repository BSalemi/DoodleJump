document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid'),
          doodler = document.createElement('div');
    let doodlerLeftSpace = 50,
        doodlerBottomSpace = 150,
        isGameOver = false,
        platformCount = 5

    function createDoodler(){
        grid.appendChild(doodler);
        doodler.classList.add('doodler')
        doodler.style.left = doodlerLeftSpace + 'px'
        doodler.style.bottom = doodlerBottomSpace + 'px'
    }

    function createPlatforms(){
        for(let i = 0; i < platformCount; i++){
            let platGap = 600 / platformCount,
                newPlatBottom = 100 + i * platGap,
                newPlatform = new Platform()
        }
    }

    function start(){
        if(!isGameOver){
            createDoodler()
            createPlatforms()
        }
    }

    //attach to a button
    start()
})