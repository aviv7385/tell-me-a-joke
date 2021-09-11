const button = document.getElementById('button');
const audioElement = document.getElementById('audio');


// disable/enable button
function toggleButton() {
    button.disabled = !button.disabled;
}


// passing our joke to the voice rss api
function tellMe(joke) {
    console.log(joke);
    VoiceRSS.speech({
        key: '187f56c0f20442d7b1dec65c9b349eff',
        src: joke,
        hl: 'en-gb',
        v: 'Nancy',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}


// Get Jokes from joke API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        }
        else {
            joke = data.joke;
        }
        // text-to-speech
        tellMe(joke);
        // once the audio starts - disable the button 
        toggleButton();
    }

    catch (err) {
        console.log('fetch failed', err);
    }
}

// event listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton); // once the audio ends - enable the button
