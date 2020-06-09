<?php

namespace App\Exports;

use App\Championship;
use Maatwebsite\Excel\Concerns\FromCollection;

class ChampionshipsExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Championship::all();
    }
}
