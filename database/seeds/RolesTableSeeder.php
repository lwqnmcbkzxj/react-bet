<?php

use Illuminate\Database\Seeder;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->insert([
            'name' => 'user',
            'label' => 'Пользователь'
        ]);
        DB::table('roles')->insert([
            'name' => 'forecaster_robot',
            'label' => 'Прогнозист робот'
        ]);
        DB::table('roles')->insert([
            'name' => 'moderator',
            'label' => 'Модератор',
        ]);
        DB::table('roles')->insert([
            'name' => 'admin',
            'label' => 'Администратор',
        ]);
        DB::table('roles')->insert([
            'name' => 'tech_admin',
            'label' => 'Технический администратор',
        ]);
    }
}
