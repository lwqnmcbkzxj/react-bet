<?php

namespace App\Http\Controllers\Api;

use App\Championship;
use App\Coefficient;
use App\Event;
use App\Forecast;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Str;
use KubAT\PhpSimple\HtmlDomParser;
use Illuminate\Support\Facades\Hash;

class ForecastController extends Controller
{

    public function addUsers(Request $request) {
        // url of all users
        $url = "https://vprognoze.ru/engine/modules/fc_statalluser.php?order=profitdesc&do=cmptopall&type=3&cid=".$request['date']."&ajax=1&page=".$request['page'];

        $user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36';

        $options = array(

            CURLOPT_CUSTOMREQUEST  =>"GET",        //set request type post or get
            CURLOPT_POST           =>false,        //set to GET
            CURLOPT_USERAGENT      => $user_agent, //set user agent
            CURLOPT_COOKIEFILE     =>"cookie.txt", //set cookie file
            CURLOPT_COOKIEJAR      =>"cookie.txt", //set cookie jar
            CURLOPT_RETURNTRANSFER => true,     // return web page
            CURLOPT_HEADER         => false,    // don't return headers
            CURLOPT_FOLLOWLOCATION => true,     // follow redirects
            CURLOPT_ENCODING       => "",       // handle all encodings
            CURLOPT_AUTOREFERER    => true,     // set referer on redirect
            CURLOPT_CONNECTTIMEOUT => 120,      // timeout on connect
            CURLOPT_TIMEOUT        => 120,      // timeout on response
            CURLOPT_MAXREDIRS      => 10,       // stop after 10 redirects
            CURLOPT_COOKIE         => 'rerf=AAAAAF2bl8J4WeKdAwZwAg==; PHPSESSID=b9c7f6ccfecde74558c2822db595abde; login_user_token=f1f075e913f5f3786bedfc1e3cc0aea1; ipp_uid2=wTQBQlSCID0Pf07Q/TrglznSFQ6whahFxb9RAJA==; ipp_uid1=1570478018759; ipp_key=v1570478018759/v3394bdb4d991412fbbdbf8163aeca6afa04ab3/QR96PYcaP1M0xheCVCl9UQ==; ipp_uid=1570478018759/wTQBQlSCID0Pf07Q/TrglznSFQ6whahFxb9RAJA==; _utma=187128303.2046176704.1570477915.1570477915.1570477915.1; _utmc=187128303; _utmz=187128303.1570477915.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); ym_uid=1570477915294417550; ym_d=1570477915; ym_isad=2; ym_visorc_5916940=w; ym_visorc_54732931=w; ym_visorc_53858797=b; autotimezone=3; _utmb=187128303.8.10.1570477915',
            CURLOPT_HTTPHEADER     => array(
                'accept: */*',
                'accept-language: ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                'referer: https://vprognoze.ru/statalluser/3/',
                'sec-fetch-mode: cors',
                'sec-fetch-site: same-origin',
                'x-requested-with: XMLHttpRequest'
            ),
        );

        $ch      = curl_init( $url );
        curl_setopt_array( $ch, $options );
        $content = curl_exec( $ch );
        curl_close( $ch );

        $html = HtmlDomParser::str_get_html($content);

        // get uid of all users and start to parsing them
        foreach ($html->find('tr') as $tr) {
            if ($tr->children[7]->children[0]->plaintext > 60 && $tr->children[4]->children[0]->plaintext > 15 && $tr->children[8]->children[0]->plaintext > 4 ) {
                $link_with_id = $tr->children[5]->children[0]->attr['href'];
                $link_parametrs_array = explode('&', $link_with_id);
                $uid = substr($link_parametrs_array[3], 4);


                if (!User::where('uid', $uid)->exists()) {
                    $this->createNewUser($uid);
                }
            }
            else {
                continue;
            }
        }
    }

    public function addForecast() {
        $users = User::where('role_id', 2)->get();
        foreach ($users as $user) {
            if ($user->uid !== null) {
                $this->getUserLastForecasts($user->uid, $user);
            }
        }
    }

