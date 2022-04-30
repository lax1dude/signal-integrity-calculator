
function roundLowPrecision(input) {
	return Math.round(input * 1000) / 1000.0;
}

function makeUpDown(clickElement, hiddenElement, iconElement) {
	let hid = false;
	const hiddenElement0 = hiddenElement;
	const iconElement0 = iconElement;
	clickElement.addEventListener("click", () => {
		hid = !hid;
		hiddenElement0.style.display = hid ? "none" : "block";
		iconElement0.style.backgroundImage = hid ? "url(\"img/arrow_up.png\")" : "url(\"img/arrow_down.png\")";
	});
}

function calculateReflectionCoefficient() {
	var Vreflected = parseFloat(document.getElementById("Vreflected").value);
	if(isNaN(Vreflected)) {
		alert("Vreflected value is invalid!");
		return;
	}
	var Vincident = parseFloat(document.getElementById("globalStepSource").value);
	if(isNaN(Vincident)) {
		alert("Vincident value is invalid!");
		return;
	}
	document.getElementById("reflection_coefficient_result").innerText = 
		"\nCoefficient = " + (Vreflected / Vincident) + "\n\n";
}

function calculateImpedance() {
	var Vmeasured = parseFloat(document.getElementById("Vmeasured").value);
	if(isNaN(Vmeasured)) {
		alert("Vmeasured value is invalid!");
		return;
	}
	Vmeasured /= 1000.0;
	var Vincident = parseFloat(document.getElementById("globalStepSource").value);
	if(isNaN(Vincident)) {
		alert("Vsource value is invalid!");
		return;
	}
	Vincident /= 1000.0;
	var Zincident = parseFloat(document.getElementById("globalOutImpedance").value);
	if(isNaN(Zincident)) {
		alert("Zsource value is invalid!");
		return;
	}
	document.getElementById("impedance_result").innerText = 
		"\nImpedance = " + roundLowPrecision((Zincident * Vmeasured) / (Vincident - Vmeasured)) + "\n\n";
}

function calculateRiseTime() {
	var bandwidth = parseFloat(document.getElementById("rise_time_frequency").value);
	if(isNaN(bandwidth)) {
		alert("Bandwidth value is invalid!");
		return;
	}
	if(document.getElementById("rise_time_frequency_unit").value == "mhz") {
		bandwidth /= 1000;
	}
	document.getElementById("rise_time_result").innerText = 
		"\nRise Time = " + Math.round((0.35 / bandwidth) * 1000) + " ps\n\n";
}

function calculateAttenuation() {
	var w = parseFloat(document.getElementById("attenuation_w").value);
	if(isNaN(w)) {
		alert("w value is invalid!");
		return;
	}
	if(document.getElementById("attenuation_w_unit").value == "mm") {
		w *= 39.37;
	}
	var f = parseFloat(document.getElementById("attenuation_f").value);
	if(isNaN(f)) {
		alert("frequency value is invalid!");
		return;
	}
	if(document.getElementById("attenuation_frequency_unit").value == "mhz") {
		f /= 1000.0;
	}
	var dk = parseFloat(document.getElementById("attenuation_dk").value);
	if(isNaN(dk)) {
		alert("Dk value is invalid!");
		return;
	}
	var df = parseFloat(document.getElementById("attenuation_df").value);
	if(isNaN(df)) {
		alert("Df value is invalid!");
		return;
	}
	var val = (1.0 / w) * Math.sqrt(f) + 2.3 * f * df * Math.sqrt(dk);
	document.getElementById("attenuation_result").innerText = 
		"\nAttenuation = " + roundLowPrecision(val) + " dB/inch"
			+ "\nAttenuation = " + roundLowPrecision(val * 0.3937) + " dB/cm\n\n"
			+ "(Best Case Scenario)\n\n";
}

function calculateDistance() {
	var time = parseFloat(document.getElementById("time_distance").value);
	if(isNaN(time)) {
		alert("Time value is invalid!");
		return;
	}
	if(document.getElementById("time_distance_unit").value == "ns") {
		time *= 1000.0;
	}
	var speedOfLight = parseFloat(document.getElementById("speed_of_light").value);
	if(isNaN(speedOfLight)) {
		alert("Speed of light value is invalid!");
		return;
	}
	var speedOfLightUnits = document.getElementById("speed_of_light_unit").value;
	if(speedOfLightUnits == "cm") {
		speedOfLight *= 2.54;
	}else if(speedOfLightUnits == "mm") {
		speedOfLight *= 25.4;
	}
	var inches = time / speedOfLight;
	document.getElementById("distance_result").innerText = 
		"\nDistance = " + roundLowPrecision(inches) + " in"
		+ "\nDistance = " + roundLowPrecision(inches * 2.54) + " cm"
		+ "\nDistance = " + (Math.round(inches * 254.0) / 10.0) + " mm\n\n";
}

