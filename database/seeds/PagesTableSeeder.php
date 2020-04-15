<?php

use Illuminate\Database\Seeder;
use App\Page;

class PagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Page::create([
            'title' => 'О нас'
        ]);
        Page::create([
            'title' => 'Политика конфиденциальности'
        ]);
    }
}
