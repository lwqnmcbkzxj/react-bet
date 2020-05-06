<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateUserStatsView extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("CREATE
    ALGORITHM = TEMPTABLE
    DEFINER = `cibin`@`%`
    SQL SECURITY DEFINER
VIEW `user_stats_view` AS
    SELECT
        `forecasts`.`user_id` AS `user_id`,
        (SUM((CASE
            WHEN (`events`.`status` = 2) THEN (`forecasts`.`bet` * (`coefficients`.`coefficient` - 1))
            ELSE 0
        END)) / SUM(`forecasts`.`bet`)) AS `roi`,
        SUM((CASE
            WHEN (`events`.`status` = 2) THEN (`forecasts`.`bet` * (`coefficients`.`coefficient` - 1))
            ELSE 0
        END)) AS `pure_profit`,
        COUNT((CASE
            WHEN (`events`.`status` = 2) THEN 1
            ELSE NULL
        END)) AS `count_win`,
        COUNT((CASE
            WHEN (`events`.`status` = 3) THEN 1
            ELSE NULL
        END)) AS `count_loss`,
        COUNT((CASE
            WHEN (`events`.`status` = 1) THEN 1
            ELSE NULL
        END)) AS `count_wait`,
        COUNT((CASE
            WHEN (`events`.`status` = 0) THEN 1
            ELSE NULL
        END)) AS `count_back`
    FROM
        ((`forecasts`
        LEFT JOIN `events` ON ((`events`.`id` = `forecasts`.`event_id`)))
        LEFT JOIN `coefficients` ON ((`forecasts`.`coefficient_id` = `coefficients`.`id`)))
    GROUP BY `forecasts`.`user_id`
    ORDER BY `roi` DESC");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {

    }
}
