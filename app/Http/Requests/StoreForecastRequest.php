<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreForecastRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'bookmaker' => 'required',
            'sport' => 'required',
            'event' => 'required',
            'event_date' => 'required',
            'event_time' => 'required',
            'coefficient' => 'required',
            'result' => 'required',
            'bank_percent' => 'required',
            'bet' => 'required',
            'description' => 'required',
        ];
    }
}
