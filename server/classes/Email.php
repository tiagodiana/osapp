<?php

include_once "envioemail/phpmailer/class.phpmailer.php";

class Email
{
    private $emailorigem;
    private $senhaorigem;
    private $emaildestino;
    private $assunto;
    private $conteudo;

    public function __construct($conteudo)
    {
        $this->emailorigem = "";
        $this->senhaorigem = "";
        $this->emaildestino = "";
        $this->assunto = "Suporte OS APP(PWA)";
        $this->conteudo = $conteudo;
    }

    public function enviar()
    {
        $mail = new PHPMailer();
        $mail->CharSet = 'UTF-8';
        $mail->IsSMTP();    // Ativar SMTP
        $mail->SMTPDebug = 1;   // Debugar: 1 = erros e mensagens, 2 = mensagens apenas
        $mail->SMTPAuth = true;   // Autenticação ativada
        $mail->SMTPSecure = 'ssl';  // SSL REQUERIDO pelo GMail
        $mail->Host = 'smtp.gmail.com'; // SMTP utilizado
        $mail->Port = 465;      // A porta 587 deverá estar aberta em 
        $mail->IsHTML(true);
        $mail->Username = $this->emailorigem;
        $mail->Password = $this->senhaorigem;
        $mail->SetFrom($this->emailorigem);
        $mail->Subject = $this->assunto;
        $mail->Body = $this->conteudo;  
        $mail->AddAddress($this->emaildestino);
        var_dump($mail->Send());
        return $mail->Send();
    }

}