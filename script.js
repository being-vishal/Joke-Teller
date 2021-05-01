const button = document.getElementById('button');
const audioElement = document.getElementById('audio');
const textJoke = document.getElementById('textJoke');


// Disable & Enable Button as per requirement
function toggleButton() {
    button.disabled = !button.disabled;
    textJoke.style.display = 'none';
}


// Pass Joke to Voice API
function tellMe(joke) {
    console.log('tell me', joke);
    VoiceRSS.speech({
        // please use your own API key
        key: '45186d70793045b3b7b348ab91eee0ba',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}


// Get Joke From Joke API
async function getJokes() {

    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // Text to Speech
        tellMe(joke);
        // Disable the button
        toggleButton();
        // Joke to text
        textJoke.textContent = joke;
        textJoke.style.display = 'flex';

    } catch (error) {
        console.log('Error ', error);
    }
}


// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);   //Enable the Button