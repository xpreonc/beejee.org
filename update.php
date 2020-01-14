<?php
$bd = mysqli_connect("127.0.0.1:3306","trupers","Xpreonc31","trupers") or die('Error');
//mysqli_query($bd,"ALTER table task ADD Status int(10)");

mysqli_query($bd,
"UPDATE task SET user='".$_POST['user_update']."', email='".$_POST['email_update']."', text='".$_POST['text_update']."', Status=1 where user='".$_POST['old_user']."' and email='".$_POST['old_email']."' and text='".$_POST['old_text']."'");

//$rows = mysqli_query($bd,"SHOW columns FROM task");
$rows = mysqli_query($bd,"Select * FROM task");
while($cell = mysqli_fetch_array($rows)){
//$i=$i+1;
//echo $cell['Field']." , ";
    echo "<tr><td>".$cell[1]."</td><td>".$cell[2]."</td><td>".$cell[3]."</td><td>".$cell[4]."</td><td></td></tr>";
}
//echo $_POST['user_update'];
?>