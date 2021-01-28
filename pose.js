var sizeidx = false
var posidx = false
var lightidx = false



//////////////////////////////////////
/////////POSITION/////////////////////

AFRAME.registerComponent('poser', {
  init: function () {
  
       // html elements
      const container = document.getElementById('pos-slider-over')
      const slider = document.getElementById('pos-slider-bar')
      const handle = document.getElementById('pos-slider-handle')
      const button = document.getElementById('posButton')
      const path = document.getElementById('posPath')

//altri slider da nascondere
 const xcontainer = document.getElementById('size-slider-over')
  const xbutton = document.getElementById('sizeButton')
const ycontainer = document.getElementById('light-slider-over')
  const ybutton = document.getElementById('lightButton')

//OBJECT TO SCALE
          const cap = document.getElementById('cap')
          //Initial pos
         const initX = 0
         const initY = -0.1
         const initZ = 0.25
          var newX;
          var newY;
          var newZ;
          

      // initial values
      const minVal = -0.5
      const maxVal = 0.5

      const range = maxVal - minVal
     var isSliding = false

      var mouseY = 0
      var containerTop = 0
      var newHeight = 0
      var containerHeight = 0
      var percentHght = 0
      var x = 0
      var y = 0
      var sliderValue = 0
      percentHght = 50
      slider.style.height = `${percentHght}%`
      y = 100 - percentHght
      // QUI SOTTO
      x = (y * range) / 100

      sliderValue = Math.round(x)
      
      // BUTTON
 

 button.style.display = 'block'
    
    let idx = 0 // Start with the 2nd animation because the model starts with idle animation
    const nextAnimation = () => {
      
      //succede
      if ( posidx === false ) {
        posidx = true
        //path.setAttribute('d', 'M4.27 3L3 4.27L12 13.27V13.55C11.41 13.21 10.73 13 10 13C7.79 13 6 14.79 6 17S7.79 21 10 21 14 19.21 14 17V15.27L19.73 21L21 19.73L4.27 3M14 7H18V3H12V8.18L14 10.18Z')
          container.style.display = 'block'
          button.style.color= '#77f273'
         sizeidx = false
           xcontainer.style.display = 'none'
            xbutton.style.color= '#FFF'
     lightidx = false
           ycontainer.style.display = 'none'
            ybutton.style.color= '#FFF'
            
          
      } else { 
        
          posidx = false
          container.style.display = 'none'
          button.style.color= '#FFF'
      }
      
    }
    button.onclick = nextAnimation // 

      // the sliding function
      const move = function (e) {
        if (!e) { 
          e = window.event}

        if (e.pageY) {  // all browsers except IE before version 9
          mouseY = e.pageY
        } else if (e.clientY) {  // IE before version 9
          mouseY = e.clientY
        }

        containerTop = container.offsetTop
        newHeight = mouseY - containerTop
        containerHeight = container.offsetHeight
        percentHght = (newHeight * 100) / containerHeight

        if ((percentHght <= 100) && (percentHght >= 0)) {
          slider.style.height = `${percentHght}%`
          y = 100 - percentHght
          x = (y * range) / 100
        } else if (percentHght < 0) {
          percentHght = 0
          slider.style.height = `${percentHght}%`
          y = 100 - percentHght
          x = (y * range) / 100
        } else if (percentHght > 100) {
          percentHght = 100
          slider.style.height = `${percentHght}%`
          y = 100 - percentHght
          x = (y * range) / 100
        }
        sliderValue = x + minVal
        newX = initX //* sliderValue
        newY = initY + sliderValue
        newZ = initZ //* sliderValue
        cap.setAttribute('position', {x: newX, y: newY, z: newZ}) 
       
      }

      // adding the slide functionality
      const addSlide = function () {
        isSliding = true
        if (!window.addEventListener) {
          document.attachEvent('onpointermove', move)
        } else {
          document.addEventListener('pointermove', move, false)
        }
      }

      // removing the slide functionality
      const cancelSlide = function () {
        if (isSliding) {
          if (window.removeEventListener) {
            document.removeEventListener('pointermove', move, false)
          } else if (window.detachEvent) {
            document.detachEvent('onpointermove', move)
          }
        }
      }

      // cancelling event bubbling
      // cancelling default event action
      const cancelBubble = function (e) {
        const evt = e || window.event

        if (evt.stopPropogation) {
          evt.stopPropogation()
        }

        if (evt.cancelBubble != null) {
          evt.cancelBubble = true
        }

        if (evt.preventDefault) {
          evt.preventDefault()
        } else {
          evt.returnValue = false
        }
      }

      // capture events
      // capturing the mousedown on the handle
      handle.onpointerdown= function (e) {
        addSlide()
        cancelBubble(e)
      }

      // capture the mouseup on the handle
      handle.onpointerup = function (e) {
        cancelSlide()
        cancelBubble(e)
      }

      // capture the mouse up on the slider
      slider.onpointerup = function (e) {
        cancelSlide()
        cancelBubble(e)
      }

      // capture the mouse down on the slider
      slider.onpointerdown = function (e) {
        move(e)
        addSlide()
        cancelBubble(e)
      }

      // capture the mouse up on the container
      container.onpointerup = function (e) {
        cancelSlide()
        cancelBubble(e)
      }

      // capture the mouse down on the container
      container.onpointerdown = function (e) {
        move(e)
        addSlide()
        cancelBubble(e)
      }

      // capture the mouse up on the window
      document.onpointerup = function (e) {
        cancelSlide()
        cancelBubble(e)
      }

    }
  });


