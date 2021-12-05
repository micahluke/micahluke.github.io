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
var audioTitle = document.getElementById('audioTitle');

var currentEntryIndex = -1;

initialize();

function initialize() {

	setupAudioEndedEventListener();  

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
		if (currentEntryIndex < entries.length - 1) {
			// this is not the last entry, so autoplay the next one.
			console.log(currentEntryIndex);
			currentEntryIndex++;
			console.log(currentEntryIndex);
			loadAudio(currentEntry());
		} 
		});

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
			loadAudio(currentEntry());
		}
	} else {
		// first time an entry has been selected.
		currentEntryIndex = newEntryIndex;
		loadAudio(currentEntry());
	}
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
	console.log(entry);
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