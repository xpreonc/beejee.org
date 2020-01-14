<?php
$bd = mysqli_connect("127.0.0.1:3306","trupers","Xpreonc31","trupers") or die('Error');
$rows = mysqli_query($bd,"Select * from task order by ".$_POST['name']." asc");
while($cell = mysqli_fetch_array($rows)){
    echo "<tr><td>".$cell[1]."</td><td>".$cell[2]."</td><td>".$cell[3]."</td><td>".$cell[4]."</td><td></td></tr>";
}
?>