    public function getForecastStatus() {
        $users = User::where('role_id', 2)->get();
        foreach ($users as $user) {
            if ($user->uid !== null) {
                $this->getUserForecasts($user->uid, $user);
            }
        }
    }

    private function getUserForecasts($uid, $user) {
        $url = "https://vprognoze.ru/engine/gouser.php?userid=" . $uid;

        $user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36';

        $options = array(
            CURLOPT_CUSTOMREQUEST  =>"GET",        //set request type post or get
            CURLOPT_POST           =>false,        //set to GET
            CURLOPT_USERAGENT      => $user_agent, //set user agent
            CURLOPT_COOKIEFILE     =>"cookie.txt", //set cookie file
            CURLOPT_COOKIEJAR      =>"cookie.txt", //set cookie jar
            CURLOPT_RETURNTRANSFER => true,     // return web page
            CURLOPT_HEADER         => false,    // don't return headers
            CURLOPT_FOLLOWLOCATION => true,     // follow redirects
            CURLOPT_ENCODING       => "",       // handle all encodings
            CURLOPT_AUTOREFERER    => true,     // set referer on redirect
            CURLOPT_CONNECTTIMEOUT => 120,      // timeout on connect
            CURLOPT_TIMEOUT        => 120,      // timeout on response
            CURLOPT_MAXREDIRS      => 10,       // stop after 10 redirects
            CURLOPT_COOKIE         => 'rerf=AAAAAF2bl8J4WeKdAwZwAg==; PHPSESSID=b9c7f6ccfecde74558c2822db595abde; login_user_token=f1f075e913f5f3786bedfc1e3cc0aea1; ipp_uid2=wTQBQlSCID0Pf07Q/TrglznSFQ6whahFxb9RAJA==; ipp_uid1=1570478018759; ipp_key=v1570478018759/v3394bdb4d991412fbbdbf8163aeca6afa04ab3/QR96PYcaP1M0xheCVCl9UQ==; ipp_uid=1570478018759/wTQBQlSCID0Pf07Q/TrglznSFQ6whahFxb9RAJA==; _utma=187128303.2046176704.1570477915.1570477915.1570477915.1; _utmc=187128303; _utmz=187128303.1570477915.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); ym_uid=1570477915294417550; ym_d=1570477915; ym_isad=2; ym_visorc_5916940=w; ym_visorc_54732931=w; ym_visorc_53858797=b; autotimezone=3; _utmb=187128303.8.10.1570477915',
            CURLOPT_HTTPHEADER     => array(
                'accept: */*',
                'accept-language: ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                'referer: https://vprognoze.ru/statalluser/3/',
                'sec-fetch-mode: cors',
                'sec-fetch-site: same-origin',
                'x-requested-with: XMLHttpRequest'
            ),
        );

        $ch      = curl_init( $url );
        curl_setopt_array( $ch, $options );
        $content = curl_exec( $ch );
        curl_close( $ch );

        $html = HtmlDomParser::str_get_html($content);

        // Get match title and sport type
        foreach ($html->find('.news_boxing > .user_info > table > tbody > tr') as $tr) {
            if (!isset($tr->children[1])) {
                continue;
            }
            $date = $tr->children[1]->children[0]->children[0]->plaintext;
            $date = $date . '-' . date('Y');
            $date = date('d-m-Y', strtotime($date));
            $today = date('d-m-Y');
            $need_date = date('d-m-Y', strtotime('-1 day'));

            // Если дата равно сегодняшней или вчерашней
//            if ($date <= $today && $date >= $need_date) {

                $url = $tr->children[2]->children[0]->children[0]->attr['href'];

                $match_title = $tr->children[2]->children[0]->children[0]->plaintext;

                if ($url !== null) {
                    $result = $this->getEventResult($url);
                    if ($result === false) {
                        continue;
                    }
                } else {
                    continue;
                }

                if ($result[0] !== null) {
                    if (Event::where('title', $match_title)->exists()) {
                        $event = Event::where('title', $match_title)->first();
                        if ($event->status === 1) {
                            if (Forecast::where('user_id', $user->id)->where('event_id', $event->id)->exists()) {
                                $forecast = Forecast::where('user_id', $user->id)->where('event_id', $event->id)->first();
                                $coefficient = $forecast->coefficient()->first();
                                if ($result[1] === 'resplus') {
                                    $event->update([
                                        'status' => 2
                                    ]);
                                    $coefficient->update([
                                        'status' => 2
                                    ]);

                                    $user->update([
                                        'balance' => $user->balance + ($forecast->coefficient()->first()->coefficient * $forecast->coefficient()->first()->bet)
                                    ]);
                                }
                                elseif ($result[1] === 'resminus') {
                                    $event->update([
                                        'status' => 2
                                    ]);
                                    $coefficient->update([
                                        'status' => 3
                                    ]);
                                }

                                elseif ($result[1] === 'resnull') {
                                    $event->update([
                                        'status' => 2
                                    ]);
                                    $coefficient->update([
                                        'status' => 0
                                    ]);


                                    $user->update([
                                        'balance' => $user->balance + $forecast->coefficient()->first()->bet
                                    ]);
                                }
                            }
                        }
                    }
                }
//            }

        }
    }

