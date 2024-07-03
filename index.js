document.getElementById("Command").addEventListener("input", function () {
	document.getElementById("Command").style.height = "0px";
	document.getElementById("Command").style.height =
		document.getElementById("Command").scrollHeight + "px";
});
let Commands = [];
let Types = [];
let Auto = [];

let FullCommand =
	"/summon minecraft:armor_stand ~ ~ ~ {Health:0,Passengers:[{}]}";
let CarOfInPass = 59;

let CommandInput = document.getElementById("Command");
let autoIn = document.getElementById("auto");
let TempSTRtoAdd = "";

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
}

function GenCommand() {
	console.log(Auto.length);
	for (let i = 0; i < Auto.length; i++) {
		console.log(Commands[i] + "|" + Types[i] + "|" + Auto[i]);
		TempSTRtoAdd =
			'id:"minecraft:falling_block",Time:1,BlockState:{Name:"' +
			Types[i] +
			'"},TileEntityData:{Command:"' +
			Commands[i] +
			'",auto:' +
			Auto[i] +
			"},Passengers:[{}]";
		FullCommand =
			FullCommand.slice(0, CarOfInPass) +
			TempSTRtoAdd +
			FullCommand.slice(CarOfInPass);
		CarOfInPass = CarOfInPass + 106 + Types[i].length + Commands[i].length;
		TempSTRtoAdd = 'id:"minecraft:armor_stand",Health:0,Passengers:[{}]';
		FullCommand =
			FullCommand.slice(0, CarOfInPass) +
			TempSTRtoAdd +
			FullCommand.slice(CarOfInPass);
		CarOfInPass = CarOfInPass + 49;
	}
	console.log(FullCommand);
	document.getElementById("output").innerHTML = FullCommand;
	FullCommand =
		"/summon minecraft:armor_stand ~ ~ ~ {Health:0,Passengers:[{}]}";
	CarOfInPass = 59;
}
