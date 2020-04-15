<?php

use Illuminate\Database\Seeder;
use App\Sport;

class SportsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Sport::create([
            'name' => 'Футбол'
        ]);
        Sport::create([
            'name' => 'Теннис'
        ]);
        Sport::create([
            'name' => 'Баскетбол'
        ]);
        Sport::create([
            'name' => 'Хоккей'
        ]);
        Sport::create([
            'name' => 'Другое'
        ]);
    }
}
