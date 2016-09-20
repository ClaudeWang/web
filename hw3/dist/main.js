window.onload = function(){
	//adding the handler for clearing/cancelling post.
	document.getElementById("clearPost").onclick = function() {
		document.getElementById("post-content").value = "";
	}
	//adding the handler for the button to update status.
	document.getElementById("update-status-button").onclick = function() {
		if (document.getElementById("update-status-field").value == ""){
			alert("Please enter a non-empty status!");
			return;
		}
		document.getElementById("profile-status").innerHTML = document.getElementById("update-status-field").value;
	}
}
