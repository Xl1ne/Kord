<?php

// ---------- НАСТРОЙКИ ----------
$RECIPIENT_EMAIL = 'info@example.com'; // <-- ЗАМЕНИТЬ на реальную почту заказчика
$FROM_EMAIL      = 'noreply@kord.ru';
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

$subject = 'Заявка с сайта КОРД';

$body = "
<html><body>
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
</body></html>
";

$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=UTF-8\r\n";
$headers .= "From: {$FROM_NAME} <{$FROM_EMAIL}>\r\n";
$headers .= "Reply-To: {$FROM_EMAIL}\r\n";

$sent = mail($RECIPIENT_EMAIL, $subject, $body, $headers);

if ($sent) {
    echo json_encode(['success' => true, 'message' => 'OK']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Ошибка отправки письма']);
}
