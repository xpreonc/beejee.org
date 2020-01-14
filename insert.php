<?php
$checked=0;
$bd = mysqli_connect("127.0.0.1:3306","trupers","Xpreonc31","trupers") or die('Error');
$rows=mysqli_query($bd,"Select * from task");
while($cell=mysqli_fetch_array($rows)){
    if($_POST['user']==$cell[1] || $_POST['email']==$cell[2]){
        $checked=1;
    }
}
if($checked!=1){
    mysqli_query($bd,"Insert into task (user, email, text, Status) values('".$_POST['user']."','".$_POST['email']."','".$_POST['text']."', 0)");
   $rows = mysqli_query($bd,"select * from task");
    while($cell= mysqli_fetch_array($rows)){
        echo "<tr><td>".$cell[1]."</td><td>".$cell[2]."</td><td>".$cell[3]."</td><td>".$cell[4]."</td><td></td></tr>";
    }
}
?>