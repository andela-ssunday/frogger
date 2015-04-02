// Enemies our player must avoid
var Enemy = function() {

    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.ys = [65,150,230];
    //this.speeds = [100,150,200];
    this.y = this.ys[Math.floor((Math.random()*3) + 0)];
    this.speed = Math.floor((Math.random()*200) + 100);
    this.noOfEnemies = 5;
}


Enemy.prototype.update = function(dt) {
    checkCollide();

    if(this.x >= 500){
        //this.speed = this.speeds[Math.floor((Math.random()*4) + 0)];
        this.x = -50;
        this.y = this.ys[Math.floor((Math.random()*3) + 0)];
        //checkLevel();
    }else{
        this.x += (this.speed * dt);
        
    }

}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}


var Player = function(){
    this.score = 0;
    this.highScore = 0;
    this.p_level = 0;
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;

    this.level = 1;    
}

Player.prototype.update = function(){
     if(this.y<=50){
        this.score+=10;
        //this.highScore+=10;
        checkHighScore();
        this.reset();
        checkLevel();
     }

}

var checkHighScore = function(){
    if(player.score>player.highScore){
        player.highScore = player.score;
    }
}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key){
    switch(key){
        case 'left':
            this.x = (this.x>0) ? this.x-100 : this.x;
            break;
        case 'right':
            this.x = (this.x<400) ? this.x+100 : this.x;
            break;
        case 'up':
            this.y = (this.y>0) ? this.y-85 : this.y;
            break;
        case 'down':
            this.y = (this.y<400) ? this.y+85 : this.y;
            break;
    }

}

Player.prototype.reset = function(){
    this.x = 200;
    this.y = 400;
}


var player = new Player();
var allEnemies = [];
var noOfEnemies = 5;
for(var i=1; i<=noOfEnemies; i++){
    var enemy = new Enemy();    
    allEnemies.push(enemy);
}



var enemy;


var checkCollide = function(){
    //console.log(enemy1.y);
    for(enemy in allEnemies){
        if((Math.abs(player.x-allEnemies[enemy].x) <=70) && (Math.abs(player.y-allEnemies[enemy].y) <=10)){
            player.reset();
            player.score = (player.score<=10) ? 0 : player.score-10;
            checkLevel();

        }
    }
};
var checkSpeed = function(){
    if( player.level === player.p_level){
        reduceEnemySpeed();
    }
}
var checkLevel = function(){
    player.level = Math.floor((player.score/20) + 1);
   console.log("c"+player.level);
    console.log("p"+player.p_level);
    if(player.level>player.p_level){
        addEnemySpeed();
        player.p_level = player.level;
    }
}
var addEnemySpeed = function(){
    for(enemy in allEnemies){
        allEnemies[enemy].speed+= player.level*20;
    }
}

var reduceEnemySpeed = function(){
    for(enemy in allEnemies){
        allEnemies[enemy].speed-= player.p_level*20;
    }    
}


document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
