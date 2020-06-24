<?php
header('Content-disposition: attachment; filename=Session-'.date('Y-m-d').'.txt');
$CONFIG = parse_ini_file("../../config.ini");

	if(isset($_POST['inputExportSession'])) {
		$key = base64_decode($CONFIG['cryptoKey']);
		$iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length('AES-256-CBC'));
		$encryptedSession = openssl_encrypt($_POST['inputExportSession'], 'AES-256-CBC', $key, 0, $iv);
		$encryptedSession = base64_encode($encryptedSession . '::' . $iv);
		echo $encryptedSession;
	}
?>