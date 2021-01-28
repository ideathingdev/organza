let differenceY = 0
let masterDiffY = 0
let masterDiffYInv
let positionYArray = [0]

let differenceX = 0
let masterDiffX = 0
let masterDiffXInv
let positionXArray = [0]

var pos = new THREE.Vector3();
var wear;
var ref;
var dress;
//var floc;
var back;
var face;
var off;

 AFRAME.registerComponent('neck', {
  init: function () {
   // console.log('Hello, World!');
    // const main = document.getElementById('main')
     ref = document.getElementById('main')
     dress = document.getElementById('o1')
    // floc = document.getElementById('o2')
     back = document.getElementById('o3')
     face = document.getElementById('my-face-tracker')
     off = document.getElementById('off')
     console.log('hi')
  },

tick: (function () {
    const position = new THREE.Vector3();
    const rotation = new THREE.Quaternion();
    const euler = new THREE.Euler();
    const matrix = new THREE.Matrix4();

          face.object3D.updateMatrixWorld();
        position.setFromMatrixPosition(face.object3D.matrixWorld); // Vector3
        rotation.setFromRotationMatrix(matrix.extractRotation(face.object3D.matrixWorld ));
      /// ////////////////
      // NECK PLACEMENT//
      /// //////////////
      //console.log(position)

      const rX = rotation.x
      const rY = rotation.y
      const rZ = rotation.z
      let rW = -rotation.w  // y axis
      // ROTATION
      // ref.object3D.quaternion.set(rX, rY, rZ, rW)
      const pX = position.x + (rY * -0.35) + (rZ)
      const pY = position.y + rX
      const pZ = position.z 
      // position
      ref.object3D.position.set(pX, pY, pZ)
      // ref.object3D.position.setFromMatrixPosition(face.object3D.matrixWorld)

     /// //////////////
      // MORPHING YYYYYYYY///////
      /// //////////////

      if (positionYArray.length >= 5) {
        positionYArray.shift()  // remove first
      }

      positionYArray.push(position.y)

      if (positionYArray.length >= 4) {
        differenceY = positionYArray[positionYArray.length - 1] - positionYArray[0]

        // masterDiffY +=  differenceY*3

        if (differenceY > 0.008) {
          masterDiffY += 0.03 + differenceY * 0.5
          if (masterDiffY > 1) {
            masterDiffY = 1
          }
        } else if (differenceY > -0.008 && differenceY < 0.008) {
          if (masterDiffY > 0) {
            masterDiffY -= 0.05
          } else if (masterDiffY < 0) {
            masterDiffY += 0.05
          }
        } else if (differenceY < -0.008) {
          masterDiffY -= 0.03 + differenceY * -0.5
          if (masterDiffY < -1) {
            masterDiffY = -1
          }
        }
      }

      //console.log(differenceY)
      // MOVE UPWARD
      if (masterDiffY > 0) {
        if (masterDiffY < 0) {
          masterDiffY = 0
        }
        dress.setAttribute('gltf-morph__run', `morphtarget: up; value:${masterDiffY}`)
        //floc.setAttribute('gltf-morph__run', `morphtarget: up; value:${masterDiffY}`)
        back.setAttribute('gltf-morph__run', `morphtarget: up; value:${masterDiffY}`)
      } else if (masterDiffY < 0) {
        masterDiffYInv = masterDiffY * -1
        dress.setAttribute('gltf-morph__dwn', `morphtarget: down; value:${masterDiffYInv}`)
       // floc.setAttribute('gltf-morph__dwn', `morphtarget: down; value:${masterDiffYInv}`)
        back.setAttribute('gltf-morph__dwn', `morphtarget: down; value:${masterDiffYInv}`)
      }

/////////////////////XXXXXXXXXXXXXXXXXXXXX///////////////////////////////


      if (positionXArray.length >= 5) {
        positionXArray.shift()  // remove first
      }

      positionXArray.push(position.x)

      if (positionXArray.length >= 4) {
        differenceX = positionXArray[positionXArray.length - 1] - positionXArray[0]

        // masterDiffY +=  differenceY*3

        if (differenceX > 0.005) {
          masterDiffX += 0.03 + differenceX * 0.5
          if (masterDiffX > 1) {
            masterDiffX = 1
          }
        } else if (differenceX > -0.005 && differenceX < 0.005) {
          if (masterDiffX > 0) {
            masterDiffX -= 0.05
          } else if (masterDiffX < 0) {
            masterDiffY += 0.05
          }
        } else if (differenceX < -0.005) {
          masterDiffX -= 0.03 + differenceX * -0.5
          if (masterDiffX < -1) {
            masterDiffX = -1
          }
        }
      }

     // console.log(masterDiffX)
      // MOVE UPWARD
      if (masterDiffX > 0) {
        if (masterDiffX < 0) {
          masterDiffX = 0
        }
        dress.setAttribute('gltf-morph__left', `morphtarget: left; value:${masterDiffX}`)
       // floc.setAttribute('gltf-morph__left', `morphtarget: left; value:${masterDiffX}`)
        back.setAttribute('gltf-morph__left', `morphtarget: left; value:${masterDiffX}`)
      } else if (masterDiffX < 0) {
        masterDiffXInv = masterDiffX * -1
        dress.setAttribute('gltf-morph__right', `morphtarget: right; value:${masterDiffXInv}`)
       // floc.setAttribute('gltf-morph__right', `morphtarget: right; value:${masterDiffXInv}`)
        back.setAttribute('gltf-morph__right', `morphtarget: right; value:${masterDiffXInv}`)
      } 

      // END SHOW
   

}) 
})

  // HIDE
function hide() {
    positionYArray.length = 0
  }