///////////////////////////////////////
//SCALER/////////////////////////////
/////////////////////////////////////
AFRAME.registerComponent('scaler', {
  init: function () {
       // html elements
      const container = document.getElementById('size-slider-over')
      const slider = document.getElementById('size-slider-bar')
      const handle = document.getElementById('size-slider-handle')

//other slider to hide
     //altri slider da nascondere
 const xcontainer = document.getElementById('pos-slider-over')
  const xbutton = document.getElementById('posButton')
      const ycontainer = document.getElementById('light-slider-over')
  const ybutton = document.getElementById('lightButton')
      //OBJECT TO SCALE
          const cap = document.getElementById('cap')
          //Initial scale
         const initX = 1
         const initY = 1
         const initZ = 1
          var newX;
          var newY;
          var newZ;
          

      // initial values
      const minVal = 0.7
      const maxVal = 1.3

      const range = maxVal - minVal
     var isSliding = false

      var mouseY = 0
      var containerTop = 0
      var newHeight = 0
      var containerHeight = 0
      var percentHght = 0
      var x = 0
      var y = 0
      var sliderValue = 0
      percentHght = 50
      slider.style.height = `${percentHght}%`
      y = 100 - percentHght
      // QUI SOTTO
      x = (y * range) / 100

      sliderValue = Math.round(x)
      
      // BUTTON
 const button = document.getElementById('sizeButton')
     const path = document.getElementById('sizePath')
  

 button.style.display = 'block'
    
    let idx = 0 // Start with the 2nd animation because the model starts with idle animation
    const nextAnimation = () => {
      
      //succede
      if(sizeidx === false ) {
        sizeidx = true
        //path.setAttribute('d', 'M4.27 3L3 4.27L12 13.27V13.55C11.41 13.21 10.73 13 10 13C7.79 13 6 14.79 6 17S7.79 21 10 21 14 19.21 14 17V15.27L19.73 21L21 19.73L4.27 3M14 7H18V3H12V8.18L14 10.18Z')
          container.style.display = 'block'
            button.style.color= '#77f273'
       
         posidx = false
         xcontainer.style.display = 'none'
            xbutton.style.color= '#FFF'

                lightidx = false
           ycontainer.style.display = 'none'
            ybutton.style.color= '#FFF'
      } else { 
        
          sizeidx = false
          container.style.display = 'none'
           button.style.color= '#FFF'
      }
      
    }
    button.onclick = nextAnimation // 

      // the sliding function
      const move = function (e) {
        if (!e) { 
          e = window.event}

        if (e.pageY) {  // all browsers except IE before version 9
          mouseY = e.pageY
        } else if (e.clientY) {  // IE before version 9
          mouseY = e.clientY
        }

        containerTop = container.offsetTop
        newHeight = mouseY - containerTop
        containerHeight = container.offsetHeight
        percentHght = (newHeight * 100) / containerHeight

        if ((percentHght <= 100) && (percentHght >= 0)) {
          slider.style.height = `${percentHght}%`
          y = 100 - percentHght
          x = (y * range) / 100
        } else if (percentHght < 0) {
          percentHght = 0
          slider.style.height = `${percentHght}%`
          y = 100 - percentHght
          x = (y * range) / 100
        } else if (percentHght > 100) {
          percentHght = 100
          slider.style.height = `${percentHght}%`
          y = 100 - percentHght
          x = (y * range) / 100
        }
        sliderValue = x + minVal
        newX = initX * sliderValue
        newY = initY * sliderValue
        newZ = initZ * sliderValue
        cap.setAttribute('scale', {x: newX, y: newY, z: newZ}) 
       
      }

      // adding the slide functionality
      const addSlide = function () {
        isSliding = true
        if (!window.addEventListener) {
          document.attachEvent('onpointermove', move)
        } else {
          document.addEventListener('pointermove', move, false)
        }
      }

      // removing the slide functionality
      const cancelSlide = function () {
        if (isSliding) {
          if (window.removeEventListener) {
            document.removeEventListener('pointermove', move, false)
          } else if (window.detachEvent) {
            document.detachEvent('onpointermove', move)
          }
        }
      }

      // cancelling event bubbling
      // cancelling default event action
      const cancelBubble = function (e) {
        const evt = e || window.event

        if (evt.stopPropogation) {
          evt.stopPropogation()
        }

        if (evt.cancelBubble != null) {
          evt.cancelBubble = true
        }

        if (evt.preventDefault) {
          evt.preventDefault()
        } else {
          evt.returnValue = false
        }
      }

      // capture events
      // capturing the mousedown on the handle
      handle.onpointerdown = function (e) {
        addSlide()
        cancelBubble(e)
      }

      // capture the mouseup on the handle
      handle.onpointerup = function (e) {
        cancelSlide()
        cancelBubble(e)
      }

      // capture the mouse up on the slider
      slider.onpointerup = function (e) {
        cancelSlide()
        cancelBubble(e)
      }

      // capture the mouse down on the slider
      slider.onpointerdown = function (e) {
        move(e)
        addSlide()
        cancelBubble(e)
      }

      // capture the mouse up on the container
      container.onpointerup = function (e) {
        cancelSlide()
        cancelBubble(e)
      }

      // capture the mouse down on the container
      container.onpointerdown = function (e) {
        move(e)
        addSlide()
        cancelBubble(e)
      }

      // capture the mouse up on the window
      document.onpointerup = function (e) {
        cancelSlide()
        cancelBubble(e)
      }

    }
  });

