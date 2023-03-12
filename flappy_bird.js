// global variables for controlling various properties of the game
var grass_x_coords = [];
var ground_y_coords = [];
var ground_x_coords = [];
var grey_scale = [];
var grass_heights = [];
var green_fill = [];
var grass_xs = [];
var grass_widths = [];
var play_sound = true;
/*
var rs = [];
var gs = [];
var bs = [];
*/

var ground_y = height - 45;
var pipes_width = 45;
var score = 0;
var dead = false;
var inc_scr = true;
var gravity = new PVector(0, 0.3);
var start_game = false;
var maximum_spacing = 120; 
var minimum_spacing = 80; // minimum and maximum spacing between upper and lower pipe
var horizontal_spacing_scalar = 4.5;
var pipe_speed = 1.5;
var grass_speed = pipe_speed;
var f = createFont("monospace");

textFont(f);

var stars_x_coords = [];
var stars_y_coords = [];

var stars_w = [];
var stars_h = [];

for(var i = 0; i < 400; i++)
{
    var x = random(0, width);
    var y = random(0, height);
    
    var w = random(1.1, 2.3);
    var h = random(1.0, 2.0);
    
    stars_x_coords.push(x);
    stars_y_coords.push(y);
    
    stars_w.push(w);
    stars_h.push(h);
}

for(var i = 0; i < 400; i++)
{
    ground_y_coords.push(random(height * 0.91, height));
    ground_x_coords.push(random(width));
    grey_scale.push(random(100, 150));
}

for(var i = 0; i < 80; i++)
{
    grass_heights.push(random(70, 100));
    green_fill.push(random(100, 160));
    grass_xs.push(random(width));
    grass_widths.push(random(6, 15));
}

/*
for(var i = 0; i < 14; i++)
{
    rs.push(0);
    gs.push(random(100,120));
    bs.push(random(40, 50));
}
*/
// ...............................................................................
var backgrnd = function()
{
    var leftX = 103;
    var rightX = 308;
    
    var from = color(73, 11, 102);
    var to = color(0, 0, 0);
    //background(0, 0, 0);
    noStroke();
    var b = 153;
    var g = 65;
    var r = 131;
    for(var i = 0; i < height; i += 5)
    {
        //var x = lerpColor(from, to, 0.28);
        //var y = lerpColor(from, to, 0.40);
        noStroke();
        fill(r--, g++, b--);
        //fill(y);
        rect(0, i, width, 30);
    }
    
    //play_button();

    noStroke();
    fill(255, 255, 255);
    
    noStroke();
    for(var i = 0; i < 400; i++)
    {
        fill(255);
        ellipse(stars_x_coords[i], stars_y_coords[i], stars_w[i], stars_h[i]);
    }
    
    /*
    noStroke ();
    fill (240, 237, 62);
     for(var i = 0; i < 360; i+=7)
    {
        stroke(0);
        line(75, 67, 75 + 29*sin(i), 67 - 30*cos(i));
    }
    */
    
    // moon
    fill(217, 213, 213);
    ellipse (77, 67, 50, 50);
    ///

    var x = 10;
    noStroke();
    for(var i = 0; i < 10; i++, x+=10)
    {
        fill(222, 209, 209, 17);
        ellipse (77, 67, 50 + x, 50 + x);
    }
    
    //fill(222, 185, 185, 222);
    //ellipse (93, 67, 18, 18);
    //ellipse (62, 80, 14, 14);
    //ellipse (66, 55, 19, 18);
    
    
    fill(153, 146, 139, 255);
    rect(0, ground_y, width, 300); // ground
    
    /*
    // right cloud
    ellipse(rightX+62, 101, 70, 60);
    ellipse(rightX-62, 100, 70, 60);
    ellipse(rightX, 93, 123, 97);
    noStroke();
    fill(255, 255, 255);
        // left cloud
    ellipse(leftX, 119, 126, 97);
    ellipse(leftX+62, 112, 70, 60);
    ellipse(leftX-62, 126, 70, 60);
 
    */
    //filter (BLUR, 1);
};

for (var i = 0; i < 25; i++) 
{ 
    grass_x_coords.push(i*20);
}

