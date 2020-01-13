<?php
$checked=0;
$bd = mysqli_connect("127.0.0.1:3306","trupers","Xpreonc31","trupers") or die('Error');
$rows = mysqli_query($bd,"Select * from registration");
while($cell=mysqli_fetch_array($rows)){
    if($cell[1]==$_POST['user']){
        $checked=1;
    }
}
if($checked == 0){
    mysqli_query($bd,"Insert into registration(login, passwords)values('".$_POST['user']."','".$_POST['passwords']."');");
}
?>