<?php
  // Coletando os dados do formulario
  $usuario_univer = $_POST['usuario_univer'];
  $usuario_idea = $_POST['usuario_idea'];
  $usuario_nome = $_POST['usuario_nome'];
  $usuario_email = $_POST['usuario_email'];
  $usuario_msg = $_POST['msg'];

  // Enviando o email
  $email_from = 'camaragabriele@gmail.com';
  $email_subject = "Nova submissao no formulario da Rede IDEA";
  $email_body = "Nome do usuario: $usuario_nome\n".
  "Email do usuario: $usuario_email\n"
  "Universidade: $usuario_univer\n".
  "IDEA para cadastramento: $usuario_idea\n".
  "Mensagem: $usuario_msg\n".

  // Enviando o email
  $to = "camaragabriele@gmail.com";
  $headers = "From: $email_from \r\n";
  mail($to,$email_subject,$email_body,$headers);

  // Seguranca
  function IsInjected($str)
  {
    $injections = array('(\n+)',
      '(\r+)',
      '(\t+)',
      '(%0A+)',
      '(%0D+)',
      '(%08+)',
      '(%09+)'
    );

    $inject = join('|', $injections);
    $inject = "/$inject/i";

    if(preg_match($inject,$str)) {
      return true;
    }
    else {
      return false;
    }
  }
  if(IsInjected($usuario_email))
  {
    echo "Tentativa de invasao de email";
    exit;
  }
?>
