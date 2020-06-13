<?php
$address = $_GET['address'];

$url = "http://api-ropsten.etherscan.io/api?module=account&action=tokentx&address=". $address  ."&startblock=0&endblock=999999999&sort=desc&apikey=YourApiKeyToken&offset=100";

$ch = curl_init();                                 //curl 초기화
curl_setopt($ch, CURLOPT_URL, $url);               //URL 지정하기
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);    //요청 결과를 문자열로 반환 
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);      //connection timeout 10초 
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);   //원격 서버의 인증서가 유효한지 검사 안함
 
$response = curl_exec($ch);
curl_close($ch);

//echo $response;

$json = $response;
$obj = json_decode($json);
$objc = $obj->result[0];

$price = $objc->value / 1000000000000000000;

if(!strcmp(strtoupper($address) , strtoupper($objc->from))){
    echo "SELL<br>" . $objc->blockNumber . "<br>" . $price;
}

if(!strcmp(strtoupper($address) , strtoupper($objc->to))){
    echo "BUY<br>" . $objc->blockNumber . "<br>" . $price;
}

?>