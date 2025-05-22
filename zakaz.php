<?php
include('mail.php');
mailesdo('6698879@gmail.com','Новый заказ с сайта kembri.com','Заказ с сайта kembri.com:<br>ФИО: '.$_POST['fio'].'<br>Телефон: '.$_POST['phone'],'kembri.com','support@kembri.com');
// mailesdo('fortran.new@gmail.com','Новый заказ с сайта kembri.com','Заказ с сайта kembri.com:<br>ФИО: '.$_POST['fio'].'<br>Телефон: '.$_POST['phone']);
echo <<<HERE

<!DOCTYPE html>
<html>
<head>

<meta charset="UTF-8" />
<title>Спасибо за Ваш заказ!</title>
<link rel="icon" type="image/png" href="favicon.png" />
</head>
<body>

<center>


<br>
	<h2>$_POST[fio], спасибо! Мы свяжемся с Вами по номеру: $_POST[phone] <br>Пожалуйста, проверьте, правильно ли Вы указали номер. </h2>
<br>
	<a href="#" onclick="history.back();return false;"><img src='images/back.jpg'></a>
	<h2>Автоматический возврат на сайт через


<script type="text/javascript">
function timer(){
        var time=document.getElementById('timer');
        time.innerHTML--;
        if(time.innerHTML != 0){
          setTimeout(timer, 1000);
        }else{
          time.innerHTML = '<a href="#" onclick="history.back();return false;">Чтобы вернуться на сайт, нажмите на кнопку выше ↑</a>';
        }
}
setTimeout(timer, 1000);
</script>
<div id="timer">10</div>

	 сек.</h2>

	</center>



</body>
</html>

HERE;
?>
