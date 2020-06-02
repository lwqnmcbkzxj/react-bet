<?php


namespace App\Http\Traits;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Response;
//use Response;

trait ApiResponse
{
    /**
     * @param $result
     * @param $message
     * @param $code
     * @return mixed
     */
    public function sendResponse($result, $message, $code)
    {
        if(is_subclass_of($result, JsonResource::class))
        {
            return $result->toResponse(request())->setEncodingOptions(JSON_NUMERIC_CHECK);
        }
       return Response::json(self::makeResponse($message, $result), $code)->setEncodingOptions(JSON_NUMERIC_CHECK);
    }

    /**
     * @param $error
     * @param int $code
     * @param array $data
     * @return mixed
     */
    public function sendError($error, $code = 400, $data = []) {

        return Response::json(self::makeError($error, $data), $code);
    }

    /**
     * @param string $message
     * @param mixed  $data
     *
     * @return array
     */
    public static function makeResponse($message, $data)
    {
        return $data;
    }

    /**
     * @param string $message
     * @param array  $data
     *
     * @return array
     */
    public static function makeError($message, array $data = [])
    {
        $res = [
            'success' => false,
            'message' => $message,
        ];

        if (!empty($data)) {
            $res['data'] = $data;
        }

        return $res;
    }
}
