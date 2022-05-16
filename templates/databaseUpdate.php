<!DOCTYPE html>
<html lang ="en">
    <head>
        <meta charset="utf-8">
        <link rel="stylesheet" type="text/css" href="../css/home.css">
    </head>
    <body>

        <div class="info-cont">
            <h1>
                Your information has been saved successfully.
            </h1>
            <p>
                Thank you for playing Who wants to be a Millionaire. 
                Your prize money will be mailed to you in the form of a check.
            </p>
        </div>

        <?php

        $firstName = $_POST["firstName"];
        $fname = strtoupper($firstName);
        $lastName = $_POST["lastName"];
        $lname = strtoupper($lastName);
        $priPhoneNum = $_POST["priPhNum"];
        $prizeMoney = $_POST["prizeAmt"];
       

        $host = "localhost";
        $user = "abiswas2";
        $pass = "abiswas2";
        $db="abiswas2";



        $r    = mysqli_connect($host, $user, $pass,$db);
            if (!$r) {
                    echo "Could not connect to server\n";
                    trigger_error(mysqli_error(), E_USER_ERROR);
                } 
            else {
                //echo "Connection established...\n";
                }
            echo mysqli_get_server_info() . "\n";
            
        $sql= "INSERT INTO MillionaireGame (`FirstName`, `LastName`, `PhoneNumber`, `PrizeMoney`) VALUES ('$fname', '$lname', '$priPhoneNum',  '$prizeMoney')";
        // echo "db inserted";
        $result = $r->query($sql);

            if ($result) {
                //echo "New records created successfully";
                //sleep(3);
                //header("Location: display.php"); /* Redirect browser */
                //exit();
            }
            mysqli_close();
            ?>
    </body>
</html>