const RANDOM_QUOTE_API_URL = 'https://fish-text.ru/get?type=1&number=3'

const random_quote_element = document.getElementById('random_quote')
const textarea_quote_element = document.getElementById('textarea_quote')
const another_quote_button = document.getElementById('another_quote')
const timerElement = document.getElementById('timer')

function get_random_quote() {
    return fetch(RANDOM_QUOTE_API_URL)
        .then(response => response.json())
        .then(data => data.text)
}

async function render_new_quote() {
    const quote = await get_random_quote()
    random_quote_element.innerText = ''
    quote.split('').forEach(char => {
        const char_span = document.createElement('span')
        char_span.innerText = char
        random_quote_element.appendChild(char_span)
    })
    textarea_quote_element.value = null
    timerElement.style.display = 'none'
    timer_stop = false
    start_timer()
}

textarea_quote_element.addEventListener('input', () => {
    const array_chars = random_quote_element.querySelectorAll('span')
    const array_value = textarea_quote_element.value.split('')
    const correct = true
    array_chars.forEach((charSpan, index) => {
        const char = array_value[index]

        if(char == null) {
            charSpan.classList.remove('correct')
            charSpan.classList.remove('incorrect')
            correct = false
        }

        else if (char === charSpan.innerText) {
            charSpan.classList.add('correct')
            charSpan.classList.remove('incorrect')
        } else {
            charSpan.classList.add('incorrect')
            charSpan.classList.remove('correct')
            correct = false
        }
    })
    if (correct) {
        timerElement.style.display = 'flex'
        timer_stop = true
    }
})

another_quote_button.addEventListener('click', () => {
    render_new_quote()
})

let start_time
let timer_stop = false;

function start_timer() {
    timerElement.innerText = `${0} сек`
    start_time = new Date()

    setInterval(() => {
        if (!timer_stop) {
            timerElement.innerText = `${random_quote_element.innerText.length} символов за  ${get_timer_time()} сек`
        }
    }, 1000)
    
}

function get_timer_time() {
    return Math.floor((new Date() - start_time) / 1000)
}

render_new_quote()