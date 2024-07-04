// others 
// https://www.reddit.com/r/cellular_automata/comments/h83t3z/this_is_the_largest_highway_ive_found_on_langtons/
// RRLRLLRRLRRRRRRRRRLLLLRLRR loops at 6518789812888 

// Rule	                           Estimated period
// LLRLRRRLRRLLLRRLLLLLLRLLRLRR	   3e154
// LLRLRRLLRLLLLLLRRLLLR	       >=1.104122836656e15
// RRLRLLRRLRRRRRRRRRLLLRLLRLR	   >=4.18492189e13
// RRRLRRLLRLRRRRLLRRRLLRLR	       3.77616273e16
// RRRLRRLLRLRRRRRRRRRLR	       5.64742157e15
// LLRLRRLLRLLLLLLLLRRRRRRLRLR	   >=5.730524292850e12
// RRLRLLRRLRRRRRRRRRLRRLRLRR	   >= 1.18229126e13
// LLRLRRLLRLLLLLLLLRRRLLRLR	   -
// LLRLRRLLRLLLLLLLLLLRLRLR	       -

// you can also grab palletes by using Lospec's API, https://Lospec.com/palette-list/greyt-bit.json
// this outputs json, so json["colors"] contains a list of all of the hex codes.
// p5 has the built-in loadJSON function which works fllawlessly.

let palletes = {}
let promises = []

function loadAllJSON(){
  palleteNames = [
                  "ice-cream-gb",
                  "lava-gb",
                  "everglow-diamond",
                  "curiosities",
                  "minimal-red-3",
                  "ghost-town",
                  "white-scape",
                  "bitbee",
                  "autumn-decay",
                  "nostalgia",
                  "bumblebit",
                  "1bit-styx",
                  "mystique-life-3",
                  "blue-snow",
                  "basic-bit",
                  "abyss-9",
                  "bloodmoon21",
                  "mother-nature",
                  "inkpink",
                  "1bit-monitor-glow",
                  "gato-roboto-virtual-cat",
                  "gato-roboto-goop",
                  "generic-milk-carton",
                  "ys-postapocalyptic-sunset",
                  "casio-basic",
                  "1-bit-chill",
                 ]
  for (let pName of palleteNames){
    console.log("loading",pName)
    promises.push(loadJSONasync(`https://Lospec.com/palette-list/${pName}.json`));
  }
}
  
function loadJSONasync(url){
  return new Promise((success, failure) => {
    loadJSON(url, parseJSON, failure);
  });  
}


function success(){
  console.log("promise success")
}

function failure(err){
  console.log(err)
}

function parseJSON(json){
  console.log("loaded", json.name)
  let hexes = json.colors
  let output = []
  for (let c of hexes){
    output.push(color(`#${c}`))
  }
  palletes[json.name] = {size: output.length, colors: output}
}



function preset0() {
      presetInfo =
        "Preset 0:<br>The standard Langton's Ant.<br>Rules: LR <br>Colors: <a href='https://lospec.com/palette-list/1bit-monitor-glow'>1bit Monitor Glow Pallete</a>";
      wrap = false;
      W = 100;
      H = 100;
      SF = 4;
      ipr = 1;
      ants = [[50, 50, dir_R]];
      let pallete = "1bit Monitor Glow"
      rulesC = palletes[pallete].colors
      let fillColorIdx = 0
      for (let i = 0; i < fillColorIdx; i++) { // rotates the array to have a different fillColor
        rulesC.push(rulesC.shift());
      }
      rulesD = [turn_R, turn_L];
}

function preset1() {
  // wierd bars!!! (works)
      presetInfo =
        "Preset 1:<br>Wierd bars that are generated using the 'No Change' command. Counts up in binary bars. <br>Rules: RN <br>Colors: <a href='https://lospec.com/palette-list/casio-basic'>Casio Basic Pallete</a";
      W = 100;
      H = 100;
      SF = 4;
      ipr = 5;
      wrap = false;
      ants = [
        [57, 57, dir_U],
        [57, 43, dir_L],
        [43, 43, dir_D],
        [43, 57, dir_R],
      ];
      let pallete = "Casio Basic"
      rulesC = palletes[pallete].colors
      let fillColorIdx = 0
      for (let i = 0; i < fillColorIdx; i++) { // rotates the array to have a different fillColor
        rulesC.push(rulesC.shift());
      };
      rulesD = [turn_R, turn_N];
}

