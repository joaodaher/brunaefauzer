<?php
    require 'vendor/autoload.php';

	// IF VALIDATION ERROR
	if (isset($_POST["all_error_required"])){
		$output = json_encode(array('type'=>'error', 'text' => $_POST["all_error_required"][0]));
		die($output);
	}
	
	// IF NO ERROR
	if (isset($_POST["all_input_id"])){
		
		$finalmessage = "";
		foreach ($_POST["all_input_id"] as $input_id) {
			if (is_array($_POST[$input_id])){
				$finalmessage .= $_POST[$input_id."_label"]." : ".implode(", ", $_POST[$input_id]). "\n\n";
			}
			else
			{
				$finalmessage .= $_POST[$input_id."_label"]." : ". $_POST[$input_id] . "\n\n";
			}
		}
	
		$email_to  =  'joao.daher.neto@gmail.com';

		$from = new SendGrid\Email(null, $_POST["inputemail"]);
        $subject = "[RSVP] de ".$_POST["inputname"];
        $to = new SendGrid\Email(null, $email_to);
        $content = new SendGrid\Content("text/plain", $finalmessage);
        $mail = new SendGrid\Mail($from, $subject, $to, $content);

        $apiKey = getenv('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');
        $sg = new \SendGrid($apiKey);

        $response = $sg->client->mail()->send()->post($mail);

        echo $response->statusCode();
        echo $response->headers();
        echo $response->body();

		die(json_encode(array('type'=>'success', 'text' => $response->body())));
//		if($response->statusCode() == 200){
//        	die(json_encode(array('type'=>'success', 'text' => 'Enviado! Muito obrigado!')));
//    	} else {
//        	die(json_encode(array('type'=>'error', 'text' => 'Ocorreu um erro. Tente novamente.')));
//   		}
	}	
?>