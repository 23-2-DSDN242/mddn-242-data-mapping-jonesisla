//Warping Backup
let sourceImg=null;
let maskImg=null;
let renderCounter=0;

// change these three lines as appropiate
let sourceFile = "input_2.jpg";
let maskFile   = "mask_2.png";
let outputFile = "output_2.png";

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


//render a chucnk
// let X_STOP = 640;
// let Y_STOP = 480;

//render full thing
let X_STOP = 1080;
let Y_STOP = 1920;
let OFFSET = 20;


function draw () {
  angleMode(DEGREES);
  let num_lines_to_draw = 40;
  
  // get one scanline
  for(let j=renderCounter; j<renderCounter+num_lines_to_draw && j<Y_STOP; j++) {
    for(let i=0; i<X_STOP; i++) {
      colorMode(RGB);
      let mask = maskImg.get(i, j);
      
      
      if (mask[1] > 128) {
        pix = sourceImg.get(i, j);
      }
      else {
        let wave = sin(j*8);
        let slip = map(wave, -1, 1, -OFFSET, OFFSET);
        pix = sourceImg.get(i+slip, j);
      }

      
      set(i, j, pix);
    }
  }


  renderCounter = renderCounter + num_lines_to_draw;
  updatePixels();

  // print(renderCounter);
  if(renderCounter > Y_STOP) {
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








// //Warped Colour
// let sourceImg=null;
// let maskImg=null;
// let renderCounter=0;

// // change these three lines as appropiate
// let sourceFile = "input_1.jpg";
// let maskFile   = "mask_1.png";
// let outputFile = "output_1.png";

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


// // //render a chucnk
// // // let X_STOP = 640;
// // // let Y_STOP = 480;

// // //render full thing
// let X_STOP = 1080;
// let Y_STOP = 1920;
// let OFFSET = 40;



// function draw () {
//   let num_lines_to_draw = 40;
//   // get one scanline
//   for(let j=renderCounter; j<renderCounter+num_lines_to_draw && j<Y_STOP; j++) {
//     for(let i=0; i<X_STOP; i++) {
//       colorMode(RGB);
//       let pix = sourceImg.get(i, j);
//       // create a color from the values (always RGB)
//       let col = color(pix);
//       let mask = maskImg.get(i, j);

//       colorMode(HSB, 360, 100, 100);
//       // draw a "dimmed" version in gray

//       if(mask[0] > 128) {
//         pix = sourceImg.get(i, j);
//       }
//       else if (mask[1] < 128) {
//         let new_col = color(290,100,100);
//         //wave
//         let wave = sin(j*4);
//         let slip = map(wave, -2,2, -OFFSET , OFFSET );
//         //pix = sourceImg.get(i+slip, j);
//         set(i+slip, j, new_col);
//       }
//       else{
//         let new_col = color(150,50,68);
//         //wave
//         let wave = sin(j*2);
//         let slip = map(wave, -6,6, -OFFSET+10 , OFFSET+10 );
//         //pix = sourceImg.get(i+slip, j);
//         set(i+slip, j, new_col); 
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






