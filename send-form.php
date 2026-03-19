<?php

// ---------- НАСТРОЙКИ ----------
$RECIPIENT_EMAILS = ['trampledcloud@gmail.com', 'C5527A@gmail.com'];
$FROM_EMAIL       = 'main@kord-realty.ru';
$FROM_NAME        = 'Сайт КОРД';

// SMTP через Beget
$SMTP_HOST = 'smtp.beget.com';
$SMTP_PORT = 2525;
$SMTP_USER = 'main@kord-realty.ru';
$SMTP_PASS = 'dLw&IRZTP8Pp';  // <-- Вставить пароль от почты main@kord-realty.ru
// --------------------------------

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$name  = trim($_POST['name'] ?? '');
$phone = trim($_POST['phone'] ?? '');

if ($phone === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Телефон обязателен']);
    exit;
}

$subject = 'Заявка с сайта КОРД';

$body = "<html><body>
<h2>Новая заявка с сайта КОРД</h2>
<table style='border-collapse:collapse;'>
  <tr>
    <td style='padding:6px 12px;font-weight:bold;'>Имя:</td>
    <td style='padding:6px 12px;'>" . htmlspecialchars($name ?: '—') . "</td>
  </tr>
  <tr>
    <td style='padding:6px 12px;font-weight:bold;'>Телефон:</td>
    <td style='padding:6px 12px;'>" . htmlspecialchars($phone) . "</td>
  </tr>
</table>
</body></html>";

/**
 * Отправка письма через SMTP с SSL-авторизацией
 */
function smtpSend($host, $port, $user, $pass, $fromEmail, $fromName, $toEmail, $subject, $htmlBody) {
    $socket = @fsockopen($host, $port, $errno, $errstr, 10);
    if (!$socket) {
        return "Не удалось подключиться к SMTP: {$errstr} ({$errno})";
    }

    stream_set_timeout($socket, 10);

    $response = fgets($socket, 512);
    if (substr($response, 0, 3) !== '220') {
        fclose($socket);
        return "SMTP ответ: {$response}";
    }

    $commands = [
        "EHLO kord-realty.ru",
        "AUTH LOGIN",
        base64_encode($user),
        base64_encode($pass),
        "MAIL FROM:<{$fromEmail}>",
        "RCPT TO:<{$toEmail}>",
        "DATA",
    ];

    $expectedCodes = ['250', '334', '334', '235', '250', '250', '354'];

    foreach ($commands as $i => $cmd) {
        fwrite($socket, $cmd . "\r\n");
        $resp = '';
        while ($line = fgets($socket, 512)) {
            $resp .= $line;
            if (isset($line[3]) && $line[3] === ' ') break;
            if (strlen($line) < 4) break;
        }
        if (substr($resp, 0, 3) !== $expectedCodes[$i]) {
            fwrite($socket, "QUIT\r\n");
            fclose($socket);
            return "SMTP ошибка на '{$cmd}': {$resp}";
        }
    }

    // Формируем письмо
    $boundary = md5(uniqid(time()));
    $message  = "From: =?UTF-8?B?" . base64_encode($fromName) . "?= <{$fromEmail}>\r\n";
    $message .= "To: {$toEmail}\r\n";
    $message .= "Subject: =?UTF-8?B?" . base64_encode($subject) . "?=\r\n";
    $message .= "MIME-Version: 1.0\r\n";
    $message .= "Content-Type: text/html; charset=UTF-8\r\n";
    $message .= "Content-Transfer-Encoding: base64\r\n";
    $message .= "\r\n";
    $message .= chunk_split(base64_encode($htmlBody));
    $message .= "\r\n.\r\n";

    fwrite($socket, $message);

    $resp = fgets($socket, 512);
    fwrite($socket, "QUIT\r\n");
    fclose($socket);

    if (substr($resp, 0, 3) !== '250') {
        return "SMTP ошибка при отправке: {$resp}";
    }

    return true;
}

$allSent = true;
$errors = [];

foreach ($RECIPIENT_EMAILS as $to) {
    $result = smtpSend($SMTP_HOST, $SMTP_PORT, $SMTP_USER, $SMTP_PASS, $FROM_EMAIL, $FROM_NAME, $to, $subject, $body);
    if ($result !== true) {
        $allSent = false;
        $errors[] = $result;
    }
}

if ($allSent) {
    echo json_encode(['success' => true, 'message' => 'OK']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Ошибка отправки', 'errors' => $errors]);
}