    private function getEventResult($url) {
        $user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36';

        $options = array(

            CURLOPT_CUSTOMREQUEST  =>"GET",        //set request type post or get
            CURLOPT_POST           =>false,        //set to GET
            CURLOPT_USERAGENT      => $user_agent, //set user agent
            CURLOPT_COOKIEFILE     =>"cookie.txt", //set cookie file
            CURLOPT_COOKIEJAR      =>"cookie.txt", //set cookie jar
            CURLOPT_RETURNTRANSFER => true,     // return web page
            CURLOPT_HEADER         => false,    // don't return headers
            CURLOPT_FOLLOWLOCATION => true,     // follow redirects
            CURLOPT_ENCODING       => "",       // handle all encodings
            CURLOPT_AUTOREFERER    => true,     // set referer on redirect
            CURLOPT_CONNECTTIMEOUT => 120,      // timeout on connect
            CURLOPT_TIMEOUT        => 120,      // timeout on response
            CURLOPT_MAXREDIRS      => 10,       // stop after 10 redirects
            CURLOPT_COOKIE         => 'rerf=AAAAAF2bl8J4WeKdAwZwAg==; PHPSESSID=b9c7f6ccfecde74558c2822db595abde; login_user_token=f1f075e913f5f3786bedfc1e3cc0aea1; ipp_uid2=wTQBQlSCID0Pf07Q/TrglznSFQ6whahFxb9RAJA==; ipp_uid1=1570478018759; ipp_key=v1570478018759/v3394bdb4d991412fbbdbf8163aeca6afa04ab3/QR96PYcaP1M0xheCVCl9UQ==; ipp_uid=1570478018759/wTQBQlSCID0Pf07Q/TrglznSFQ6whahFxb9RAJA==; _utma=187128303.2046176704.1570477915.1570477915.1570477915.1; _utmc=187128303; _utmz=187128303.1570477915.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); ym_uid=1570477915294417550; ym_d=1570477915; ym_isad=2; ym_visorc_5916940=w; ym_visorc_54732931=w; ym_visorc_53858797=b; autotimezone=3; _utmb=187128303.8.10.1570477915',
            CURLOPT_HTTPHEADER     => array(
                'accept: */*',
                'accept-language: ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                'referer: https://vprognoze.ru/statalluser/3/',
                'sec-fetch-mode: cors',
                'sec-fetch-site: same-origin',
                'x-requested-with: XMLHttpRequest'
            ),
        );

        $ch      = curl_init( $url );
        curl_setopt_array( $ch, $options );
        $content = curl_exec( $ch );
        curl_close( $ch );

        $html = HtmlDomParser::str_get_html($content);
        if (!isset($html->find('.predict_data', 0)->children[1]->children[0])){
            return false;
        }
        $result[] = $html->find('.predict_data', 0)->children[1]->children[0]->plaintext;
        $result[] = $html->find('.predict_data', 0)->children[1]->children[0]->attr['class'];

        return $result;
    }