function preset2() {
   presetInfo =
        "Preset 2:<br>Symmetric growth<br>Rules: LLRR<br>Colors: black-white-magenta-cyan";
      // LLRR symmetric growth (works)
      W = 200;
      H = 200;
      SF = 2;
      ipr = 10;
      wrap = true;
      ants = [[100, 100, dir_L]];
      rulesC = [
        color("black"),
        color("white"),
        color("magenta"),
        color("cyan"),
      ];
      rulesD = [turn_L, turn_L, turn_R, turn_R];
}

function preset3() {
  // RLLR
      presetInfo =
        "Preset 3:<br>More Symmetric growth<br>Rules: RLLR<br>Colors: <a href='https://lospec.com/palette-list/ice-cream-gb'>ICE CREAM GB Pallete</a>";
      H = 200;
      W = 200;
      SF = 2;
      ipr = 10;
      wrap = true;
      ants = [[100, 100, dir_L]];
      let pallete = "Ice Cream GB"
      rulesC = palletes[pallete].colors
      let fillColorIdx = 0
      for (let i = 0; i < fillColorIdx; i++) { // rotates the array to have a different fillColor
        rulesC.push(rulesC.shift());
      }
  
      rulesD = [turn_R, turn_L, turn_L, turn_R];
}

function preset4() {
  // new rules! LRDU
      presetInfo =
        "Preset 4:<br>An ant using all 4 rules, turn left, turn right, no change, and u-turn<br>Rules: LRNU<br>Colors: <a href='https://lospec.com/palette-list/lava-gb'>LAVA-GB Pallete</a>";
      H = 200;
      W = 200;
      SF = 2;
      ipr = 10;
      wrap = true;
      ants = [[100, 100, dir_U]];
      let pallete = "Lava-GB"
      rulesC = palletes[pallete].colors
      let fillColorIdx = 0
      for (let i = 0; i < fillColorIdx; i++) { // rotates the array to have a different fillColor
        rulesC.push(rulesC.shift());
      }
      rulesD = [turn_L, turn_R, turn_N, turn_U];
}

function preset5() {
  // random LRLRLR
      presetInfo =
        "Preset 5:<br>A chaotic but normal ant with many rules.<br>Rules: LRLRLR<br>Colors: <a href='https://lospec.com/palette-list/inkpink'>INKPINK Pallete</a>";
      H = 200;
      W = 200;
      SF = 2;
      ipr = 10;
      wrap = true;
      ants = [[100, 100, dir_U]];
      let pallete = "INKPINK"
      rulesC = palletes[pallete].colors
      let fillColorIdx = 5
      for (let i = 0; i < fillColorIdx; i++) { // rotates the array to have a different fillColor
        rulesC.push(rulesC.shift());
      }
      rulesD = [turn_L, turn_R, turn_L, turn_R, turn_L, turn_R];
}

function preset6() {
  // spiral pattern LRLRLR SUPER SICK
      presetInfo =
        "Preset 6: <br>Very interesting spiral pattern that repeats. <br>Rules: 4 ants, LRLRLR<br>Colors: <a href='https://lospec.com/palette-list/curiosities'>curiosities Pallete</a>";
      W = 100;
      H = 100;
      SF = 4;
      ipr = 3;
      wrap = true;
      ants = [
        [50, 45, dir_D],
        [55, 50, dir_L],
        [50, 55, dir_U],
        [45, 50, dir_R],
      ];
      let pallete = "curiosities"
      rulesC = palletes[pallete].colors
      let fillColorIdx = 0
      for (let i = 0; i < fillColorIdx; i++) { // rotates the array to have a different fillColor
        rulesC.push(rulesC.shift());
      }
      rulesD = [turn_L, turn_R, turn_L, turn_R, turn_L, turn_R];
}