function calculateDistanceTime() {
	var dist = parseFloat(document.getElementById("distance_time_distance").value);
	if(isNaN(dist)) {
		alert("Distance value is invalid!");
		return;
	}
	var distUnits = document.getElementById("distance_time_distance_unit").value;
	if(distUnits == "cm") {
		dist /= 2.54;
	}
	if(distUnits == "mm") {
		dist /= 25.4;
	}
	var speedOfLight = parseFloat(document.getElementById("speed_of_light").value);
	if(isNaN(speedOfLight)) {
		alert("Speed of light value is invalid!");
		return;
	}
	var speedOfLightUnits = document.getElementById("speed_of_light_unit").value;
	if(speedOfLightUnits == "cm") {
		speedOfLight *= 2.54;
	}else if(speedOfLightUnits == "mm") {
		speedOfLight *= 25.4;
	}
	var time = Math.round(speedOfLight * dist);
	document.getElementById("distance_time_result").innerText = 
		"\nTime = " + time + " ps"
		+ "\nTime = " + roundLowPrecision(time * 0.001) + " ns\n\n";
}

window.addEventListener("load", () => {
	makeUpDown(
		document.getElementById("calculator_text_reflection_coefficient"),
		document.getElementById("calculator_inner_reflection_coefficient"),
		document.getElementById("openClose_reflection_coefficient")
	);
	document.getElementById("reflection_coefficient_enter").addEventListener("click", calculateReflectionCoefficient);
	makeUpDown(
		document.getElementById("calculator_text_impedance"),
		document.getElementById("calculator_inner_impedance"),
		document.getElementById("openClose_impedance")
	);
	document.getElementById("impedance_enter").addEventListener("click", calculateImpedance);
	makeUpDown(
		document.getElementById("calculator_text_rise_time"),
		document.getElementById("calculator_inner_rise_time"),
		document.getElementById("openClose_rise_time")
	);
	document.getElementById("rise_time_enter").addEventListener("click", calculateRiseTime);
	makeUpDown(
		document.getElementById("calculator_text_attenuation"),
		document.getElementById("calculator_inner_attenuation"),
		document.getElementById("openClose_attenuation")
	);
	document.getElementById("attenuation_enter").addEventListener("click", calculateAttenuation);
	setupAttenuationTableClicks();
	makeUpDown(
		document.getElementById("calculator_text_distance"),
		document.getElementById("calculator_inner_distance"),
		document.getElementById("openClose_distance")
	);
	document.getElementById("distance_enter").addEventListener("click", calculateDistance);
	makeUpDown(
		document.getElementById("calculator_text_distance_time"),
		document.getElementById("calculator_inner_distance_time"),
		document.getElementById("openClose_distance_time")
	);
	document.getElementById("distance_time_enter").addEventListener("click", calculateDistanceTime);
});

function setupAttenuationTableClicks() {
	const dkF = document.getElementById("attenuation_dk");
	const dfF = document.getElementById("attenuation_df");
	document.getElementById("dk_4.3_df_0.02").addEventListener("click", () => {
		dkF.value = "4.3";
		dfF.value = "0.02";
	});
	document.getElementById("dk_4.4_df_0.016").addEventListener("click", () => {
		dkF.value = "4.4";
		dfF.value = "0.016";
	});
	document.getElementById("dk_4.4_df_0.01").addEventListener("click", () => {
		dkF.value = "4.4";
		dfF.value = "0.01";
	});
	document.getElementById("dk_3.4_df_0.02").addEventListener("click", () => {
		dkF.value = "3.4";
		dfF.value = "0.02";
	});
	document.getElementById("dk_3.7_df_0.009").addEventListener("click", () => {
		dkF.value = "3.7";
		dfF.value = "0.009";
	});
	document.getElementById("dk_3.6_df_0.008").addEventListener("click", () => {
		dkF.value = "3.6";
		dfF.value = "0.008";
	});
	document.getElementById("dk_3.6_df_0.004").addEventListener("click", () => {
		dkF.value = "3.6";
		dfF.value = "0.004";
	});
	document.getElementById("dk_2.6_df_0.004").addEventListener("click", () => {
		dkF.value = "2.6";
		dfF.value = "0.004";
	});
	document.getElementById("dk_3.7_df_0.002").addEventListener("click", () => {
		dkF.value = "3.7";
		dfF.value = "0.002";
	});
}