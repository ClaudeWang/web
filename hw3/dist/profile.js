fields = ["displayName", "email", "phone", "zipcode", "password", "passwordConf"];
//mapping each id to its field name. Used for alert messages.
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
				document.getElementById("update-text").innerHTML = ("The field " + mapFields[fields[index]] + "  is not of the correct format");
				document.getElementById("update-text").style = "display:block; color:red";
			};
			changedFields.push(item)
		}
	});

	//if there is field that is not empty and the input fields are valid.
	if (valid && count != 0) {
		//must confirm that password and passowrd confirm to be the same.
		if (document.getElementById("password").value != document.getElementById("passwordConf").value) {
			document.getElementById("update-text").innerHTML = ("Password and password confirmation must be the same.\n");
			document.getElementById("update-text").style = "display:block; color:red";
			return;
		}else {
			var updated = "";
			changedFields.forEach(function(item, index) {
				//if identical, don't consider it as change.
				if(document.getElementById("label-" + item).innerHTML == document.getElementById(item).value){
					document.getElementById(item).value = "";
					count--;
				}
				//if not, add it to the alert message.
				else{
					var oldValue = document.getElementById("label-" + item).innerHTML;
					document.getElementById("label-" + item).innerHTML = document.getElementById(item).value;
					document.getElementById(item).value = "";
					updated += ("\"" + item + "\"" + ": ");
					updated += "Changed from " + oldValue + " to " + document.getElementById("label-" + item).innerHTML + "\n";
				}
			});
			if (count == 0){
				return;
			}
			if (count == 1){
				document.getElementById("update-text").innerHTML = ("Field has been successfully updated!\n");
				document.getElementById("update-text").style = "display:block; color:green";
			}else{
				document.getElementById("update-text").innerHTML = ("Fields have been successfully updated!\n");
				document.getElementById("update-text").style = "display:block; color:green";
			}
		}
	}
}
function validateFields(index) {
	return document.getElementById(fields[index]).checkValidity();
}