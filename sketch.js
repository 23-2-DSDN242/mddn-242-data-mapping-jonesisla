let sourceImg=null;
let maskImg=null;
let renderCounter=0;
let curLayer = 0;

// change these three lines as appropiate
let sourceFile = "input_1.jpg";
let maskFile   = "mask_1.png";
let outputFile = "output_1.png";

function preload() {
  sourceImg = loadImage(sourceFile);
  maskImg = loadImage(maskFile);
}

function setup () {
  let main_canvas = createCanvas(1080, 1920);
  main_canvas.parent('canvasContainer');

  imageMode(CENTER);
  noStroke();
  background(0, 0, 128);
  sourceImg.loadPixels();
  maskImg.loadPixels();
  colorMode(HSB);
}

// //render a chucnk
// // let X_STOP = 640;
// // let Y_STOP = 480;

// //render full thing
let X_STOP = 1080;
let Y_STOP = 1920;


function draw () {
  if (curLayer == 0) {
    let num_lines_to_draw = 40;
    // get one scanline
    for(let j=renderCounter; j<renderCounter+num_lines_to_draw && j<Y_STOP; j++) {
      for(let i=0; i<X_STOP; i++) {
        colorMode(RGB);
        let pix = sourceImg.get(i, j);
        // create a color from the values (always RGB)
        let col = color(pix);
        let mask = maskImg.get(i, j);

        colorMode(HSB, 360, 100, 100);
        // draw a "dimmed" version in gray
        let h = hue(col);
        let s = saturation(col);
        let b = brightness(col);

        let new_brt = map(b, 0, 100, 30, 50);
        let new_col = color(h, 0, new_brt);
        set(i, j, new_col);
      }
    }
    renderCounter = renderCounter + num_lines_to_draw;
    updatePixels();
  }
  else if (curLayer == 1) {
    for(let i=0; i<500; i++) {
      let x1 = random(0, width);
      let y1 = random(0, height);
      let mask = maskImg.get(x1, y1);
      if(mask[1] > 128) {
        let x2 = x1 + random(-20, 20);
        let y2 = y1 + random(-20, 20);
        colorMode(RGB);
        stroke(255, 255, 0);
        line(x1, y1, x2, y2);
      }
    }
    renderCounter = renderCounter + 1;
  }
  else {
    rectMode(CORNERS);
    for(let i=0; i<100; i++) {
      let x1 = random(0, width);
      let y1 = random(0, height);
      let x2 = x1 + random(-10, 10);
      let y2 = y1 + random(-10, 10);
      colorMode(RGB);
      let pix = sourceImg.get(x1, y1);
      let mask = maskImg.get(x1, y1);
      let col = color(pix);
      stroke(col);
      fill(col);
      if(mask[1] < 128) {
        line(x1, y1, x2, y2);
      }
      else {
        rect(x1, y1, x2, y2);
      }
    }
    renderCounter = renderCounter + 1;
    // set(i, j, new_col);
  }
  // print(renderCounter);
  if(curLayer == 0 && renderCounter > Y_STOP) {
    curLayer = 1;
    renderCounter = 0;
    print("Switching to curLayer 1");
  }
  if(curLayer == 1 && renderCounter > 500) {
    curLayer = 2;
    renderCounter = 0;
    print("Switching to curLayer 2");
  }
  else if(curLayer == 2 && renderCounter > 1500) {
    console.log("Done!")
    noLoop();
    // uncomment this to save the result
    // saveArtworkImage(outputFile);
  }
}

function keyTyped() {
  if (key == '!') {
    saveBlocksImages();
  }
}



//Warping Backup
// let sourceImg=null;
// let maskImg=null;
// let renderCounter=0;

// // change these three lines as appropiate
// let sourceFile = "input_2.jpg";
// let maskFile   = "mask_2.png";
// let outputFile = "output_2.png";

// function preload() {
//   sourceImg = loadImage(sourceFile);
//   maskImg = loadImage(maskFile);
// }

// function setup () {
//   let main_canvas = createCanvas(1080, 1920);
//   main_canvas.parent('canvasContainer');

//   imageMode(CENTER);
//   noStroke();
//   background(0, 0, 128);
//   sourceImg.loadPixels();
//   maskImg.loadPixels();
//   colorMode(HSB);
// }


// //render a chucnk
// // let X_STOP = 640;
// // let Y_STOP = 480;

// //render full thing
// let X_STOP = 1080;
// let Y_STOP = 1920;
// let OFFSET = 20;


// function draw () {
//   angleMode(DEGREES);
//   let num_lines_to_draw = 40;
  
//   // get one scanline
//   for(let j=renderCounter; j<renderCounter+num_lines_to_draw && j<Y_STOP; j++) {
//     for(let i=0; i<X_STOP; i++) {
//       colorMode(RGB);
//       let mask = maskImg.get(i, j);
      
      
//       if (mask[1] > 128) {
//         pix = sourceImg.get(i, j);
//       }
//       else {
//         let wave = sin(j*8);
//         let slip = map(wave, -1, 1, -OFFSET, OFFSET);
//         pix = sourceImg.get(i+slip, j);
//       }

      
//       set(i, j, pix);
//     }
//   }


//   renderCounter = renderCounter + num_lines_to_draw;
//   updatePixels();

//   // print(renderCounter);
//   if(renderCounter > Y_STOP) {
//     console.log("Done!")
//     noLoop();
//     // uncomment this to save the result
//     // saveArtworkImage(outputFile);
//   }
// }


// function keyTyped() {
//   if (key == '!') {
//     saveBlocksImages();
//   }
// }
