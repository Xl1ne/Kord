<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/vendor/autoload.php';

// ---------- НАСТРОЙКИ ----------
$RECIPIENT_EMAIL = 'info@example.com';   // <-- ЗАМЕНИТЬ на реальную почту
$SMTP_HOST       = 'smtp.yandex.ru';     // <-- SMTP-сервер
$SMTP_PORT       = 465;
$SMTP_USER       = 'noreply@example.com'; // <-- SMTP логин
$SMTP_PASS       = 'password';            // <-- SMTP пароль
$FROM_NAME       = 'Сайт КОРД';
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

$body = "
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
";

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = $SMTP_HOST;
    $mail->SMTPAuth   = true;
    $mail->Username   = $SMTP_USER;
    $mail->Password   = $SMTP_PASS;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = $SMTP_PORT;
    $mail->CharSet    = 'UTF-8';

    $mail->setFrom($SMTP_USER, $FROM_NAME);
    $mail->addAddress($RECIPIENT_EMAIL);

    $mail->isHTML(true);
    $mail->Subject = 'Заявка с сайта КОРД';
    $mail->Body    = $body;
    $mail->AltBody = "Имя: {$name}\nТелефон: {$phone}";

    $mail->send();

    echo json_encode(['success' => true, 'message' => 'OK']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Ошибка отправки: ' . $mail->ErrorInfo,
    ]);
}
