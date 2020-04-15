<?php

use Illuminate\Database\Seeder;
use App\Option;

class OptionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Option::create([
            'key' => 'favicon',
            'label' => 'favicon',
            'type' => 'image'
        ]);
        Option::create([
            'key' => 'telegram',
            'label' => 'Телеграм'
        ]);
        Option::create([
            'key' => 'vk',
            'label' => 'Вконтакте'
        ]);
        Option::create([
            'key' => 'twitter',
            'label' => 'Твиттер'
        ]);
        Option::create([
            'key' => 'instagram',
            'label' => 'Инстаграм'
        ]);
        Option::create([
            'key' => 'facebook',
            'label' => 'Фейсбук'
        ]);
        Option::create([
            'key' => 'mobile_app_ios',
            'label' => 'Ссылка на мобильное приложение (IOS)'
        ]);
        Option::create([
            'key' => 'mobile_app_android',
            'label' => 'Ссылка на мобильное приложение (Android)'
        ]);
        Option::create([
            'key' => 'copyright',
            'label' => 'Копирайт'
        ]);
        Option::create([
            'key' => 'alert',
            'label' => 'Уведомление на главной',
            'type' => 'textarea'
        ]);
        Option::create([
            'key' => 'hide_forecast_message',
            'label' => 'Скрыть комментарии прогнозов',
            'type' => 'checkbox'
        ]);
        Option::create([
            'key' => 'email_feedback',
            'label' => 'Email для приема сообщений с формы обратной связи'
        ]);
        Option::create([
            'key' => 'scripts_head',
            'label' => 'Скрипты в head',
            'type' => 'textarea'
        ]);
        Option::create([
            'key' => 'scripts_footer',
            'label' => 'Скрипты в footer',
            'type' => 'textarea'
        ]);
    }
}