    private function getUserLastForecasts($uid, $user) {
        $url = "https://vprognoze.ru/engine/gouser.php?userid=" . $uid;

        $user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36';

        $options = array(
            CURLOPT_CUSTOMREQUEST  =>"GET",        //set request type post or get
            CURLOPT_POST           =>false,        //set to GET
            CURLOPT_USERAGENT      => $user_agent, //set user agent
            CURLOPT_COOKIEFILE     =>"cookie.txt", //set cookie file
            CURLOPT_COOKIEJAR      =>"cookie.txt", //set cookie jar
            CURLOPT_RETURNTRANSFER => true,     // return web page
            CURLOPT_HEADER         => false,    // don't return headers
            CURLOPT_FOLLOWLOCATION => true,     // follow redirects
            CURLOPT_ENCODING       => "",       // handle all encodings
            CURLOPT_AUTOREFERER    => true,     // set referer on redirect
            CURLOPT_CONNECTTIMEOUT => 120,      // timeout on connect
            CURLOPT_TIMEOUT        => 120,      // timeout on response
            CURLOPT_MAXREDIRS      => 10,       // stop after 10 redirects
            CURLOPT_COOKIE         => 'rerf=AAAAAF2bl8J4WeKdAwZwAg==; PHPSESSID=b9c7f6ccfecde74558c2822db595abde; login_user_token=f1f075e913f5f3786bedfc1e3cc0aea1; ipp_uid2=wTQBQlSCID0Pf07Q/TrglznSFQ6whahFxb9RAJA==; ipp_uid1=1570478018759; ipp_key=v1570478018759/v3394bdb4d991412fbbdbf8163aeca6afa04ab3/QR96PYcaP1M0xheCVCl9UQ==; ipp_uid=1570478018759/wTQBQlSCID0Pf07Q/TrglznSFQ6whahFxb9RAJA==; _utma=187128303.2046176704.1570477915.1570477915.1570477915.1; _utmc=187128303; _utmz=187128303.1570477915.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); ym_uid=1570477915294417550; ym_d=1570477915; ym_isad=2; ym_visorc_5916940=w; ym_visorc_54732931=w; ym_visorc_53858797=b; autotimezone=3; _utmb=187128303.8.10.1570477915',
            CURLOPT_HTTPHEADER     => array(
                'accept: */*',
                'accept-language: ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                'referer: https://vprognoze.ru/statalluser/3/',
                'sec-fetch-mode: cors',
                'sec-fetch-site: same-origin',
                'x-requested-with: XMLHttpRequest'
            ),
        );

        $ch      = curl_init( $url );
        curl_setopt_array( $ch, $options );
        $content = curl_exec( $ch );
        curl_close( $ch );

        $html = HtmlDomParser::str_get_html($content);

        // Get match title and sport type
        foreach ($html->find('.news_boxing > .user_info > table > tbody > tr') as $tr) {
            if (!isset($tr->children[1])) {
                continue;
            }
            $date = $tr->children[1]->children[0]->children[0]->plaintext;
            $date = $date . '-' . date('Y');
            $date = date('d-m-Y', strtotime($date));
            $today = date('d-m-Y');

            if ($date < $today ) {
                return;
            }

            $url = $tr->children[2]->children[0]->children[0]->attr['href'];

            $match_title = $tr->children[2]->children[0]->children[0]->plaintext;

            if ($match_title == 'Экспресс') {
                continue;
            }

            // Get coefficient and forecast
            $forecast_with_coefficient = $tr->children[3]->plaintext;
            $forecast_array = explode(' @ ', $forecast_with_coefficient);
            $type = $forecast_array[0];
            $coefficient = $forecast_array[1];

            if ($url !== null) {
                $data = $this->getTextForecast($url);
                if ($data === false) {
                    continue;
                }
                $post_content = $data[0];
                $date = $data[1];
                $bet = $data[2];
            }

            if (!Event::where('title', $match_title)->exists()) {
                $match_meta = $tr->children[2]->children[1]->plaintext;
                $championship = $match_meta;
                $match_meta = explode('.', $match_meta);
                $sport_type = $match_meta[0];

                if ($sport_type === 'Футбол') {
                    $sport_id = 1;
                }
                elseif ($sport_type === 'Теннис') {
                    $sport_id = 2;
                }
                elseif ($sport_type === 'Баскетбол') {
                    $sport_id = 3;
                }
                elseif ($sport_type === 'Хоккей') {
                    $sport_id = 4;
                }
                else {
                    $sport_id = 5;
                }

                if (!Championship::where('name', $championship)->exists()) {
                    $championship = Championship::create([
                        'name' => $championship,
                        'sport_id' => $sport_id
                    ]);
                }
                else {
                    $championship = Championship::where('name', $championship)->first();
                }


                $event = Event::create([
                    'title' => $match_title,
                    'championship_id' => $championship->id,
                    'start' => $date,
                    'sport_id' => $sport_id
                ]);
            }
            else {
                $event = Event::where('title', $match_title)->first();
            }

            if (!Forecast::where('user_id', $user->id)->where('event_id', $event->id)->exists()) {
                if (!Coefficient::where('event_id', $event->id)->where('type', $type)->exists()) {
                    $coefficient_object = Coefficient::create([
                        'event_id' => $event->id,
                        'type' => $type,
                        'coefficient' => $coefficient,
                    ]);
                }
                else {
                    $coefficient_object = Coefficient::where('event_id', $event->id)->where('type', $type)->first();
                }

                $forecast = Forecast::create([
                    'user_id' => $user->id,
                    'event_id' => $event->id,
                    'coefficient_id' => $coefficient_object->id,
                    'forecast' => $post_content,
                    'bet' => $bet,
                ]);

                $this->sendEmail($user, $forecast, $event, $coefficient);

                $user->update([
                    'balance' => $user->balance - $bet
                ]);
            }

        }
    }

