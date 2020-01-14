$(document).ready(function($){
    var action_page=0;
    var count_rows = $('.container table tbody tr').length;
    var page = Math.ceil(count_rows / 3);
    $('#nik_name').css({visibility: 'hidden', display: 'none'});
    if($('#nik_name').val()=='') {
        $('form#form_logout').css({visibility: 'hidden', display: 'none'});
        $('form#form_login').css({visibility: 'visible', display: 'flex'});

        $('tr td:last-child').css({visibility: 'hidden', display: 'none'});//Последний столбез в таблице
    }
    if($('#nik_name').val()!='') {
        $('form#form_logout').css({"visibility": "visible", "display": "flex"});
        $('form#form_login').css({"visibility": "hidden", "display": "none"});

        $('tr td:last-child').css({"visibility": "visible", "display": "table-cell"});//Последний столбез в таблице
        button_delete_row(count_rows,4);
        form_update();
    }
    visible_table(action_page);
    action();
    pagination(page);
    $("#pagination input:first-child").css({"background-color":"#83b7c4","font-weight":"bold"});
/*---------------------------------------------------------Insert DB--------------------------------------------------*/
    $('#insert').click(function () {
        if($(".sidebar #user").val()!="" && $(".sidebar #email").val()!="") {//Если поля не пустые
            var inspect_email = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            if(inspect_email.test($(".sidebar .insert #email").val())!=false) {
                str = String($(".sidebar #text").val());
                $.post('insert.php', {
                    user: $(".sidebar #user").val(),
                    email: $(".sidebar #email").val(),
                    text: str
                }, function (data) {
                    if (data != "") {//После проверки индентичности получаем данные, если они не пустые
                        $('.container table tbody').html(data);//Получение добавленых данных
                        var new_count_rows = $('table tbody tr').length;//Пересчитываем кол-во записей
                        var new_page = Math.ceil(new_count_rows / 3);//Пересчитываем кол-во страниц
                        //alert(page+" - "+new_page);
                        if (page < new_page) {//Если кол-во страниц больше
                            pagination();//Добавляем кнопку страниц (Пагинация)
                            page=new_page;
                        }
                        count_rows = $('.container table tbody tr').length;//Заново пересчитываем ко-во записей
                        if ($('#nik_name').val() != '') {
                            button_delete_row(count_rows, 4);//Заново создаем кнопки для удаления
                        }
                        visible_table(page-1);//Отображение данной страници
                        alert("Задача успешно добавлена");
                    } else {
                        alert("Уже существует");
                    }
                    action();
                });
            }else{
                alert("Некорректный email");
            }
        }else{
            alert("Поля пустые");
        }
    });
/*-----------------------------------------------------------Sort column----------------------------------------------*/
    $('thead tr td').click(function(){
        if($(this).text()=='Пользователь'){
            name='user';
        }
        if($(this).text()=='email'){
            name='email';
        }
        if($(this).text()=='Задача'){
            name='text';
        }
        if($('#nik_name').val()=='') {
            if ($(this).text() == 'Статус') {
                name = 'Status';
            }
        }
        $.post('sort.php', {name:name},function(data){//$(this).text()
            $('.container').find('table tbody').html(data);
            visible_table(action_page);//Отображение данных после сортировки
            action();
            aler("xxx");
        });
    });
/*------------------------------------------------------------Loging--------------------------------------------------*/
    $('form #login').click(function(){
        $.post('login.php', {user:$('form #user').val(), password:$('form #passwords').val()},function(data){
            $('#nik_name').val(data);
            if($('#nik_name').val()!='') {
                $('form#form_logout').css({"visibility": "visible", "display": "flex"});
                $('form#form_login').css({"visibility": "hidden", "display": "none"});

                $('tr td:last-child').css({"visibility": "visible", "display": "table-cell"});//Последний столбез в таблице
                button_delete_row(count_rows,4);
            }
            if($('#nik_name').val()=='') {
                $('form#form_logout').css({visibility: 'hidden', display: 'none'});
                $('form#form_login').css({visibility: 'visible', display: 'flex'});

                $('tr td:last-child').css({visibility: 'hidden', display: 'none'});//Последний столбез в таблице
                destroy_button_delete_row(count_rows,4);
            }
            action();
            form_update();
        });
    });
    $('form #logout').click(function(){
        $.post("logout.php",function(data){
            $('#nik_name').val(data);
            if($('#nik_name').val()=='') {
                $('form#form_logout').css({visibility: 'hidden', display: 'none'});
                $('form#form_login').css({visibility: 'visible', display: 'flex'});

                $('tr td:last-child').css({visibility: 'hidden', display: 'none'});//Последний столбез в таблице
                destroy_button_delete_row(count_rows,4);
                action();
            }
            action();
            form_update_destroy();
        });
        action();
    });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*-------------------------------------------------Visible page table-------------------------------------------------*/
function visible_table(action_pages){
    for(var j=(3*action_pages)+1; j<=(3+3*action_pages); j++) {
        $('table tbody tr:nth-child('+j+')').css({"display": "table-row", "visibility":"visible"});
    }
}
/*--------------------------------------------------------Pagination--------------------------------------------------*/
function pagination(page) {
    for (var i = 1; i <= page; i++) {
        var elem = document.createElement("input");
        elem.type = "button";
        elem.value = i;
        elem.onclick=function(){
            action_page=$(this).val()-1;//надо отнять 1 для цикла чтобы потом прибавить 1
            $("table tbody tr").css({"display": "none", "visibility":"hidden"});
            visible_table(action_page);
            $("#pagination input").css({"background-color":"rgb(235, 235, 235)","font-weight":"normal"});
            $(this).css({"background-color":"#83b7c4","font-weight":"bold"});
        };
        document.getElementById("pagination").appendChild(elem);
    }
    if(page==undefined){
        var pages=$("#pagination input").length;
        var elem = document.createElement("input");
        elem.type = "button";
        elem.value = pages+1;
        elem.onclick = function (){
            action_page=$(this).val()-1;//надо отнять 1 для цикла чтобы потом прибавить 1
            $("table tbody tr").css({"display": "none", "visibility":"hidden"});
            visible_table(action_page);
            $("#pagination input").css({"background-color":"rgb(235, 235, 235)","font-weight":"normal"});
            $(this).css({"background-color":"#83b7c4","font-weight":"bold"});
        };
        document.getElementById("pagination").appendChild(elem);
    }
}
/*------------------------------------------------ Button Delete row -------------------------------------------------*/
function button_delete_row(count_row,count_col){
    for(var i=0;i<count_row;i++) {
        var elem = document.createElement("input");
        elem.type = "button";
        elem.value = "Delete";
        elem.id = "Delete";
        document.getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i].getElementsByTagName("td")[count_col].appendChild(elem);
        elem.onclick = function (){
            $.post('delete_row.php',
                {
                    delete_user:$(this).parent("td").parent("tr").find("td:nth-child(1)").text(),
                    delete_email:$(this).parent("td").parent("tr").find("td:nth-child(2)").text(),
                    delete_text:$(this).parent("td").parent("tr").find("td:nth-child(3)").text()
                }
                ,function(data){
                    $('.container table tbody').html(data);//Получение данных после удаления
                    count_rows = $('.container table tbody tr').length;//Заново пересчитываем ко-во записей
                    var new_page = Math.ceil(count_rows / 3);//Пересчитываем кол-во страниц
                    //if(page<=new_page) {//Если кол-во страниц больше

                    //}
                    if(page>new_page){//Если кол-во страниц больше
                        alert(page+" - "+new_page);
                        $("#pagination input").remove();
                        pagination(new_page);//Добавляем кнопку страниц (Пагинация)
                        page=new_page;
                        visible_table(page-1);//Отображение данных после удаления
                    }
                    count_rows = $('.container table tbody tr').length;//Заново пересчитываем ко-во записей
                    visible_table(page-1);//Отображение данных после удаления
                    button_delete_row(count_rows,4);//Заново создаем кнопки для удаления
                    action();
            });
        }
    }
}
function destroy_button_delete_row(count_row,count_col){
    for (var i = 0; i < count_row; i++) {
        document.getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i].getElementsByTagName("td")[count_col].getElementsByTagName("input")[0].remove(this);
    }
}
/*------------------------------------------------- Button Checked ---------------------------------------------------*/
function action(){
    $('table tbody tr td:nth-child(4)').each(
        function(){
            if($('#nik_name').val()=='') {
                if ($(this).text() == 0) {
                    $(this).text("Не обработана");
                }else
                if ($(this).text() == 1) {
                    $(this).text("Отредактированна");
                }
            }else{
                $(this).html("<input type='radio'>");
                $("table tbody tr td:nth-child(4) input[type='radio']").click(function(){
                    $("table tbody tr td:nth-child(4) input[type='radio']").each(function(){
                        $(this).prop('checked',false);
                    });
                    $(this).prop('checked',true);
                    $('#user_update').val($(this).parent("td").parent("tr").find("td:nth-child(1)").text());
                    $('#email_update').val($(this).parent("td").parent("tr").find("td:nth-child(2)").text());
                    $('#text_update').val($(this).parent("td").parent("tr").find("td:nth-child(3)").text());
                });
            }
        }
    );
}
/*---------------------------------------------------------Update rows------------------------------------------------*/
function form_update(){
    var form_update = document.createElement("form");
    var user_update = document.createElement("input");
    var email_update = document.createElement("input");
    var text_update = document.createElement("input");
    var button_update = document.createElement("input");
    var p = document.createElement("p");
    user_update.type="text";
    user_update.id="user_update";
    email_update.type="text";
    email_update.id="email_update";
    text_update.type="text";
    text_update.id="text_update";
    button_update.id="update";
    button_update.value="Отредактировать";
    button_update.type="button";
    button_update.onclick=function(){
        $("table tbody tr td:nth-child(4) input[type='radio']").each(function(){
            if($(this).prop('checked')==true){
                old_user = $(this).parent("td").parent("tr").find("td:nth-child(1)").text();
                old_email = $(this).parent("td").parent("tr").find("td:nth-child(2)").text();
                old_text = $(this).parent("td").parent("tr").find("td:nth-child(3)").text();
            }
        });
        var inspect_email = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if(inspect_email.test($(".sidebar form #email_update").val())!=false) {
            $.post("update.php",
                {
                    old_user: old_user,
                    old_email: old_email,
                    old_text: old_text,
                    user_update: $(".sidebar form #user_update").val(),
                    email_update: $(".sidebar form #email_update").val(),
                    text_update: $(".sidebar form #text_update").val()
                },
                function (data) {
                    $('.container').find('table tbody').html(data);
                    //alert(data);
                    visible_table(action_page);
                    button_delete_row(count_rows, 4);
                    action();
                });
        }else{
            alert("Некорректный email");
        }
    }
    form_update.append('Пользователь');
    //appendChild(p);
    form_update.appendChild(user_update);
    form_update.append("Email");
    //form_update.appendChild(p);
    form_update.appendChild(email_update);
    form_update.append("Задача");
    //form_update.appendChild(p);
    form_update.appendChild(text_update);
    form_update.appendChild(button_update);

    document.getElementsByClassName("sidebar")[0].appendChild(form_update);

}
    function form_update_destroy(){
        document.getElementsByClassName("sidebar")[0].getElementsByTagName("form")[0].remove(this);
    }
});