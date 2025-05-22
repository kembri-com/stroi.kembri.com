<?php
function mailes($to,$subject,$message,$email_encoding='UTF-8'){
global $db;
$domen_site=domen_site();

$to_orig=$to;
$subject_orig=$subject;
$message_orig=$message;

/*
$to = iconv("UTF-8", "utf-8",$to);
$subject = iconv("UTF-8", "utf-8",$subject);
$message = iconv("UTF-8", "utf-8",$message);
*/

$pochtaauthor=getcelldb('valuer','valuer','setting','namer=\'pochta-author\'','','1');
$pochtaemail=getcelldb('valuer','valuer','setting','namer=\'pochta-email\'','','1');

if ($email_encoding!='UTF-8'){
  $to = iconv('UTF-8',$email_encoding,$to);
  $subject = iconv('UTF-8',$email_encoding,$subject);
  $message = iconv('UTF-8',$email_encoding,$message);
  $pochtaauthor = iconv('UTF-8',$email_encoding,$pochtaauthor);
  $pochtaemail = iconv('UTF-8',$email_encoding,$pochtaemail);
}


// $result = mysql_query ("SELECT valuer FROM setting WHERE namer='pochta-author'",$db);
// $myrow = mysql_fetch_array ($result);
// //$pochtaauthor=iconv("UTF-8", "utf-8",$myrow[valuer]);
// $pochtaauthor=$myrow[valuer];
// $result = mysql_query ("SELECT valuer FROM setting WHERE namer='pochta-email'",$db);
// $myrow = mysql_fetch_array ($result);
// //$pochtaemail=iconv("UTF-8", "utf-8",$myrow[valuer]);
// $pochtaemail=$myrow[valuer];
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= "Content-type: text/html; charset=".$email_encoding." \r\n";
$headers .= 'From: =?'.$email_encoding.'?B?'.base64_encode($pochtaauthor).'?= <'.$pochtaemail.'>'."\r\n";

// закомментировать, если заголовок будет "крякозяброй"
$subject = '=?'.$email_encoding.'?B?'.base64_encode($subject).'?=';
// end закомментировать, если заголовок будет "крякозяброй"

if (mail($to, $subject, $message, $headers)==true){
return true;
} else {
$query=http_build_query(array(
  'funct'=>'mailes',
  'to'=>$to_orig,
  'subject'=>$subject_orig,
  'message'=>$message_orig,
  'domen_site_from'=>$_SERVER['SERVER_NAME'],
));
$res=file_get_contents('https://kembri.ru/mail-from-sites.php?'.$query);
return $res;
}
}




function mailesdo($to,$subject,$message,$fromauthor,$fromemail,$email_encoding='UTF-8'){
  $to_orig=$to;
  $subject_orig=$subject;
  $message_orig=$message;
  $fromauthor_orig=$fromauthor;
  $fromemail_orig=$fromemail;

  if ($email_encoding!='UTF-8'){
    $to = iconv('UTF-8',$email_encoding,$to);
    $subject = iconv('UTF-8',$email_encoding,$subject);
    $message = iconv('UTF-8',$email_encoding,$message);
    $fromauthor = iconv('UTF-8',$email_encoding,$fromauthor);
    $fromemail = iconv('UTF-8',$email_encoding,$fromemail);
  }

  $headers  = 'MIME-Version: 1.0' . "\r\n";
  $headers .= "Content-type: text/html; charset=".$email_encoding." \r\n";
  $headers .= 'From: =?'.$email_encoding.'?b?'.base64_encode($fromauthor).'?= <'.$fromemail.'>'."\r\n";
  // $headers .= "From: $fromauthor <$fromemail>\r\n";
  $headers .= 'Content-Transfer-Encoding: 8bit'."\r\n";

  // закомментировать, если заголовок будет "крякозяброй"
  $subject = '=?'.$email_encoding.'?b?'.base64_encode($subject).'?=';
  // end закомментировать, если заголовок будет "крякозяброй"

  if (mail($to, $subject, $message, $headers)==true){
    return true;
  } else {
    $query=http_build_query(array(
      'funct'=>'mailesdo',
      'to'=>$to_orig,
      'subject'=>$subject_orig,
      'message'=>$message_orig,
      'fromauthor'=>$fromauthor_orig,
      'fromemail'=>$fromemail_orig,
      'domen_site_from'=>$_SERVER['SERVER_NAME'],
    ));
    $res=file_get_contents('https://kembri.ru/mail-from-sites.php?'.$query);
    return $res;
  }
}







function mailesdo_files($to,$subject,$message,$fromauthor,$fromemail,$filename){
    $boundary = "---"; //Разделитель
    /* Заголовки */
    // $headers .= "From: $fromauthor <$fromemail>\r\n";
    $headers .= 'From: =?utf-8?B?'.base64_encode($fromauthor).'?= <'.$fromemail.'>'."\r\n";
    $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"";
    $body = "--$boundary\n";
    /* Присоединяем текстовое сообщение */
    $body .= "Content-type: text/html; charset='utf-8'\n";
    $body .= "Content-Transfer-Encoding: quoted-printablenn";
    $body .= "Content-Disposition: attachment; filename==?utf-8?B?".base64_encode($filename)."?=\n\n";
    $body .= $message."\n";
    $body .= "--$boundary\n";
    $file = fopen($filename, "r"); //Открываем файл
    $text = fread($file, filesize($filename)); //Считываем весь файл
    fclose($file); //Закрываем файл
    /* Добавляем тип содержимого, кодируем текст файла и добавляем в тело письма */
    $body .= "Content-Type: application/octet-stream; name==?utf-8?B?".base64_encode($filename)."?=\n";
    $body .= "Content-Transfer-Encoding: base64\n";
    $body .= "Content-Disposition: attachment; filename==?utf-8?B?".base64_encode($filename)."?=\n\n";
    $body .= chunk_split(base64_encode($text))."\n";
    $body .= "--".$boundary ."--\n";

    // закомментировать, если заголовок будет "крякозяброй"
    $subject = '=?utf-8?B?'.base64_encode($subject).'?=';
    // end закомментировать, если заголовок будет "крякозяброй"

if (mail($to, $subject, $body, $headers)==true){
return true;
} else {
return false;
}
}
?>
