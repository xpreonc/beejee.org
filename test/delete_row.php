<?php
$bd = mysqli_connect("127.0.0.1:3306","trupers","Xpreonc31","trupers") or die('Error');
mysqli_query($bd,"Delete from task where user='".$_POST['delete_user']."' and email='".$_POST['delete_email']."' and text='".$_POST['delete_text']."'");
$rows = mysqli_query($bd,"select * from task");
while($cell= mysqli_fetch_array($rows)){
    echo "<tr><td>".$cell[1]."</td><td>".$cell[2]."</td><td>".$cell[3]."</td><td>".$cell[4]."</td><td></td></tr>";
}
//echo $_POST['delete_row'];
?>