var draw_grass = function()
{
    
    for(var i = 0; i < 400; i++)
    {
        ground_x_coords[i] -= grass_speed;
        //stroke(0);  
        //var fillGrey = random(100,150);
        //fill(fillGrey,fillGrey,fillGrey);
        //noStroke();
        fill(grey_scale[i], grey_scale[i], grey_scale[i]);
        
        ellipse(ground_x_coords[i], ground_y_coords[i], stars_w[i] * 4, stars_h[i] * 4);
        
        if(ground_x_coords[i] <= 0)
        {
            ground_x_coords[i] = width;
        }
    }
    
    for (var i = 0; i < grass_x_coords.length; i++) 
    {

        image(getImage("cute/GrassBlock"), grass_x_coords[i], height*0.86, 21 * grass_speed, 20);
        grass_x_coords[i] -= grass_speed;
        if (grass_x_coords[i] <= -20)
        {
            grass_x_coords[i] = width;
        }
    }
    
    /*
        for(var i = 0; i < 80; i += 3)
    {
        fill(0, green_fill[i], 0);
        ellipse(ground_x_coords[i], height * 0.93, grass_widths[i], grass_heights[i]);
    }
    */

};


// Objects code and functionalties start here... 
// Button Object
var Button = function(x, y, w, h, txt)
{
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.txt = txt;
};

Button.prototype.draw_button = function()
{
    if(this.hover())
    {
        fill(255, 0, 0);
    }
    else
    {
        fill(31, 255, 192);
    }
    
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h, 6);
    
    fill(0, 0, 0);
    textAlign(CENTER);
    //var mono = createFont("sans-serif.ttf");
    //textFont(mono);
    text(this.txt, this.x, this.y + 12);
    
    // calling functions again so that the other fonts aren't affected...
    //textFont(f);   
    rectMode(CORNER);
};

Button.prototype.clicked = function()
{
    if(mouseX >= this.x - this.w/2 &&
        mouseX <= this.x + this.w/2 &&
        mouseY >= this.y - this.h/2 &&
        mouseY <= this.y + this.h/2)
    {
        if(mouseIsPressed)
        {
            return true;
        }
    }
    
    return false;
};

Button.prototype.hover = function()
{
    if(mouseX >= this.x - this.w/2 &&
        mouseX <= this.x + this.w/2 &&
        mouseY >= this.y - this.h/2 &&
        mouseY <= this.y + this.h/2)
    {
        return true;
    }
    
    return false;
};

Button.prototype.anima = function()
{
    this.y += 0.1;
};

/*
var play_button = function()
{
    var button_x = width/2;
    var button_y = height/2;
    var button_w = 100;
    var button_h = 45;
    
    if(mouseX >= button_x - button_w/2 &&
        mouseX <= button_x + button_w/2 &&
        mouseY >= button_y - button_h/2 &&
        mouseY <= button_y + button_h/2)
    {
        fill(255, 0, 0);
        if(mouseIsPressed)
        {
            start_game = true;
        }
    }
    else
    {
        fill(31, 255, 192);
    }
    
    if(!start_game)
    {
    rectMode(CENTER);
    rect(button_x, button_y, button_w, button_h, 6);
    
    fill(0, 0, 0);
    textAlign(CENTER);
    //var mono = createFont("andalemo.ttf");
    //textFont(mono);
    text("Play", button_x, button_y + 12);

    // calling functions again so that the other fonts aren't affected...
    //textFont(f);
    }
};
*/
// Button Object code end...
// ...............................................................................


var Bird = function(x, y, radius)
{
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.drop_rate = 17;
    this.flap_rate = 68;
    this.constrain = true;
    this.theta = PI/4;
    
    this.loc = new PVector(x, y);
    this.velocity = new PVector(0, 0);
    this.acceleration = new PVector(0, 0);
    this.thrust = new PVector(0, -8);
};

