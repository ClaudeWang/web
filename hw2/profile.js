fields = ["displayName", "email", "phone", "zipcode", "password", "passwordConf"];
mapFields = {"displayName":"displayName", "email": "Email Adress",
"phone": "Phone Number", "zipcode" : "Zip Code", 
"password": "Password", "passwordConf": "Password Confirmation"};
window.onload =  function() {
	document.getElementById("submitChanges").onclick = submitChanges;
}

function submitChanges() {
	var valid = true;
	var isValidField;
	var count = 0;
	var changedFields = [];
	//got thought filled fields and check validity.
	fields.forEach(function(item, index) {
		if (document.getElementById(fields[index]).value != "") {
			count++;
			isValidField = validateFields(index);
			valid = (valid && isValidField);
			//when the field is not empty.
			if (!isValidField) {
				alert("The field " + mapFields[fields[index]] + "  is not of the correct format");
			};
			changedFields.push(item)
		}
	});
	//if there is field that is not empty and the input fields are valid.
	if (valid && count != 0) {
		//must confirm that password and passowrd confirm to be the same.
		if (document.getElementById("password").value != document.getElementById("passwordConf").value) {
			alert("Password and password confirmation must be the same.");
			return;
		}else {
			var updated = "";
			changedFields.forEach(function(item, index) {
				//if identical, don't consider it as change.
				if(document.getElementById("label-" + item).innerHTML == document.getElementById(item).value){
					document.getElementById(item).value = "";
					count--;
				}
				// if not, add it to the alert message.
				else{
					document.getElementById("label-" + item).innerHTML = document.getElementById(item).value;
					document.getElementById(item).value = "";
					updated += ("\"" + item + "\"" + " ");
				}
			});
			if (count == 0){
				alert("No changes have been made.");
				return;
			}
			if (count == 1){
				alert("Field " + updated + " has been successfully updated!");
			}else{
				alert("Fields " + updated + "have been successfully updated!");
			}
		}
	}
	if (count == 0) {
		alert("No changes have been made.");
	}
}

function validateFields(index) {
	//console.log(document.getElementById(fields[index]).checkValidity());
	return document.getElementById(fields[index]).checkValidity();
}