    private function getTextForecast($url) {
        $user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36';

        $options = array(

            CURLOPT_CUSTOMREQUEST  =>"GET",        //set request type post or get
            CURLOPT_POST           =>false,        //set to GET
            CURLOPT_USERAGENT      => $user_agent, //set user agent
            CURLOPT_COOKIEFILE     =>"cookie.txt", //set cookie file
            CURLOPT_COOKIEJAR      =>"cookie.txt", //set cookie jar
            CURLOPT_RETURNTRANSFER => true,     // return web page
            CURLOPT_HEADER         => false,    // don't return headers
            CURLOPT_FOLLOWLOCATION => true,     // follow redirects
            CURLOPT_ENCODING       => "",       // handle all encodings
            CURLOPT_AUTOREFERER    => true,     // set referer on redirect
            CURLOPT_CONNECTTIMEOUT => 120,      // timeout on connect
            CURLOPT_TIMEOUT        => 120,      // timeout on response
            CURLOPT_MAXREDIRS      => 10,       // stop after 10 redirects
            CURLOPT_COOKIE         => 'rerf=AAAAAF2bl8J4WeKdAwZwAg==; PHPSESSID=b9c7f6ccfecde74558c2822db595abde; login_user_token=f1f075e913f5f3786bedfc1e3cc0aea1; ipp_uid2=wTQBQlSCID0Pf07Q/TrglznSFQ6whahFxb9RAJA==; ipp_uid1=1570478018759; ipp_key=v1570478018759/v3394bdb4d991412fbbdbf8163aeca6afa04ab3/QR96PYcaP1M0xheCVCl9UQ==; ipp_uid=1570478018759/wTQBQlSCID0Pf07Q/TrglznSFQ6whahFxb9RAJA==; _utma=187128303.2046176704.1570477915.1570477915.1570477915.1; _utmc=187128303; _utmz=187128303.1570477915.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); ym_uid=1570477915294417550; ym_d=1570477915; ym_isad=2; ym_visorc_5916940=w; ym_visorc_54732931=w; ym_visorc_53858797=b; autotimezone=3; _utmb=187128303.8.10.1570477915',
            CURLOPT_HTTPHEADER     => array(
                'accept: */*',
                'accept-language: ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                'referer: https://vprognoze.ru/statalluser/3/',
                'sec-fetch-mode: cors',
                'sec-fetch-site: same-origin',
                'x-requested-with: XMLHttpRequest'
            ),
        );

        $ch      = curl_init( $url );
        curl_setopt_array( $ch, $options );
        $content = curl_exec( $ch );
        $err     = curl_errno( $ch );
        $errmsg  = curl_error( $ch );
        $header  = curl_getinfo( $ch );
        curl_close( $ch );

        $header['errno']   = $err;
        $header['errmsg']  = $errmsg;
        $header['content'] = $content;

        $html = HtmlDomParser::str_get_html($content);

        if (!isset($html->find('.predict_data', 0)->children[0])) {
            return false;
        }

        $forecast_text = $html->find('.predict', 0)->children[4]->plaintext;
        $data[] = $forecast_text;

        $date = $html->find('.predict_data', 0)->children[0]->children[0]->children[1]->plaintext;
        $date = str_replace('(', '', $date);
        $date = str_replace(')', '', $date);
        $data[] = $date;

        $rate = $html->find('.predict_info', 0)->children[2]->children[1]->children[0]->plaintext;
        $data[] = $rate;

        return $data;
    }