function preset7() {
  // big triangular prism RRLLLRLLLRRR
      presetInfo =
        "Preset 7:<br>Creates a filled triangle shape that grows and moves after 15900~ iterations<br>Rules: RRLLLRLLLRRR<br>Colors: <a href='https://lospec.com/palette-list/everglow-diamond'>Everglow Diamond Pallete</a>";
      W = 400;
      H = 400;
      SF = 1;
      ipr = 30;
      wrap = true;
      ants = [[200,200, dir_U]];
      let pallete = "Everglow Diamond"
      rulesC = palletes[pallete].colors
      let fillColorIdx = 0
      for (let i = 0; i < fillColorIdx; i++) { // rotates the array to have a different fillColor
        rulesC.push(rulesC.shift());
      }
      rulesD = [
        turn_R,
        turn_R,
        turn_L,
        turn_L,
        turn_L,
        turn_R,
        turn_L,
        turn_L,
        turn_L,
        turn_R,
        turn_R,
        turn_R,
      ];
}

function preset8(){
  // RLR chaotic growth, no highway confirmed
      presetInfo =
        "Preset 8:<br>Chaotic growth with no confirmed highway<br>Rules: RLR <br>Colors: <a href='https://lospec.com/palette-list/1-bit-styx'>1bit-styx Pallete</a>";
      W = 200;
      H = 200;
      SF = 2;
      ipr = 25;
      wrap = true;
      ants = [[100, 100, dir_U]];
      let pallete = "1bit-styx"
      rulesC = palletes[pallete].colors
      let fillColorIdx = 2
      for (let i = 0; i < fillColorIdx; i++) { // rotates the array to have a different fillColor
        rulesC.push(rulesC.shift());
      }
      // // alternate palettes, BumbleBit, 1bit-styx, Mystique life 3, Blue Snow, Minimal-Red-3
      rulesD = [turn_R, turn_L, turn_R];
}

function preset9(){
  // LLRRRLRLRLLR "creates a convoluted highway" 🤓
      presetInfo =
        "Preset 9:<br>Creates a convoluted highway.<br>Rules: LLRRRLRLRLLR<br>Colors: <a href='https://lospec.com/palette-list/ghost-town'>Ghost Town Pallete</a>";
      W = 200;
      H = 200;
      SF = 2;
      ipr = 50;
      wrap = true;
      ants = [[100, 100, dir_D]];
      let pallete = "Ghost Town"
      rulesC = palletes[pallete].colors
      let fillColorIdx = 3
      for (let i = 0; i < fillColorIdx; i++) { // rotates the array to have a different fillColor
        rulesC.push(rulesC.shift());
      }
      rulesD = [
        turn_L,
        turn_L,
        turn_R,
        turn_R,
        turn_R,
        turn_L,
        turn_R,
        turn_L,
        turn_R,
        turn_L,
        turn_L,
        turn_R,
      ];
}

function preset10(){
  //// LRRRRRLLR "fills itself in a square"
      presetInfo =
        "Preset 10:<br>Fills space in a square around itself.<br>Rules: LRRRRRLLR <br>Colors: <a href='https://lospec.com/palette-list/white-scape'>White Scape Pallete</a>";
      W = 200;
      H = 200;
      SF = 2;
      wrap = true;
      ipr = 50;
      ants = [[100,100, dir_D]];
      let pallete = "White Scape"
      rulesC = palletes[pallete].colors
      let fillColorIdx = 0
      for (let i = 0; i < fillColorIdx; i++) { // rotates the array to have a different fillColor
        rulesC.push(rulesC.shift());
      } // alternate palletes, BASIC BIT, ABYSS-9, BloodMoon21
      rulesD = [
        turn_L,
        turn_R,
        turn_R,
        turn_R,
        turn_R,
        turn_R,
        turn_L,
        turn_L,
        turn_R,
      ];
}

