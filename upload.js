var dropZone = $(".js-drag");
var inputFile = $("#js-upload");
var files = new Array();
const REGEX_FILE_NAME = new RegExp("([^0-9aA-zZ])", "gim");

const abort = () => reader.abort();

function criaCheck() {
    const icon = document.createElement("i");
    icon.classList.add("l-color--ren", "icon-ok-circled");
    return icon;
}

function criaFileInfo(file) {
	return `<tr class="js-${file.name.replace(REGEX_FILE_NAME, "").toLowerCase()}"><td>${file.name}</td><td>${file.size}&nbsp;bytes</td><td><div class="o-drag__progress js-drag__progress"><div class="o-drag__progress--percent js-drag__progress--percent"></div><span>0%</span></div></td></tr>`;
}

function dragOver(event) {
	event.stopPropagation();
	event.preventDefault();
	event.dataTransfer.dropEffect = "copy";
}

function fileSelect(event) {
	event.stopPropagation();
	event.preventDefault();
	
	const dragInfo = $(".js-drag__info");	
	let reader = null;
	
	// Caso for um INPUT é porque a importação esta sendo feita via click e não drop
	if (event.target.nodeName === "INPUT")
		files = pushFiles(files, event.target.files);
	else
		files = pushFiles(files, event.dataTransfer.files);
	
	for(var i = 0; i < files.length; i++) {
		reader = new FileReader();
		reader.file = files[i];
		reader.fileName = files[i].name;
		reader.fileSize = files[i].size;
		reader.type = files[i].type;
		reader.readAsBinaryString(files[i]);
		
		reader.onabort = function(event) {
			alert("Leitura do arquivo foi cancelada");
		}
		
		reader.onerror = function(event) {
			switch(event.target.error.code) {
				case event.target.error.NOT_FOUND_ERR :
					alert("Arquivo não encontrado");
					break;
				case event.target.error.NOT_READABLE_ERR :
					alert("Arquivo inválido para leitura");
					break;
				case event.target.error.ABORT_ERR :
					break;
				default :
					alert("Um erro ocorreu durante a leitura do arquivo");
			};
		}
		
		reader.onload = function(event) {
			const tr = $(`tr.js-${event.target.fileName.replace(REGEX_FILE_NAME, "").toLowerCase()}`);
			const progress = tr.querySelector(".js-drag__progress");
			const label = tr.querySelector(".js-drag__progress span");
			const percent = tr.querySelector(".js-drag__progress--percent");
			if (label.textContent !== "100%") {
				percent.style.width = "100%";
				label.textContent = "100%";
				progress.parentNode.appendChild(criaCheck());
			}
		}
		
		reader.onloadstart = function(event) {
			if (dragInfo != undefined) {
				const tbody = dragInfo.querySelector("tbody");
				let html = tbody.innerHTML;
				if (!tbody.querySelector(`.js-${event.target.file.name.replace(REGEX_FILE_NAME, "").toLowerCase()}`))
					html += criaFileInfo(event.target.file);
				tbody.innerHTML = html;
				dragInfo.style.display = "table";
			}
		}
		
		reader.onprogress = function(event) {
			const tr = $(`tr.js-${event.target.fileName.replace(REGEX_FILE_NAME, "").toLowerCase()}`);
			const label = tr.querySelector(".js-drag__progress span");
			const percent = tr.querySelector(".js-drag__progress--percent");
			if (event.lengthComputable) {
				let percentFile = Math.round((event.loaded / event.total) * 100);
				if (percentFile < 100) {
					percent.style.width = `${percentFile}%`;
					label.textContent = `${percentFile}%`;
				}
			}
		}
		
	}
		
}

function pushFiles(files, uploads) {
	if (files)
		files = files.concat(uploadsToArray(uploads));
	else
		files = uploads;
	return files;
}

function uploadsToArray(uploads) {
	let array = new Array();
	for (let i = 0; i < uploads.length; i++) {
		array.push(uploads[i]);
	}
	return array;
}

if (dropZone) {
	dropZone.addEventListener("dragover", dragOver, false);
	dropZone.addEventListener("drop", fileSelect, false);
}

if (inputFile)
	inputFile.addEventListener("change", fileSelect, false);