    private function createNewUser($uid) {
        $url = "https://vprognoze.ru/engine/gouser.php?userid=" . $uid;

        $user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36';

        $options = array(
            CURLOPT_CUSTOMREQUEST  =>"GET",        //set request type post or get
            CURLOPT_POST           =>false,        //set to GET
            CURLOPT_USERAGENT      => $user_agent, //set user agent
            CURLOPT_COOKIEFILE     =>"cookie.txt", //set cookie file
            CURLOPT_COOKIEJAR      =>"cookie.txt", //set cookie jar
            CURLOPT_RETURNTRANSFER => true,     // return web page
            CURLOPT_HEADER         => false,    // don't return headers
            CURLOPT_FOLLOWLOCATION => true,     // follow redirects
            CURLOPT_ENCODING       => "",       // handle all encodings
            CURLOPT_AUTOREFERER    => true,     // set referer on redirect
            CURLOPT_CONNECTTIMEOUT => 120,      // timeout on connect
            CURLOPT_TIMEOUT        => 120,      // timeout on response
            CURLOPT_MAXREDIRS      => 10,       // stop after 10 redirects
            CURLOPT_COOKIE         => 'rerf=AAAAAF2bl8J4WeKdAwZwAg==; PHPSESSID=b9c7f6ccfecde74558c2822db595abde; login_user_token=f1f075e913f5f3786bedfc1e3cc0aea1; ipp_uid2=wTQBQlSCID0Pf07Q/TrglznSFQ6whahFxb9RAJA==; ipp_uid1=1570478018759; ipp_key=v1570478018759/v3394bdb4d991412fbbdbf8163aeca6afa04ab3/QR96PYcaP1M0xheCVCl9UQ==; ipp_uid=1570478018759/wTQBQlSCID0Pf07Q/TrglznSFQ6whahFxb9RAJA==; _utma=187128303.2046176704.1570477915.1570477915.1570477915.1; _utmc=187128303; _utmz=187128303.1570477915.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); ym_uid=1570477915294417550; ym_d=1570477915; ym_isad=2; ym_visorc_5916940=w; ym_visorc_54732931=w; ym_visorc_53858797=b; autotimezone=3; _utmb=187128303.8.10.1570477915',
            CURLOPT_HTTPHEADER     => array(
                'accept: */*',
                'accept-language: ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                'referer: https://vprognoze.ru/statalluser/3/',
                'sec-fetch-mode: cors',
                'sec-fetch-site: same-origin',
                'x-requested-with: XMLHttpRequest'
            ),
        );

        $ch      = curl_init( $url );
        curl_setopt_array( $ch, $options );
        $content = curl_exec( $ch );
        $err     = curl_errno( $ch );
        $errmsg  = curl_error( $ch );
        $header  = curl_getinfo( $ch );
        curl_close( $ch );

        $header['errno']   = $err;
        $header['errmsg']  = $errmsg;
        $header['content'] = $content;

        $html = HtmlDomParser::str_get_html($content);
        $img_url = $html->find('.v-user__avatar-inner img', 0)->attr['src'];
        $user_name = $html->find('.v-user__nickname span', 0)->plaintext;
        $login = $this->translit($user_name);
        $email = $login . '@gmail.com';
        $balance_with_chars = $html->find('.v-user-stats__list-item_bank', 0)->children[1]->children[0]->plaintext;
        $balance = (int)preg_replace('/[^0-9]/', '', $balance_with_chars);

        $random_password = Hash::make(Str::random(12));

        User::create([
            'login' => $login,
            'role_id' => 2,
            'email' => $email,
            'password' => $random_password,
            'balance' => $balance,
            'avatar' => $img_url,
            'uid' => $uid
        ]);

    }

