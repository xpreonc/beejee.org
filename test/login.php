<?php
session_start();
$bd = mysqli_connect("127.0.0.1:3306","trupers","Xpreonc31","trupers") or die('Error');
$rows=mysqli_query($bd,"Select * from registration");
while($cell=mysqli_fetch_array($rows)){
    if($cell[1] == $_POST['user']){
        $_SESSION['login']=$_POST['user'];
    }else{
        $_SESSION['login']='';
    }
}
echo $_SESSION['login'];
?>