///////////////////////////////////////
//lights/////////////////////////////
/////////////////////////////////////
AFRAME.registerComponent('lighter', {
  init: function () {
       // html elements
      const container = document.getElementById('light-slider-over')
      const slider = document.getElementById('light-slider-bar')
      const handle = document.getElementById('light-slider-handle')

//other slider to hide
     //altri slider da nascondere
 const xcontainer = document.getElementById('pos-slider-over')
  const xbutton = document.getElementById('posButton')
const ycontainer = document.getElementById('size-slider-over')
  const ybutton = document.getElementById('sizeButton')
  
      
      //OBJECT TO MANIPULATE
           const lightDir = document.getElementById('luce1')
    const lightAm = document.getElementById('luce2')
     const lightPo = document.getElementById('luce3')

       const button = document.getElementById('lightButton')
    const path = document.getElementById('myPath')
         
          //Initial lights

         const initX = 2
         const initY = 1.5
         const initZ = 1
          var newX;
          var newY;
          var newZ;
          

      // initial values
      const minVal = 0
      const maxVal = 2

      const range = maxVal - minVal
     var isSliding = false

      var mouseY = 0
      var containerTop = 0
      var newHeight = 0
      var containerHeight = 0
      var percentHght = 0
      var x = 0
      var y = 0
      var sliderValue = 0
      percentHght = 50
      slider.style.height = `${percentHght}%`
      y = 100 - percentHght
      // QUI SOTTO
      x = (y * range) / 100

      sliderValue = Math.round(x)
      
 button.style.display = 'block'
    
    const nextAnimation = () => {
      
      //succede
      if(lightidx === false ) {
        lightidx = true
          container.style.display = 'block'
            button.style.color= '#77f273'
       
         posidx = false
         xcontainer.style.display = 'none'
            xbutton.style.color= '#FFF'

             sizeidx = false
         ycontainer.style.display = 'none'
            ybutton.style.color= '#FFF'
           
      } else { 
        
          lightidx = false
          container.style.display = 'none'
           button.style.color= '#FFF'
      }
      
    }
    button.onclick = nextAnimation // 


      // the sliding function
      const move = function (e) {
        if (!e) { 
          e = window.event}

        if (e.pageY) {  // all browsers except IE before version 9
          mouseY = e.pageY
        } else if (e.clientY) {  // IE before version 9
          mouseY = e.clientY
        }

        containerTop = container.offsetTop
        newHeight = mouseY - containerTop
        containerHeight = container.offsetHeight
        percentHght = (newHeight * 100) / containerHeight

        if ((percentHght <= 100) && (percentHght >= 0)) {
          slider.style.height = `${percentHght}%`
          y = 100 - percentHght
          x = (y * range) / 100
        } else if (percentHght < 0) {
          percentHght = 0
          slider.style.height = `${percentHght}%`
          y = 100 - percentHght
          x = (y * range) / 100
        } else if (percentHght > 100) {
          percentHght = 100
          slider.style.height = `${percentHght}%`
          y = 100 - percentHght
          x = (y * range) / 100
        }
        sliderValue = x + minVal
        newX = initX * sliderValue
        newY = initY * sliderValue
        newZ = initZ * sliderValue

         lightDir.setAttribute('intensity', newX)
       lightAm.setAttribute('intensity', newY) 
          lightPo.setAttribute('intensity', newZ) 
       
       
      }

      // adding the slide functionality
      const addSlide = function () {
        isSliding = true
        if (!window.addEventListener) {
          document.attachEvent('onpointermove', move)
        } else {
          document.addEventListener('pointermove', move, false)
        }
      }

      // removing the slide functionality
      const cancelSlide = function () {
        if (isSliding) {
          if (window.removeEventListener) {
            document.removeEventListener('pointermove', move, false)
          } else if (window.detachEvent) {
            document.detachEvent('onpointermove', move)
          }
        }
      }

      // cancelling event bubbling
      // cancelling default event action
      const cancelBubble = function (e) {
        const evt = e || window.event

        if (evt.stopPropogation) {
          evt.stopPropogation()
        }

        if (evt.cancelBubble != null) {
          evt.cancelBubble = true
        }

        if (evt.preventDefault) {
          evt.preventDefault()
        } else {
          evt.returnValue = false
        }
      }

      // capture events
      // capturing the mousedown on the handle
      handle.onpointerdown = function (e) {
        addSlide()
        cancelBubble(e)
      }

      // capture the mouseup on the handle
      handle.onpointerup = function (e) {
        cancelSlide()
        cancelBubble(e)
      }

      // capture the mouse up on the slider
      slider.onpointerup = function (e) {
        cancelSlide()
        cancelBubble(e)
      }

      // capture the mouse down on the slider
      slider.onpointerdown = function (e) {
        move(e)
        addSlide()
        cancelBubble(e)
      }

      // capture the mouse up on the container
      container.onpointerup = function (e) {
        cancelSlide()
        cancelBubble(e)
      }

      // capture the mouse down on the container
      container.onpointerdown = function (e) {
        move(e)
        addSlide()
        cancelBubble(e)
      }

      // capture the mouse up on the window
      document.onpointerup = function (e) {
        cancelSlide()
        cancelBubble(e)
      }

    }
  });
