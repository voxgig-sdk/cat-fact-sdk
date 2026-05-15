<?php
declare(strict_types=1);

// CatFact SDK utility: feature_add

class CatFactFeatureAdd
{
    public static function call(CatFactContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
