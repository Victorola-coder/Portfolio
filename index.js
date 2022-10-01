const fullName = document.querySelector('.name');
const email = document.querySelector('.email');
const subject = document.querySelector('.subject');
const body = document.querySelector('.text');
const button = document.querySelector('.button');
const error = document.querySelector('.error');
const success = document.querySelector('.success');
const form = document.querySelector('form');

const allsections = document.querySelectorAll('.section');
//allsections.classList.add('section--hidden')
const revealSection = function (entries, observer) {
    const [entry] = entries;
    //console.log(entry)

    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
};

const sectionobserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
});
allsections.forEach(function (section) {
    sectionobserver.observe(section);
    section.classList.add('section--hidden');
});

button.addEventListener('click', (e) => {
    e.preventDefault();
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (
        fullName.value.length == 0 ||
        subject.value.length == 0 ||
        body.value.length == 0
    ) {
        error.style.display = 'block';
        error.innerHTML = 'All fields are required!🙄';
        setTimeout(() => {
            error.style.display = 'none';
        }, 1500);
        return;
    }

    if (re.test(String(email.value).toLowerCase()) !== true) {
        error.innerHTML = 'Invalid Email syntax!';
        error.style.display = 'block';
        setTimeout(() => {
            error.innerHTML = '';
            error.style.display = 'none';
        }, 1500);
    }

    $.ajax({
        async: true,
        url: 'https://victorola.herokuapp.com/api/email',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: {
            subject: subject.value,
            email: email.value,
            message: body.value,
            name: fullName.value,
        },
        success: async (data) => {
            // error.innerHTML = 'Your Message has been sent.😊'
            error.innerHTML = '';
            error.style.display = 'none';
            success.style.display = 'block';

            setTimeout(() => {
                fullName.value = '';
                subject.value = '';
                email.value = '';
                body.value = '';
                success.style.display = 'none';
            }, 4000);
        },
        error: (err) => {
            error.innerHTML = err.responseJSON.message;
            error.style.display = 'block';
            setTimeout(() => {
                fullName.value = '';
                subject.value = '';
                email.value = '';
                body.value = '';
                error.style.display = 'none';
            }, 4000);
        },
    });

    if (fullName.value || email.value || body.value || subject.value !== '') {
        form.reset();
    }
});

var typed = new Typed('.anim', {
    strings: [
        'Web Developer',
        'Software Developer',
        'Graphic Designer',
        ' Video Editor',
        'Freelancer',
        'Student',
    ],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true,
});
