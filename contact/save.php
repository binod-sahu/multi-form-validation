<?php
if ($_SERVER["REQUEST_METHOD"] == "POST" && !empty($_POST)) {
    $contacts = json_decode($_POST["json"]);
    $contactsCount = count($contacts);
    $contactsToWrite = "";
    
    for ($x = 0; $x < $contactsCount; $x++) {
        if( name_validate($contacts[$x]->name) && email_validate($contacts[$x]->email) && phone_validate($contacts[$x]->phone) ) {
            $contactsToWrite .= "\n=============================================\n";
            $contactsToWrite .= "name: " . $contacts[$x]->name . "\n";
            $contactsToWrite .= "email: " . $contacts[$x]->email . "\n";
            $contactsToWrite .= "phone: " . $contacts[$x]->phone . "\n";
            $contactsToWrite .= "=============================================\n";
        }
    }

    if (!empty($contactsToWrite)) {
        writeToFile($contactsToWrite);
        echo "message: Contacts are written to file successfully!!!";
    } else {
        var_dump(http_response_code(404));
        echo "message: Contacts are not written to file!!!";
    }    
}

function name_validate($name) {
    $pattern = '/^[A-Za-z ]+$/';
    return test_input($name, $pattern);
}

function email_validate($email) {
    $pattern = '/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/';
    return test_input($email, $pattern);
}

function phone_validate($phone) {
    $pattern = '/^[0-9]+$/';
    return test_input($phone, $pattern);
}

function test_input($data, $pattern) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);

    $match = @preg_match($pattern, $data, $matches);
    return $match;
}

function writeToFile($contactsToWrite) {
    $file = fopen("contacts.txt", "w");
    fwrite($file, $contactsToWrite);
    fclose($file);
}
?>