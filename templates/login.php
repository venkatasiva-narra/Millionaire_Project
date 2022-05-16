<?php
   ob_start();
   session_start();

?>

<html lang = "en">
   
   <head>
      <title>Login</title>
      <link rel="stylesheet" type="text/css" href="../css/login.css">
      <script type="text/javascript">
      function DayDiff(CurrentDate)
      {
        var TYear=CurrentDate.getFullYear();
        var TDay=new Date("May, 05, 2020");
        TDay.getFullYear(TYear);
        var DayCount=(TDay-CurrentDate)/(1000*60*60*24);
        DayCount=Math.round(DayCount);
        return(DayCount);
      }
      </script>
      
   </head>

     <body>
      
      <h1>Welcome to the login page!!!</h1> 
      
      <div class = "form-signin error-messaging">
         
         <?php
            $username = $_POST["username"];
            $password = $_POST["password"];
            $postback = $_POST["postback"];
            

            $invalidLogin = false;

            if($postback && strlen($username) < 1) {
               $invalidLogin = true;
            }

            if($postback && strlen($password) < 1){
               $invalidLogin = true;
            } 
            

            if($postback && $invalidLogin == false){
               $_SESSION['username'] = $_POST['username'];
               header('Location: http://'.$_SERVER['HTTP_HOST'].'/~abiswas2/Mini_Projects/2/templates/welcome.php');
            } elseif($invalidLogin == true){
               echo "<h2> Please enter credentials. </h2>";
            }
         ?>

        </div>
      
      <div class="container">
      <marquee direction = "right">***This page is developed for temporary requirement.Will be removed later</marquee>
         <form class = "form-signin" role = "form" 
            action = "<?php echo htmlspecialchars($_SERVER['PHP_SELF']); 
            ?>" method = "post">
            <label for="username">Username </label>
            <input type = "text" id="username" name = "username" value = "<?php echo $username ?>" required autofocus><br>
            
            <?php 
               if($postback &&strlen($username) < 1) {
                  echo "<h2> Please enter a username. </h2>";
               } 
            ?>
            <br>
             <label for="password">Password</label>
            <input type = "password" id="password" name = "password" value = "<?php echo $password ?>" placeholder = "password = 1234" required> <br>
            <?php 
               if($postback && strlen($password) < 1) {
                  echo "<h2> Please enter a password. </h2>";
               } 
            ?>
            <br>
             <input type = "hidden" name = "postback" value="true">
            <button class = "login" type = "submit" name = "login">Login</button>
         </form>
         
         
      </div> 
      


<script type="text/javascript">

var Today = new Date();
var daysLeft = DayDiff(Today);
document.write("<p style='color:white; text-align: center; font-size: 40px'>They are " + daysLeft + " days left until semester end</p>");


</script>
   </body>
</html>
      
