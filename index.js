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
}
];
entries.reverse();

var journalDiv = document.getElementsByClassName('journal')[0];
var playerDiv = document.getElementsByClassName('player')[0];
var audioSource = document.getElementById('audioSource');

var currentEntryIndex = -1;

initialize();

function initialize() {
	for (var i = 0, l = entries.length; l > i; i++) {
		entry = entries[i];
		entryDiv = document.createElement("div");
		var date = entry['month'] + '/' + entry['day'] + '/' + entry['year'];
		entryDiv.innerHTML = date + ': ' + entry.title;
		entryDiv.classList.add('entry');
		entryDiv.id = i;
	
		// onclick functionality
		entryDiv.onclick = entryClick;
	
		journalDiv.appendChild(entryDiv);
	}
	
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
			currentEntryIndex = newEntryIndex;
			loadAudio();
		}
	} else {
		// first time an entry has been selected.
		currentEntryIndex = newEntryIndex;
		loadAudio();
	}
}

function audioToggle() {
	if (audio.paused) {
		audio.play();
	} else {
		audio.pause();
	}
}

function loadAudio() {
	audioSource.src = buildAudioFilePath();
	audio.load();
	audio.play();
}

function buildAudioFilePath() {
	let entry = currentEntry();
	let filename = entry['year'] + '-' + entry['month'] + '-' + entry['day'];
	if (entry && entry.number) {
		filename += '-' + entry['number'];
	}
	filename = 'audio/' + filename + '.mp3'
	return filename;
}