const fullName = document.querySelector('.name')
const email = document.querySelector('.email')
const text = document.querySelector('.text')
const button = document.querySelector('.button')
const error = document.querySelector('.error')
const form = document.querySelector('form')

const allsections = document.querySelectorAll('.section');
//allsections.classList.add('section--hidden')
const revealSection = function(entries, observer) {
    const [entry] = entries;
    //console.log(entry)

    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
}

const sectionobserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
})
allsections.forEach(function(section) {
    sectionobserver.observe(section);
    section.classList.add('section--hidden')
})

button.addEventListener('click', (e) => {
    e.preventDefault()
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (fullName.value.length == 0 || email.value.length == 0 || text.value.length == 0) {
        error.style.display = 'block'
        error.innerHTML = 'All fields are required!🙄'
    }
    setTimeout(() => {
        error.style.display = 'none'
    }, 1500)

    if (re.test(String(email.value).toLowerCase()) !== true) {
        error.innerHTML = "Invalid Email syntax!"
        error.style.display = 'block'
        setTimeout(() => {
            error.innerHTML = ""
            error.style.display = 'none'
        }, 1500)
    }

    try {
        $.ajax({
            async: true,
            url: "https://portfoliobackendservices.herokuapp.com/sendmail",
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: {
                name: fullName.value,
                email: email.value,
                message: text.value,
            },
            success: async(data) => {
                if (data.status == '401') {
                    console.log(data)
                    error.innerHTML = 'Try again later'
                    error.style.display = 'block'
                    setTimeout(() => {
                        error.innerHTML = ""
                        error.style.display = 'none'
                    }, 1500)
                } else {
                    if (data.status == "200") {
                        // error.innerHTML = 'Your Message has been sent.😊'
                        error.style.display = 'block'
                        console.log('Heyy!', data, fullName.value, email.value, text.value)
                        setTimeout(() => {
                            error.innerHTML = ""
                            error.style.display = 'none'
                            fullName.value = '';
                            email.value = ''
                            text.value = ''
                        }, 1500)
                    }
                }
            }
        })
    } catch (error) {
        alert('Something went wrong, Try again later.')
    }
    if (fullName.value && email.value && text.value !== "") {
        form.reset();
    }
})

var typed = new Typed(".anim", {
        strings: ["Web Developer", "Software Developer", "Graphic Designer", "Freelancer", "Student"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

