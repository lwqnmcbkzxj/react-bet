<?php

namespace App\Exports;

use App\Bookmaker;
use Maatwebsite\Excel\Concerns\FromCollection;

class BookmakersExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Bookmaker::all();
    }
}