Bird.prototype.draw = function()
{

    //this.theta = constrain(this.theta, -0.2, 1.5);
    //  the bird's features resize dynamically as long as the numbers aren't crazy.
    var bird_width = this.radius * 2;
    var bird_height = this.radius * 1.8;
    
    var bird_x_coord = this.loc.x; 
    var bird_y_coord = this.loc.y;
    
    var offset_eye = bird_width/3 * 0.5;
    
    var eye_width = 0.46 * bird_width;
    var eye_height = 0.46 * bird_height;
    
    var iris_width = eye_width * 0.1;
    var iris_height = eye_height * 0.1;
    
    var iris_offset_x = bird_width/7.5;
    var iris_offset_y = 0;
    
    var lip_width = bird_width * 0.56;
    var lip_height = bird_height/10;
    
    var lip_offset_x = 1;
    var lip_offset_y = 3;
    
    // body
    fill(246, 255, 115);
    stroke(0);
    strokeWeight(2);
    ellipse(bird_x_coord, bird_y_coord, bird_width, bird_height);
    
    // eye
    stroke(0);
    fill(255);
    strokeWeight(3);
    ellipse(bird_x_coord + offset_eye, bird_y_coord - offset_eye, eye_width, eye_height);
    
    // iris
    fill(0);
    ellipse(bird_x_coord + offset_eye + iris_offset_x , bird_y_coord - offset_eye + iris_offset_y, iris_width, iris_height);
    
    // upper lip
    stroke(0);
    strokeWeight(2);
    fill(232, 12, 60);
    rect(bird_x_coord, bird_y_coord, lip_width, lip_height);
    
    // lower lip
    stroke(0);
    strokeWeight(2);
    fill(252, 8, 65);
    rect(bird_x_coord + lip_offset_x, bird_y_coord + lip_offset_y, lip_width, lip_height); 
    
    // wings
    noStroke();
    fill(232, 23, 23);
    /*
    fill(255, 150, 150);
    triangle(bird_x_coord, bird_y_coord, bird_x_coord + this.radius, bird_y_coord + this.radius * sin(this.theta), bird_x_coord - this.radius, bird_y_coord + this.radius * sin(this.theta));
    */
    triangle(bird_x_coord, bird_y_coord, bird_x_coord - this.radius, bird_y_coord +
    this.radius, bird_x_coord + this.radius, bird_y_coord - this.radius);


    if(this.constrain)
    {
        this.loc.y = constrain(this.loc.y, 0, height);
    }

};

Bird.prototype.fall = function()
{
    this.y += lerp(0, this.drop_rate, 0.5);
};

Bird.prototype.flap = function()
{
    this.y -= lerp(0, this.flap_rate, 0.8);
};

Bird.prototype.applyForce = function(force_)
{
    this.acceleration.add(force_);
    this.theta -= 0.07;
};
  
Bird.prototype.applyGravity = function(force_) {
    this.acceleration.add(force_);
    this.theta += 0.01;
 };
  
Bird.prototype.update = function()
{
   this.velocity.add(this.acceleration);
   this.loc.add(this.velocity);
   this.acceleration.mult(0);
   this.velocity.mult(0.88);
   //constrain(this.velocity.y, -2.46, 5.46);
 };


Bird.prototype.dead = function()
{
   this.velocity.add(gravity);
   this.loc.add(this.velocity);
   this.acceleration.mult(0);
   this.velocity.mult(1);
    //this.y += lerp(0, 12, 0.8); 
    inc_scr = false;
    this.constrain = false;
};


var Upper_pipe = function(x, y, hght, id)
{
  this.x = x;
  this.y = y - 3;
  this.hght = random(50, 250);
  this.spacing = this.hght + random(minimum_spacing, maximum_spacing);
  this.scr = true;
  this.id = id;
};

Upper_pipe.prototype.draw_pipe = function()
{
    fill(0, 230, 0);
    noStroke();
    rectMode(CORNER);
    rect(this.x, this.y, pipes_width, this.hght, 4);
    rect(this.x, this.y + this.spacing, pipes_width,
        height - this.spacing - (height - ground_y), 4);
};

Upper_pipe.prototype.move = function()
{
    this.x -= pipe_speed;
};

Upper_pipe.prototype.collide = function(bird)
{
    if(bird.loc.x + bird.radius >= this.x &&
       bird.loc.x  <= this.x + pipes_width &&
       bird.loc.y - bird.radius >= this.y &&
       bird.loc.y - bird.radius <= this.y + this.hght ||
       bird.loc.x + bird.radius >= this.x &&
       bird.loc.x <= this.x + pipes_width &&
       bird.loc.y + bird.radius >= this.y + this.spacing)
    {
        if(play_sound) {playSound(getSound("rpg/hit-whack"));}
        dead = true;
        inc_scr = false;
        bird.constrain = false;
    }
};

