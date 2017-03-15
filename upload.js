var dropZone = $(".js-drag");
var inputFile = $("#js-upload");
var files = null;

function criaFileInfo(file) {
	return `<tr class="js-${file.name.replace("(", "").replace(")","").replace(/\s/g, "-").replace(".", "-").toLowerCase()}"><td>${file.name}</td><td>${file.size}&nbsp;bytes</td><td><div class="o-drag__progress js-drag__progress"><div class="o-drag__progress--percent js-drag__progress--percent"></div><span>0%</span></div></td></tr>`;
}

function criaCheck() {
	let icon = document.createElement("I");
	icon.classList.add("l-color--ren", "icon-ok-circled");
	return icon;
}

function dragOver(event) {
	event.stopPropagation();
	event.preventDefault();
	event.dataTransfer.dropEffect = "copy";
}

function abort() {
	reader.abort();
}

function fileSelect(event) {
	event.stopPropagation();
	event.preventDefault();
	
	let dragInfo = $(".js-drag__info");	
	let reader = null;
	
	// Caso for um INPUT é porque a importação esta sendo feita via click e não drop
	if (event.target.nodeName == "INPUT")
		files = event.target.files;
	else
		files = event.dataTransfer.files;
	
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
			let tr = $(`tr.js-${event.target.fileName.replace("(", "").replace(")","").replace(/\s/g, "-").replace(".", "-").toLowerCase()}`);
			let progress = tr.find(".js-drag__progress");
			let label = tr.find(".js-drag__progress span");
			let percent = tr.find(".js-drag__progress--percent");
			percent.style.width = "100%";
			label.textContent = "100%";
			progress.parentNode.appendChild(criaCheck());
		}
		
		reader.onloadstart = function(event) {
			if (dragInfo != undefined) {
				let tbody = dragInfo.find("tbody");
				let html = tbody.innerHTML;
				html += criaFileInfo(event.target.file);
				tbody.innerHTML = html;
				dragInfo.style.display = "table";
			}
		}
		
		reader.onprogress = function(event) {
			let tr = $(`tr.js-${event.target.fileName.replace("(", "").replace(")","").replace(/\s/g, "-").replace(".", "-").toLowerCase()}`);
			let label = tr.find(".js-drag__progress span");
			let percent = tr.find(".js-drag__progress--percent");
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

if (dropZone != undefined) {
	dropZone.addEventListener("dragover", dragOver, false);
	dropZone.addEventListener("drop", fileSelect, false);
}

if (inputFile != undefined)
	inputFile.addEventListener("change", fileSelect, false);