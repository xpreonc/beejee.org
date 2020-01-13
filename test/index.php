<?php
session_start();
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title></title>
<link rel="stylesheet" href="style/style.css">

<script type="text/javascript" src="script/jQuery.js"></script>
<script type="text/javascript" src="script/main.js"></script>
</head>
<body>
<header>Тестовый сайт</header>
<div class="content">

<div class="container">
<table>
    <thead>
        <tr>
            <td>Пользователь</td><td>email</td><td>Задача</td><td>Статус</td><td>Delete</td>
        </tr>
    </thead>
    <tbody>
<?php
$bd = mysqli_connect("127.0.0.1:3306","trupers","Xpreonc31", "trupers") or die('Error');
$rows = mysqli_query($bd,"select * from task");
$i=0;
while($cell= mysqli_fetch_array($rows)){
    echo "<tr><td>".$cell[1]."</td><td>".$cell[2]."</td><td>".$cell[3]."</td><td>".$cell[4]."</td><td></td></tr>";
}
?>
    </tbody>
</table>
    <div id="pagination"></div>
<!------------------------------------------------------------------------------------------------------------------>
    <form id="form_login">
        <p>Логин</p>
        <input type="text" id="user" />
        <p>Пароль</p>
        <input type="password" id="passwords" />
        <p>
        <input type="button" id="login" value="Войти" />
        </p>
    </form>
    <form id="form_logout">
        <input type="button" id="logout" value="Выйти" />
    </form>

</div>
<!------------------------------------------------------------------------------------------------------------------>
<div class="sidebar">
    <div class="insert">
    <b>Добавление задачи</b>
        <p>Пользователь</p>
        <input type="text" id="user" />
        <p>email</p>
        <input type="text" id="email" />
        <p>Задача</p>
        <input type="text" id="text" />
        <p>
        <input type="button" id="insert" value="Добавить">
        </p>
    </div>

    <!--<div class="update">
        <b>Редактирование задачи</b>
        <p>Пользователь</p>
        <input type="text" id="user_update" />
        <p>email</p>
        <input type="text" id="email_update" />
        <p>Задача</p>
        <input type="text" id="text_update" />
        <p>
        <input type="button" id="update" value="Отредактировать">
        </p>
    </div>-->
</div>
</div>

<footer>
<input type="text" id="nik_name" value="<?php echo $_SESSION['login']; ?>">
</footer>
</body>
</html>