    private function translit($s) {
        $s = (string) $s; // преобразуем в строковое значение
        $s = strip_tags($s); // убираем HTML-теги
        $s = str_replace(array("\n", "\r"), " ", $s); // убираем перевод каретки
        $s = preg_replace("/\s+/", ' ', $s); // удаляем повторяющие пробелы
        $s = trim($s); // убираем пробелы в начале и конце строки
        $s = function_exists('mb_strtolower') ? mb_strtolower($s) : strtolower($s); // переводим строку в нижний регистр (иногда надо задать локаль)
        $s = strtr($s, array('а'=>'a','б'=>'b','в'=>'v','г'=>'g','д'=>'d','е'=>'e','ё'=>'e','ж'=>'j','з'=>'z','и'=>'i','й'=>'y','к'=>'k','л'=>'l','м'=>'m','н'=>'n','о'=>'o','п'=>'p','р'=>'r','с'=>'s','т'=>'t','у'=>'u','ф'=>'f','х'=>'h','ц'=>'c','ч'=>'ch','ш'=>'sh','щ'=>'shch','ы'=>'y','э'=>'e','ю'=>'yu','я'=>'ya','ъ'=>'','ь'=>''));
        $s = preg_replace("/[^0-9a-z-_ ]/i", "", $s); // очищаем строку от недопустимых символов
        $s = str_replace(" ", "-", $s); // заменяем пробелы знаком минус
        return $s; // возвращаем результат
    }

    private function sendEmail($user, $forecast, $event, $coefficient) {
        $subscriptions = $user->subscriptions()->where('is_email_notification', true)->get();
        foreach ($subscriptions as $subscription) {
            $title = "Прогноз от: " . " " . $user->login . " / " . $forecast->created_at;
            $content = "Приветствуем!" . "<br>" .
                "Новый прогноз от пользователя " . $user->login. "<br>" .
                $event->championship . "<br>" .
                $event->title . "<br>" .
                "Прогноз: " . $forecast->forecast . "<br>" .
                "Кф. " . $coefficient->coefficient . "<br>" .
                "Ставка: " . $forecast->bet . "<br>" .
                "Начало игры: " . $event->start . "<br>" .
                "<a href='https://xbethub.com/users/".$user->id."'>Перейти в профиль пользователя</a>" . "<br><br><br>" .
                "Пожалуйста, не отвечайте на это письмо. 
                        Оно отправлено автоматически с адреса, который не принимает обратную почту. 
                        Если вы хотите с нами связаться, воспользуйтесь ссылкой \"<a href='https://xbethub.com/feedback/'>Контакты</a>\" ";
            $headers = array(
                'content-type: text/html',
            );

            mail($subscription->email, $title, $content, $headers);
        }
    }
}
