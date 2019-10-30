// controls
document.querySelector('#start-button').addEventListener('click', () => {
    document.querySelector('.start-dialog').style.display = 'none';
    Spin = false;
    // camera.position.x = 0;
    // camera.position.z = 25;
    // camera.position.y = 15;
    // camera.rotation.y = 0;
});

let isPause = true;
document.querySelector('#play-button').addEventListener('click', () => {
    let songFile = songs.value;
    clear_state();
    MIDI.Player.loadFile(`midi/${songFile}`, MIDI.Player.start);
    document.querySelector('.start-dialog').style.display = 'none';
    document.querySelector('#pause-button').innerHTML = 'Pause';
    isPause = true;
});


document.querySelector('#pause-button').addEventListener('click', (e) => {
    if (isPause){
        e.target.innerHTML = 'Resume';
        MIDI.Player.pause();
        isPause = false;
    }else{
        e.target.innerHTML = 'Pause';
        MIDI.Player.resume();
        isPause = true;
    }
    
});

document.querySelector('#stop-button').addEventListener('click', () => {
    clear_state();
     document.querySelector('#pause-button').innerHTML = 'Pause';
     isPause = true;
    MIDI.Player.stop();
});

document.querySelector('.toggle-button').addEventListener('click', () => {
    document.querySelector('.sidebar').classList.toggle('active');
});

document.querySelector('#tutorial-button').addEventListener('click', (e) => {
    let isTutorial = Tutorial_State_Change();

    if (isTutorial) {
        e.target.innerHTML = 'Default Mode';
    } else {
        e.target.innerHTML = 'Tutorial Mode';
    }
});


//interaction control
window.addEventListener('touchstart',onTouch);
window.addEventListener('touchmove', onTouch);
window.addEventListener('mousedown', onMouseDrag);
window.addEventListener('mousemove', onMouseDrag);
window.addEventListener('keydown',  onKeyDown);
window.addEventListener('keyup', oneKeyUp);

// load
window.onload = function(){
    MIDI.loadPlugin(function(){

        let songs = [
            {
                text: 'Backstreet Boys - I want it that way',
                value: 'Backstreet_Boys_i-want-it-that-way.mid'
            },
            {
                text: 'A Whole New World - Aladdin',
                value: 'A-Whole-New-World-(Theme-From-Aladdin).mid'
            },
            {
                text: 'Coldplay - Viva La Vida',
                value: 'coldplay_viva-la-vida.mid'
            },
            {
                text: 'Mario Overworold Song Theme',
                value: 'mario_-_overworld_theme.mid'
            },
            {
                text: 'Beethoven - For Elise',
                value: 'for_elise_by_beethoven.mid'
            }
        ];
        songs.forEach(song => {
            let option = document.createElement('option');
            option.value = song.value;
            option.innerHTML = song.text;

            document.querySelector('#songs').appendChild(option);
        });

        MIDI.Player.addListener(function(data) {
            var pianoKey = data.note + octave*12 - MIDI.pianoKeyOffset - 3;
            if (pianoKey != -1){
                var object = note_key(pianoKey);
				if (data.message === 144){
					nodeDown(object, pianoKey, false);
				}else{
					nodeUp(object, pianoKey, false);
				}
			}
        });
    });
    render();
}