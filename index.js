// Add new entries to the end of the array please :)
var entries = [
{
	'year': '21',
	'month': '8',
	'day': '25',
	'title': "processing freedom. seeking serentity. blood on my hands.",
}, 
{
	'year': '21',
	'month': '8',
	'day': '31',
	'title': "all shall pass."
}, 
{
	'year': '21',
	'month': '9',
	'day': '11',
	'title': "pinballs in your stomach."
}, 
{
	'year': '21',
	'month': '9',
	'day': '14',
	'title': "she's cute."
}, 
{
	'year': '21',
	'month': '11',
	'day': '18',
	'title': "why don't i listen to the silence anymore?"
}, 
{
	'year': '21',
	'month': '11',
	'day': '25',
	'title': "happy thanksgiving."
}, 
{
	'year': '21',
	'month': '11',
	'day': '25',
	'number': '2',
	'title': "breathwork."
}, 
{
	'year': '21',
	'month': '11',
	'day': '28',
	'title': "where is your love?"
},
{
	'year': '21',
	'month': '12',
	'day': '7',
	'title': 'vomit.'
}
];
entries.reverse();

var journalDiv = document.getElementsByClassName('journal')[0];
var playerDiv = document.getElementsByClassName('player')[0];
var audioSource = document.getElementById('audioSource');
var audioTitle = document.getElementById('audioTitle');

var currentEntryIndex = -1;

initialize();

function initialize() {

	setupAudioEndedEventListener();  

	document.body.onkeyup = function(e){
		// console.log(e.code);
		switch(e.code) {
			case 'Space':
				// toggle audio
				audioToggle();
				break;
			case 'ArrowUp':
				// play previous song
				playPreviousEntry();
				break;
			case 'ArrowDown':
				// play next song
				playeNextEntry();
				break;
			case 'ArrowRight':
				// skip ahead 15 seconds
				break;
			case 'ArrowLeft':
				// go back 15 seconds
				break;
		}
	}
	
	for (var i = 0, l = entries.length; l > i; i++) {
		entry = entries[i];
		entryDiv = document.createElement("div");
		entryDiv.innerHTML = buildEntryDate(entry) + ': ' + entry.title;
		entryDiv.classList.add('entry');
		entryDiv.id = i;
	
		// onclick functionality
		entryDiv.onclick = entryClick;
	
		journalDiv.appendChild(entryDiv);
	}
	
}

function setupAudioEndedEventListener() {
	audio.addEventListener('ended', (event) => {
			playeNextEntry();
		});

}

function playeNextEntry() {
	if (currentEntryIndex < entries.length - 1) {
		console.log(currentEntryIndex);
		playEntry(parseInt(currentEntryIndex) + 1);
	} 
}

function playPreviousEntry() {
	if (currentEntryIndex > 0) {
		console.log(currentEntryIndex);
		playEntry(parseInt(currentEntryIndex) - 1);
	} 
}

function playEntry(newIndex) {
	updateEntryFontWeight(currentEntryIndex, '400');
	console.log(currentEntryIndex);
	currentEntryIndex = newIndex;
	console.log(currentEntryIndex);
	updateEntryFontWeight(currentEntryIndex, 'bold');
	loadAudio(currentEntry());
}

function currentEntry() {
	if (currentEntryIndex > -1) {
		return entries[currentEntryIndex];
	} else {
		return false;
	}
}

function entryClick(event) {
	newEntryIndex = event.target.id;

	if (currentEntry()) {
		// there is a selected entry already.
		if (newEntryIndex === currentEntryIndex) {
			// the selected entry is selected again.
			audioToggle();
		} else {
			playEntry(newEntryIndex);
		}
	} else {
		// first time an entry has been selected.
		currentEntryIndex = newEntryIndex;
		updateEntryFontWeight(currentEntryIndex, 'bold');
		loadAudio(currentEntry());
	}
}

function updateEntryFontWeight(entryIndex, weight) {
	// console.log(entryIndex);
	journalDiv.children[entryIndex].style.fontWeight = weight;
}

function audioToggle() {
	if (audio.paused) {
		audio.play();
	} else {
		audio.pause();
	}
}

function loadAudio(entry) {
	audioSource.src = buildAudioFilePath(entry);
	audio.load();
	audio.play();
	updateAudioTitle(entry);
}

function buildAudioFilePath(entry) {
	let filename = entry['year'] + '-' + entry['month'] + '-' + entry['day'];
	if (entry && entry.number) {
		filename += '-' + entry['number'];
	}
	filename = 'audio/' + filename + '.mp3'
	return filename;
}

function buildEntryDate(entry) {
	return entry['month'] + '/' + entry['day'] + '/' + entry['year']
}

function updateAudioTitle(entry) {
	audioTitle.innerText = buildEntryDate(entry) + ': ' + entry.title;
}