Upper_pipe.prototype.wrap_around = function()
{
    if(this.x < -pipes_width)
    {
        this.hght = random(50, 250);
        this.spacing = this.hght + random(minimum_spacing, maximum_spacing);
        this.x = width + pipes_width; //+ this.id * 4.5 * pipes_width;
        this.scr = true;
    }
};

Upper_pipe.prototype.inc_score = function(bird)
{
    if(bird.loc.x > this.x + pipes_width && this.scr)
    {
        if(play_sound)
        {playSound(getSound("rpg/coin-jingle"));}
        this.scr = false;
        return true;
    }
};

/*
var Lower_pipe = function(p)
{
    this.x = p.x;
    this.y = p.spacing;
    this.hght = height - this.y - (height - ground_y);
};

Lower_pipe.prototype = Object.create(Upper_pipe.prototype);
*/

var bird = new Bird(93, height/3, 16);
var playButton = new Button(width/2, height/2, 100, 45, "Play");
var restartButton = new Button(width/2, height/2, 140, 45, "Respawn?");

var pipes = [2];

var initialize_pipes = function()
{
for (var p = 0; p < 2; p++)
{
    var up_1 = new Upper_pipe(width + p * horizontal_spacing_scalar * pipes_width + pipes_width * 4 , 0, 167, p);
    
    pipes[p] = up_1;
}
};

var hit_ground = true;
var draw = function()
{
    //println(bird.velocity.y);
    if(bird.loc.y >= height - 55)
    {
        dead = true;

        
        if(hit_ground){playSound(getSound("retro/hit2")); hit_ground = false;}
        
        //start_game = false;
    }
    //background(209, 241, 255);
    backgrnd();
    if(!start_game)
    {
        playButton.draw_button();
        playButton.hover();
        //playButton.y += 1;
        //playButton.anima();
        if(playButton.clicked())
        {
            start_game = true;
            initialize_pipes();
        }
    }
    //background (0, 94, 13);

    /*
    if(!start_game)
    {
        fill(255, 255, 255);
        textSize(20);
        text("Press any key to start!", width/2, height - 17);
        //start_game = true;
    }
    */
    
    if(start_game)
    {
    for(var i = 0; i < pipes.length; i++)
    {
        pipes[i].draw_pipe();
        pipes[i].move();
        
        pipes[i].collide(bird);

        if(pipes[i].inc_score(bird) && inc_scr)
        {
            score++;
        }
        
        pipes[i].wrap_around();
    }
    }
    
    
    draw_grass();
    fill(255, 255, 255);
    textSize(39);
    textAlign(CENTER);
    text(score, width/2, 74);
    
    /*

    if(frameCount % 85 === 0 && start_game)
    {
        var up_1 = new Upper_pipe(width, 0, 167);
        var lp_1 = new Lower_pipe(up_1);
        
        pipes.push(up_1);
        pipes.push(lp_1);
    }
    */
    
    if(dead)
    {
        //start_game = false;
        play_sound = false;
        bird.dead();
        bird.draw();
        textSize(30);
        fill(255, 255, 255);
        text("RIP!", width/2, height/2 - 40);
        
        restartButton.draw_button();
        restartButton.hover();
        if(restartButton.clicked())
        {
            dead = false;
            //start_game = false;
            
            bird = new Bird(93, height/3, 16);
            initialize_pipes();
            score = 0;
            inc_scr = true;
            hit_ground = true;
            play_sound = true;
            hit_ground = true;
        }
    }
    
    if(!dead)
    {
        bird.draw();
        bird.update();
    }
    
    if(start_game)
    {
        bird.applyGravity(gravity);
    }
};

var mouseReleased = function()
{
    if(!dead && start_game)
    {
        bird.applyForce(bird.thrust);
        bird.theta *= -1;
        bird.theta += 2;
    }
};

var keyReleased = function()
{
    if(!dead && start_game)
    {
        bird.applyForce(bird.thrust);
        bird.theta *= -1;
        bird.theta += 2;
    }
};


    




