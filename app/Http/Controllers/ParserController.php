<?php

namespace App\Http\Controllers;

use App\Championship;
use App\Coefficient;
use App\Forecast;
use App\Http\Resources\Event;
use App\Http\Resources\Post;
use App\Http\Resources\User;
use App\Sport;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use function GuzzleHttp\Promise\iter_for;

class ParserController extends Controller
{
    public function addChampionship($championship_data)
    {
        $championship = \App\Event::where('title', '=', $championship_data->championship)->first();
        $sport = Sport::where('name', $championship_data->sport_name)->first();
        if (!$sport)
            $sport = Sport::find(5);
        if (!$championship) {
            $championship = new Championship();
            $championship->sport_id = $sport->id;
            $championship->name = $championship_data->championship;
            $championship->save();
        }
        return $championship;
    }

    public function addEvent($event_data)
    {
        $event = \App\Event::query()
            ->where('start', '=', $event_data->event_start)
            ->where('title', '=', $event_data->event)->first();
        if (!$event) {
            $event = new \App\Event();
            $championship = $this->addChampionship($event_data->championship_data);
            $event->championship_id = $championship->id;
            $event->sport_id = $championship->sport_id;
            $event->start = $event_data->event_start;
            $event->title = $event_data->event;
            $event->status = 1;
            $event->save();
        }
        return $event;
    }

    public function addForecasts()
    {

//        $client = new Client();
        $users = DB::table('users')->select(['uid as userid'])->whereNotNull('uid')->get();
        $query = $users->map(function ($item, $key) {
            return 'userid=' . $item->userid;
        })->join('&');

        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL =>  env('PARSER_URL',"http://bhub.sixhands.co")."/parser/GetLastForecast?" . $query,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET",
        ));

        $response = curl_exec($curl);
        $response = json_decode($response);
        curl_close($curl);
        $response = collect($response);
        $res = $query;
        $response->map(function ($item, $key) use (&$res) {
            $userforecasts = collect($item->forecasts);
            $user_id = \App\User::query()->select('id')->where('uid', '=', $item->user_id)->first()->id;
            $userforecasts->map(function ($new_forecast, $key) use ($user_id, &$res) {
                $new_forecast = collect($new_forecast);
                //$res = $new_forecast['bet_data']->type;
                //return $res;
                $event = $this->addEvent($new_forecast['event_data']);
                if (!Coefficient::where('event_id', $event->id)->where('type', $new_forecast['bet_data']->type)->exists()) {
                    $coefficient = Coefficient::create([
                        'event_id' => $event->id,
                        'type' => $new_forecast['bet_data']->type,
                        'coefficient' => $new_forecast['bet_data']->coefficient,
                    ]);
                } else {
                    $coefficient = Coefficient::where('event_id', $event->id)->where('type', $new_forecast['bet_data']->type)->first();
                }
                $forecast_text = $new_forecast['forecast_text'];
                $forecast_text = (string)$forecast_text; // преобразуем в строковое значение
                $forecast_text = strip_tags($forecast_text); // убираем HTML-теги
                $forecast_text = str_replace(array("\n", "\r"), " ", $forecast_text); // убираем перевод каретки
                $forecast_text = preg_replace("/\s+/", ' ', $forecast_text); // удаляем повторяющие пробелы
                $s = trim($forecast_text); // убираем пробелы в начале и конце строки
                $forecast = Forecast::query()->where('forecast_text', '=', $forecast_text)->first();
                if (!$forecast) {
                    $forecast = Forecast::create([
                        'user_id' => $user_id,
                        'event_id' => $event->id,
                        'coefficient_id' => $coefficient->id,
                        'forecast_text' => $forecast_text,
                        'bet' => 100,
                    ]);
                }
                $forecast->parser_forecast_id = $new_forecast['parser_forecast_id'];
                $forecast->bookmaker_id = 0;
                $forecast->save();
            });
        });
        return $this->sendResponse(($res), 'Success', 200);
    }

    public function updateForecasts()
    {
        $forecasts = Forecast::query()->whereNotNull('parser_forecast_id')->get();
        $query = $forecasts->map(function ($item, $key) {
            return 'url=' . $item->parser_forecast_id;
        })->join('&');
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => env('PARSER_URL',"http://bhub.sixhands.co")."/parser/GetForecast?".$query,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET",
        ));
        $response = curl_exec($curl);
        $res = collect();
        $response = collect(json_decode($response));
        curl_close($curl);
        $response->map(function ($item, $key) use (&$res){
            $forecast = Forecast::where('parser_forecast_id','=',$item->parser_forecast_id)->first();
            $res->push(collect($forecast));
            if($forecast instanceof Forecast)
            {
                if(now()->unix() - Date::createFromFormat('Y-m-d H:i:s', $forecast->event()->first()->start)->unix() < Date::createFromTime(3)->unix())
                {
                    return;
                }
                $event = $forecast->event()->first();
                $res->push($event);
                $event->score = $item->event_data->score;
                $event->status = 2;
                $event->save();
                $coefficient = $forecast->coefficient()->first();
                $coefficient->status = $item->bet_data->status;
                $coefficient->save();
            }
            else
                return;
        });
        return $this->sendResponse($res,'Success',200);
    }
}