function preset11(){
  presetInfo =
        "Preset 11:<br>The standard Langton's Ant, but 4 times. Oscillates infintely within a finite space<br>Rules: 4 ants, LR <br>Colors: <a href='https://lospec.com/palette-list/bitbee'>Bitbee Pallete</a>";
      wrap = false;
      W = 100;
      H = 100;
      SF = 4;
      ipr = 3;
      ants = [
        [57, 57, dir_U],
        [57, 43, dir_L],
        [43, 43, dir_D],
        [43, 57, dir_R],
      ];
      let pallete = "Bitbee"
      rulesC = palletes[pallete].colors
      let fillColorIdx = 0
      for (let i = 0; i < fillColorIdx; i++) { // rotates the array to have a different fillColor
        rulesC.push(rulesC.shift());
      }
      rulesD = [turn_R, turn_L];
}

function preset12(){
  presetInfo =
        "Preset 12:<br>Another interesting oscillator, preset 6 copied 4 times. Repeats after 165,000 iterations. <br>Rules: 16 ants, LRLRLR <br>Colors: <a href='https://lospec.com/palette-list/autumn-decay'>Autumn Decay Pallete</a>";
      wrap = true;
      W = 200;
      H = 200;
      SF = 2;
      ipr = 100;
      ants = [
        [50, 45, dir_D],
        [55, 50, dir_L],
        [50, 55, dir_U],
        [45, 50, dir_R],
        [150, 45, dir_D],
        [155, 50, dir_L],
        [150, 55, dir_U],
        [145, 50, dir_R],
        [150, 145, dir_D],
        [155, 150, dir_L],
        [150, 155, dir_U],
        [145, 150, dir_R],
        [50, 145, dir_D],
        [55, 150, dir_L],
        [50, 155, dir_U],
        [45, 150, dir_R]
      ];
      let pallete = "Autumn Decay"
      rulesC = palletes[pallete].colors
      let fillColorIdx = 0
      for (let i = 0; i < fillColorIdx; i++) { // rotates the array to have a different fillColor
        rulesC.push(rulesC.shift());
      }
      rulesD = [turn_L, turn_R, turn_L, turn_R, turn_L, turn_R];

}

function preset13(){
   presetInfo =
        "Preset 13:<br>Interesting cross pattern with linear highways and a knot in the middle<br>Rules: ULNR <br>Colors: <a href='https://lospec.com/palette-list/nostalgia'>Nostalgia Pallete</a>";
      wrap = true;
      W = 400;
      H = 400;
      SF = 1;
      ipr = 25;
      ants = [[50, 50, dir_U]]
      let pallete = "Nostalgia"
      rulesC = palletes[pallete].colors
      let fillColorIdx = 0
      for (let i = 0; i < fillColorIdx; i++) { // rotates the array to have a different fillColor
        rulesC.push(rulesC.shift());
      }
      rulesD = [turn_U, turn_L, turn_N, turn_R];
}

function preset14() {
      presetInfo =
        "Preset 14:<br>Falls into a pattern of making Archimedes' spiral, surrounded by a solid square of cells.<br>Rules: LRRRRLLLRRR <br>Colors:  <a href='https://lospec.com/palette-list/mother-nature'>Mother nature Pallete</a>";
      wrap = false;
      W = 400;
      H = 400;
      SF = 1;
      ipr = 25;
      ants = [[50, 50, dir_R]];
      let pallete = "Mother nature"
      rulesC = palletes[pallete].colors
      let fillColorIdx = 0
      for (let i = 0; i < fillColorIdx; i++) { // rotates the array to have a different fillColor
        rulesC.push(rulesC.shift());
      }
      rulesD = [turn_L, turn_R, turn_R, turn_R, turn_R, turn_L, turn_L, turn_L, turn_R, turn_R, turn_R];
}

function preset15() {
  //RLLLLRRRLLLR
  //Falls into a pattern of making a logarithmic spiral, surrounded by a solid square of cells.
}

let presets = [preset0, preset1, preset2, preset3, preset4, preset5, preset6, preset7, preset8, preset9, preset10, preset11, preset12, preset13, preset14, preset15]
