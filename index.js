document.getElementById("Command").addEventListener("input", function () {
	document.getElementById("Command").style.height = "0px";
	document.getElementById("Command").style.height =
		document.getElementById("Command").scrollHeight + "px";
});
let Commands = [];
let Types = [];
let Auto = [];
let conditional = [];
let blockType = [];
let dircation = [];

let FullCommand =
	"/summon minecraft:armor_stand ~ ~ ~ {Health:0,Passengers:[{}]}";
let CarOfInPass = 59;

let CommandInput = document.getElementById("Command");
let autoIn = document.getElementById("auto");
let conditionalIn = document.getElementById("cond");
let TempSTRtoAdd = "";
let BlockId = document.getElementById("Block");
let dircationButtns = {};
dircationButtns.up = document.getElementById("DircationUp");
dircationButtns.down = document.getElementById("DircationDown");
dircationButtns.north = document.getElementById("DircationNorth");
dircationButtns.south = document.getElementById("DircationSouth");
dircationButtns.east = document.getElementById("DircationEast");
dircationButtns.West = document.getElementById("DircationWest");
console.log(dircationButtns);
function AddcomandBlock() {
	Commands.push(CommandInput.value);
	if (document.getElementById("normal").checked) {
		Types.push("minecraft:command_block");
	} else if (document.getElementById("Chain").checked) {
		Types.push("minecraft:chain_command_block");
	} else if (document.getElementById("Repeat").checked) {
		Types.push("minecraft:repeating_command_block");
	} else {
		Types.push("minecraft:command_block");
	}
	if (autoIn.checked) {
		Auto.push("1b");
	} else {
		Auto.push("0b");
	}
	if (conditionalIn.checked) {
		conditional.push("true");
	} else {
		conditional.push("false");
	}
	if (dircationButtns.up.checked) {
		dircation.push("up");
	}
	if (dircationButtns.down.checked) {
		dircation.push("down");
	}
	if (dircationButtns.north.checked) {
		dircation.push("north");
	}
	if (dircationButtns.south.checked) {
		dircation.push("south");
	}
	if (dircationButtns.east.checked) {
		dircation.push("east");
	}
	if (dircationButtns.West.checked) {
		dircation.push("west");
	}

	blockType.push("command");
}

function AddnormalBlock() {
	console.log(BlockId.value);
	Commands.push("Normal Block No Command");
	Types.push(BlockId.value);
	Auto.push("No Auto Normal Block");
	conditional.push("This Is A Normal Block");
	blockType.push("block");
	if (dircationButtns.up.checked) {
		dircation.push("up");
	}
	if (dircationButtns.down.checked) {
		dircation.push("down");
	}
	if (dircationButtns.north.checked) {
		dircation.push("north");
	}
	if (dircationButtns.south.checked) {
		dircation.push("south");
	}
	if (dircationButtns.east.checked) {
		dircation.push("east");
	}
	if (dircationButtns.West.checked) {
		dircation.push("west");
	}
}

function GenCommand() {
	console.log(Auto.length);
	for (let i = 0; i < Auto.length; i++) {
		console.log(
			Commands[i] +
				"|" +
				Types[i] +
				"|" +
				Auto[i] +
				"|" +
				conditional[i] +
				"|" +
				dircation[i]
		);
		if (blockType[i] == "command") {
			Commands[i] = Commands[i].replaceAll("'", '"');
			TempSTRtoAdd =
				'id:"minecraft:falling_block",Time:1,BlockState:{Name:"' + // 54
				Types[i] +
				`",Properties:{facing:"` + //22
				dircation[i] +
				`",conditional:"` + // 15
				conditional[i] +
				`"}},TileEntityData:{Command:'` + //29
				Commands[i] +
				`',auto:` + // 7
				Auto[i] + //2
				"},Passengers:[{}]"; //15
			FullCommand =
				FullCommand.slice(0, CarOfInPass) +
				TempSTRtoAdd +
				FullCommand.slice(CarOfInPass);
			CarOfInPass =
				CarOfInPass +
				144 +
				dircation[i].length +
				Types[i].length +
				Commands[i].length +
				conditional[i].length;
			TempSTRtoAdd = 'id:"minecraft:armor_stand",Health:0,Passengers:[{}]';
			FullCommand =
				FullCommand.slice(0, CarOfInPass) +
				TempSTRtoAdd +
				FullCommand.slice(CarOfInPass);
			CarOfInPass = CarOfInPass + 49;
		}
		if (blockType[i] == "block") {
			TempSTRtoAdd =
				`id:"minecraft:falling_block",Time:1,BlockState:{Name:"` + // 54
				Types[i] +
				`",Properties:{facing:"` + //22
				dircation[i] +
				`"}},Passengers:[{}]`; //17
			FullCommand =
				FullCommand.slice(0, CarOfInPass) +
				TempSTRtoAdd +
				FullCommand.slice(CarOfInPass);
			CarOfInPass = CarOfInPass + 93 + Types[i].length + dircation[i].length;
			TempSTRtoAdd = 'id:"minecraft:armor_stand",Health:0,Passengers:[{}]';
			FullCommand =
				FullCommand.slice(0, CarOfInPass) +
				TempSTRtoAdd +
				FullCommand.slice(CarOfInPass);
			CarOfInPass = CarOfInPass + 49;
		}
	}
	console.log(FullCommand);
	navigator.clipboard.writeText(FullCommand);
	document.getElementById("output").innerText = FullCommand;
	FullCommand =
		"/summon minecraft:armor_stand ~ ~ ~ {Health:0,Passengers:[{}]}";
	CarOfInPass = 59;
}
