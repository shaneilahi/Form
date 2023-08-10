const tl = gsap.timeline({defaults: {
  duration: 0.5
}});

const inputContainers = document.querySelectorAll('.input-container');
const start = "M0 0.999512C0 0.999512 60.5 0.999512 150 0.999512C239.5 0.999512 300 0.999512 300 0.999512";
const end = "M1 0.999512C1 0.999512 61.5 7.5 151 7.5C240.5 7.5 301 0.999512 301 0.999512";

inputContainers.forEach(container => {
  const placeholder = container.querySelector('.placeholder');
  const input = container.querySelector('.input');
  const line = container.querySelector('.elastic-line');

  input.addEventListener('focus', () => {
    // check if there is any text inside input
    if (!input.value) {
      tl.fromTo(line, {attr: {d: start}}, {attr: {d: end}, duration: 0.75, ease: "Power2.easeOut"});
      tl.to(line, {attr: {d: start}, ease: 'elastic.out(3, 0.5)'}, '<50%');
      tl.to(placeholder, {top: -15, left: 0, scale: 0.85, ease: 'Power2.easeOut'}, '<15%');
    }
  });

  input.addEventListener('blur', () => {
    // check if there is any text inside input
    if (!input.value) {
      tl.to(placeholder, {top: 0, left: 0, scale: 1, ease: 'Power2.easeOut', duration: 0.5});
    }
  });


  input.addEventListener('input', event => {
    // Name validation
    if (event.target.type === 'text') {
      let inputText = event.target.value;
      if (inputText.length > 2) {
        colorize('#6391E8', line, placeholder);
      } else {
        colorize('#F38C99', line, placeholder);
      }
    }
    // Email validation
    if (event.target.type === 'email') {
      let valid = validateEmail(event.target.value);
      if (valid) {
        colorize('#6391E8', line, placeholder);
      } else {
        colorize('#F38C99', line, placeholder);
      }
    }
    // PPhone validation
    if (event.target.type === 'tel') {
      let valid = validatePhone(event.target.value);
      if (valid) {
        colorize('#6391E8', line, placeholder);
      } else {
        colorize('#F38C99', line, placeholder);
      }
    }
  });

})

// checking email validation

function validateEmail(email) {
  let re = /\S+@\S+\.\S+/;
  return re.test(email);
}
function validatePhone(phone) {
  let re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return re.test(phone);
}

function colorize(color, line, placeholder) {
  gsap.to(line, {stroke: color, duration: 0.75});
  gsap.to(placeholder, {color: color, duration: 0.75});
}


// cheeckbox animation fill
const checkbox = document.querySelector('.checkbox');

const tl2 = gsap.timeline({defaults: {
  duration: 0.5, 
  ease: 'power3.out'
}});

const tickMarkPath = document.querySelector('.tick-mark path');
const pathLength = tickMarkPath.getTotalLength();

gsap.set(tickMarkPath, {strokeDashoffset: pathLength, strokeDasharray: pathLength});

checkbox.addEventListener('click', (event) => {
  const currentCheck = event.target.checked;
  console.log(currentCheck);
  if (currentCheck == true) {
    tl2.to('.checkbox-fill', {top: '0%'});
    tl2.fromTo(tickMarkPath, {strokeDashoffset: pathLength}, {strokeDashoffset: 0}, '<50%');
    tl.to('.checkbox-label', {color: '#6391e8'}, '<');
  } else if (currentCheck == false){
    tl2.to('.checkbox-fill', {top: '100%'});
    tl2.fromTo(tickMarkPath, {strokeDashoffset: 0}, {strokeDashoffset: pathLength},'<50%');
    tl.to('.checkbox-label', {color: 'rgb(119, 116, 116)'}, '<');
  } 
});

// Animating character
gsap.set('#eye', {transformOrigin: 'center'});
gsap.fromTo('#eye', {scaleY: 1}, {scaleY: 0.3, repeat: -1, yoyo: true, repeatDelay: 0.5, ease: 'Power2.easeOut'});
gsap.fromTo('#eyebrow', {y: 0}, {y: 1, repeat: -1, yoyo: true, repeatDelay: 0.5, ease: 'Power2.easeOut'});

//Submit button
const button = document.querySelector('button');
const tl3 = gsap.timeline({defaults: {duration: 0.75, ease: 'Power2.easeOut'}});

button.addEventListener('click', event => {
  event.preventDefault();
  tl.to('.contact-left, .contact-right', {y: 30, opacity: 0, pointerEvents: 'none'});
  tl.to('form', {scale: 0.8}, '<');
  tl.fromTo('.submitted', {y: 30, opacity: 0}, {y: 0, opacity: 1});

  // hand wave
  // gsap.to('#hand', {x: -1});
  // gsap.set('#hand', {transformOrigin: 'left'});
  gsap.fromTo('#hand', {y: 0, rotation: 0}, {y:2,x: -7, rotation: -10, yoyo: true, repeat: -1});
});