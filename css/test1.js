var MAX_PARTICLES = 170;
var COLORS = [ '#FF00FF', ' #9932CC', '   #00FFFF', '#C0FF3E', '  #FFFF00', '#FF4E50', '#9400D3' ];

var particles = [];
var pool = [];
var wander1 = 0.5;
var wander2 = 2.0;
var drag1 = .9;
var drag2 = .99;
var force1 = 2;
var force2 = 8;
var theta1 = -0.5;
var theta2 = 0.5;
var size1 = 5;
var size2 = 120;
var sizeScalar = 0.97;

function Particle(x,y,size) {
    this.alive = true;
    this.size = size || 10;
    this.wander = 0.15;
    this.theta = random( TWO_PI );
    this.drag = 0.92;
    this.color = '#fff';
    this.location = createVector(x || 0.0, y || 0.0);
  this.velocity = createVector(0.0, 0.0);
}
Particle.prototype.move = function() {
    this.location.add(this.velocity);
    this.velocity.mult(this.drag);
    this.theta += random( theta1, theta2 ) * this.wander;
    this.velocity.x += sin( this.theta ) * 0.1;
    this.velocity.y += cos( this.theta ) * 0.1;
    this.size *= sizeScalar;
    this.alive = this.size > 0.5;
}
Particle.prototype.show = function() {
 
  fill( this.color );
  noStroke();
  ellipse(this.location.x,this.location.y, this.size, this.size);
}

function spawn(x,y) {
    var particle, theta, force;
    if ( particles.length >= MAX_PARTICLES ) {
        pool.push( particles.shift() );
    }
    particle = new Particle(mouseX, mouseY, random(size1,size2));
    particle.wander = random( wander1, wander2 );
    particle.color = random( COLORS );
    particle.drag = random( drag1, drag2 );
    theta = random( TWO_PI );
    force = random( force1, force2 );
    particle.velocity.x = sin( theta ) * force;
    particle.velocity.y = cos( theta ) * force;
    particles.push( particle );
}
function update() {
    var i, particle;
    for ( i = particles.length - 1; i >= 0; i-- ) {
        particle = particles[i];
        if ( particle.alive ) {
          particle.move();
        } else {
          pool.push( particles.splice( i, 1 )[0] );
        }
    }
}
window.onresize = function(){
    console.log(1);
    setup()
};

function moved() {
    var particle, max, i;
    max = random( 1, 4 );
    for ( i = 0; i < max; i++ ) {
      spawn( mouseX, mouseY );
    }
}

function setup() {
    console.log(window.screen.availHeight )
    console.log(document.body.clientHeight)
    
  var canvas = createCanvas(document.body.offsetWidth,document.body.clientHeight);
canvas.parent('sketch-holder');
}

function draw() {
  update();
    drawingContext.globalCompositeOperation = 'normal';
    background(   209, 238, 238);
  drawingContext.globalCompositeOperation = 'lighter';
  for (var i = particles.length - 1; i >= 0; i--) {
      particles[i].show();
    }
}

function mouseMoved() {
   moved();
}

function touchMoved() {
    moved();
}