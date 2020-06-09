<?php

namespace App\Exports;

use App\Forecast;
use Maatwebsite\Excel\Concerns\FromCollection;

class ForecastsExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Forecast::all();
    }
}
