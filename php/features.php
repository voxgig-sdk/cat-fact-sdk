<?php
declare(strict_types=1);

// CatFact SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class CatFactFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new CatFactBaseFeature();
            case "test":
                return new CatFactTestFeature();
            default:
                return new CatFactBaseFeature();
        }
    }
}
