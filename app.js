(()=>{"use strict";var e,t={717:(e,t,s)=>{var i=s(440),n=s.n(i);class a extends n().Scene{constructor(e,t){super(e),this.config=t,this.screenCenter=[t.width/2,t.height/2],this.fontSize=32,this.lineHeight=42,this.fontOptions={fontSize:`${this.fontSize}px`,fill:"#fff"}}create(){if(this.add.image(0,0,"background").setOrigin(0),this.config.canGoBack){this.add.image(this.config.width-10,this.config.height-10,"back").setOrigin(1).setScale(2).setInteractive().on("pointerup",(()=>{this.scene.start("MenuScene")}))}}createMenu(e,t){let s=0;e.forEach((e=>{const i=[this.screenCenter[0],this.screenCenter[1]+s];e.textGO=this.add.text(...i,e.text,this.fontOptions).setOrigin(.5,1),s+=this.lineHeight,t(e)}))}}const r=a;const c=class extends r{constructor(e){super("PlayScene",e),this.bird=null,this.pipes=null,this.isPaused=!1,this.pipeHorizontalDistance=0,this.flapVelocity=300,this.score=0,this.scoreText="",this.currentDifficulty="easy",this.difficulties={easy:{pipeHorizontalDistanceRange:[300,350],pipeVerticalDistanceRange:[150,200]},normal:{pipeHorizontalDistanceRange:[280,330],pipeVerticalDistanceRange:[140,190]},hard:{pipeHorizontalDistanceRange:[250,310],pipeVerticalDistanceRange:[50,100]}}}create(){this.currentDifficulty="easy",super.create(),this.createBird(),this.createPipes(),this.createColliders(),this.createScore(),this.createPause(),this.handleInput(),this.listenToEvents(),this.createPlay(),this.anims.create({key:"fly",frames:this.anims.generateFrameNumbers("bird",{start:9,end:15}),frameRate:8,repeat:-1}),this.bird.play("fly")}update(){this.checkGameStatus(),this.recyclePipes()}listenToEvents(){this.pauseEvent||(this.pauseEvent=this.events.on("resume",(()=>{this.initialTime=3,this.countDownText=this.add.text(...this.screenCenter,"Fly in: "+this.initialTime,this.fontOptions).setOrigin(.5),this.timedEvent=this.time.addEvent({delay:1e3,callback:this.countDown,callbackScope:this,loop:!0})})))}countDown(){this.initialTime--,this.countDownText.setText("Fly in: "+this.initialTime),this.initialTime<=0&&(this.isPaused=!1,this.countDownText.setText(""),this.physics.resume(),this.timedEvent.remove())}createBG(){this.add.image(0,0,"background").setOrigin(0)}createBird(){this.bird=this.physics.add.sprite(this.config.startPosition.x,this.config.startPosition.y,"bird").setFlipX(!0).setScale(3).setOrigin(0),this.bird.setBodySize(this.bird.width,this.bird.height-8),this.bird.body.gravity.y=600,this.bird.setCollideWorldBounds(!0)}createPipes(){this.pipes=this.physics.add.group();for(let e=0;e<4;e++){const e=this.pipes.create(0,0,"piller2").setImmovable(!0).setOrigin(0,1),t=this.pipes.create(0,0,"piller").setImmovable(!0).setOrigin(0,0);this.placePipe(e,t)}this.pipes.setVelocityX(-200)}createColliders(){this.physics.add.collider(this.bird,this.pipes,this.gameOver,null,this)}createScore(){this.score=0;const e=localStorage.getItem("bestScore");this.scoreText=this.add.text(this.config.scorePos.x,this.config.scorePos.y,"Score 0",{fontSize:"32px",fill:"#000"}),this.add.text(this.config.bestScorePos.x,this.config.bestScorePos.y,`Best Score: ${e||0}`,{fontSize:"18px",fill:"#000"})}createPause(){this.isPaused=!1;this.add.image(this.config.pausePos.x,this.config.pausePos.y,"pause").setInteractive().setScale(3).setOrigin(1).on("pointerdown",(()=>{this.isPaused=!0,this.physics.pause(),this.scene.pause(),this.scene.launch("PauseScene")}))}createPlay(){this.add.image(this.config.width-10,this.config.height-570,"play").setInteractive().setScale(1).setOrigin(1).on("pointerdown",(()=>{this.scene.start("NewScene"),this.physics.pause(),this.scene.pause()}))}handleInput(){this.input.keyboard.on("keydown_J",this.flap,this),this.input.on("pointerdown",this.flap,this),this.input.keyboard.on("keydown_SPACE",this.flap,this)}checkGameStatus(){(this.bird.getBounds().bottom>=this.config.height||this.bird.y<=0)&&this.gameOver()}placePipe(e,t){const s=this.difficulties[this.currentDifficulty],i=this.getRightMostPipe(),n=Phaser.Math.Between(...s.pipeVerticalDistanceRange),a=Phaser.Math.Between(20,this.config.height-20-n),r=Phaser.Math.Between(...s.pipeHorizontalDistanceRange);e.x=i+r,e.y=a,t.x=e.x,t.y=e.y+n}recyclePipes(){const e=[];this.pipes.getChildren().forEach((t=>{t.getBounds().right<=0&&(e.push(t),2===e.length&&(this.placePipe(...e),this.increaseScore(),this.saveBestScore(),this.increaseDifficulty()))}))}increaseDifficulty(){1===this.score&&(this.currentDifficulty="normal"),3===this.score&&(this.currentDifficulty="hard")}getRightMostPipe(){let e=0;return this.pipes.getChildren().forEach((function(t){e=Math.max(t.x,e)})),e}saveBestScore(){const e=localStorage.getItem("bestScore"),t=e&&parseInt(e,10);(!t||this.score>t)&&localStorage.setItem("bestScore",this.score)}gameOver(){this.physics.pause(),this.bird.setTint(15616036),this.saveBestScore(),this.time.addEvent({delay:1e3,callback:()=>{this.scene.restart()},loop:!1})}flap(){this.isPaused||(this.bird.body.velocity.y=-this.flapVelocity)}increaseScore(){this.score++,this.scoreText.setText(`Score: ${this.score}`)}};const o=class extends r{constructor(e){super("MenuScene",e),this.menu=[{scene:"PlayScene",text:"Play"},{scene:"ScoreScene",text:"Score"},{scene:null,text:"Exit"}]}create(){super.create(),this.createMenu(this.menu,this.setupMenuEvents.bind(this))}setupMenuEvents(e){const t=e.textGO;t.setInteractive(),t.on("pointerover",(()=>{t.setStyle({fill:"#ff0"})})),t.on("pointerout",(()=>{t.setStyle({fill:"#fff"})})),t.on("pointerup",(()=>{e.scene&&this.scene.start(e.scene),"Exit"===e.text&&this.game.destroy(!0)}))}};class h extends n().Scene{constructor(){super("PreloadScene")}preload(){this.load.image("background","assets/background.png"),this.load.spritesheet("bird","assets/birdSprite.png",{frameWidth:16,frameHeight:16}),this.load.image("piller","assets/Piller.png"),this.load.image("piller2","assets/Piller2.png"),this.load.image("pause","assets/pause.png"),this.load.image("play","assets/Play.jpg"),this.load.image("naruto","assets/Naruto.jpg"),this.load.image("back","assets/back.png")}create(){this.scene.start("MenuScene")}}const l=h;class p extends n().Scene{constructor(e){super("NewScene"),this.config=e}create(){this.add.image(0,0,"naruto").setOrigin(0),this.add.text(0,300,"A Place where someone still thinks\n about you is a place you can call home!",{fontSize:"32px",fill:"#fff"})}}const u=p;const d=class extends r{constructor(e){super("ScoreScene",{...e,canGoBack:!0})}create(){super.create();const e=localStorage.getItem("bestScore");this.add.text(...this.screenCenter,`Best Score: ${e||0}`,this.fontOptions).setOrigin(.5)}};const f=class extends r{constructor(e){super("PauseScene",e),this.menu=[{scene:"PlayScene",text:"Continue"},{scene:"MenuScene",text:"Exit"}]}create(){super.create(),this.createMenu(this.menu,this.setupMenuEvents.bind(this))}setupMenuEvents(e){const t=e.textGO;t.setInteractive(),t.on("pointerover",(()=>{t.setStyle({fill:"#ff0"})})),t.on("pointerout",(()=>{t.setStyle({fill:"#fff"})})),t.on("pointerup",(()=>{e.scene&&"Continue"===e.text?(this.scene.stop(),this.scene.resume(e.scene)):(this.scene.stop("PlayScene"),this.scene.start(e.scene))}))}},g=400,y=600,m={width:g,height:y,startPosition:{x:40,y:300},scorePos:{x:4,y:12},bestScorePos:{x:4,y:48},pausePos:{x:395,y:589.98}},S=[l,u,o,d,c,f],x=e=>new e(m),b={type:n().AUTO,...m,pixelArt:!0,physics:{default:"arcade",arcade:{}},scene:S.map(x)};new(n().Game)(b)}},s={};function i(e){var n=s[e];if(void 0!==n)return n.exports;var a=s[e]={exports:{}};return t[e](a,a.exports,i),a.exports}i.m=t,e=[],i.O=(t,s,n,a)=>{if(!s){var r=1/0;for(l=0;l<e.length;l++){for(var[s,n,a]=e[l],c=!0,o=0;o<s.length;o++)(!1&a||r>=a)&&Object.keys(i.O).every((e=>i.O[e](s[o])))?s.splice(o--,1):(c=!1,a<r&&(r=a));if(c){e.splice(l--,1);var h=n();void 0!==h&&(t=h)}}return t}a=a||0;for(var l=e.length;l>0&&e[l-1][2]>a;l--)e[l]=e[l-1];e[l]=[s,n,a]},i.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return i.d(t,{a:t}),t},i.d=(e,t)=>{for(var s in t)i.o(t,s)&&!i.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={524:0};i.O.j=t=>0===e[t];var t=(t,s)=>{var n,a,[r,c,o]=s,h=0;if(r.some((t=>0!==e[t]))){for(n in c)i.o(c,n)&&(i.m[n]=c[n]);if(o)var l=o(i)}for(t&&t(s);h<r.length;h++)a=r[h],i.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return i.O(l)},s=self.webpackChunkaltudemypackage=self.webpackChunkaltudemypackage||[];s.forEach(t.bind(null,0)),s.push=t.bind(null,s.push.bind(s))})();var n=i.O(void 0,[121],(()=>i(717)));n=i.O(n)})();