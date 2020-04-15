<?php

use Illuminate\Database\Seeder;
use App\Menu;

class MenuTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Menu::create([
            'title' => 'Главная',
            'path' => '/',
            'position' => 'top',
            'sort' => 0
        ]);
        Menu::create([
            'title' => 'Прогнозы',
            'path' => '/forecasts',
            'position' => 'top',
            'sort' => 1
        ]);
        Menu::create([
            'title' => 'Рейтинг игроков',
            'path' => '/rating',
            'position' => 'top',
            'sort' => 2
        ]);
        Menu::create([
            'title' => 'Статьи',
            'path' => '/posts',
            'position' => 'top',
            'sort' => 3
        ]);
        Menu::create([
            'title' => 'Новости',
            'path' => '/news',
            'position' => 'top',
            'sort' => 4
        ]);
        Menu::create([
            'title' => 'О нас',
            'path' => '/page/1',
            'position' => 'top',
            'sort' => 5
        ]);
        Menu::create([
            'title' => 'Обратная связь',
            'path' => '/feedback',
            'position' => 'top',
            'sort' => 6
        ]);
        Menu::create([
            'title' => 'О нас',
            'path' => '/page/1',
            'position' => 'footer',
            'sort' => 0
        ]);
        Menu::create([
            'title' => 'Обратная связь',
            'path' => '/feedback',
            'position' => 'footer',
            'sort' => 1
        ]);
        Menu::create([
            'title' => 'Политика конфиденциальности',
            'path' => '/page/2',
            'position' => 'footer',
            'sort' => 2
        ]);
    }
}
