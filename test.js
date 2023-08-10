const tl = gsap.timeline({defaults: {
  duration: 1
}});

// const checkbox = document.querySelector('.checkbox');
// checkbox.addEventListener('click', (event) => {
//   const currentCheck = event.target.checked;
//   console.log(currentCheck);
//   if (currentCheck == true) {
//     tl.to('.checkbox-fill', {top: '0%'});
//   } else if (currentCheck == false){
//     tl.to('.checkbox-fill', {top: '100%'});
//   } 
// })

const inputContainers = document.querySelectorAll('.input-container');
const form = document.querySelector('form');
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
});

// Revert back 
form.addEventListener('click', () => {
  inputContainers.forEach(container => {
    const placeholder = container.querySelector('.placeholder');
    const input = container.querySelector('.input');
    const line = container.querySelector('.elastic-line');

    if (document.activeElement !== input) {
      if (!input.value) {
        gsap.to(placeholder, {top: 0, left: 0, scale: 1, duration: 0.5, ease: 'Power2.easeOut'});
      }
    }
  
    input.addEventListener("input", e => {
      if (e.target.type === "text") {
        let inputText = e.target.value;
        if (inputText.length > 2) {
          colorize('#6391E8', line, placeholder);
        } else {
          colorize('#F38C99', line, placeholder);
        }
      }
      //Valid Eemail
      if (e.target.type == "email") {
        let valid = validateEmail(e.target.value);
        if (valid) {
          colorize('#6391E8', line, placeholder);
        } else {
          colorize('#F38C99', line, placeholder);
        }
      }
      //valid phone
      if (e.target.type == "tel") {
        let valid = validatePhone(e.target.value);
        if (valid) {
          colorize('#6391E8', line, placeholder);
        } else {
          colorize('#F38C99', line, placeholder);
        }
      }
    });
  });
});


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