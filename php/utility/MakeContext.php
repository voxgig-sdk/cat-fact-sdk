<?php
declare(strict_types=1);

// CatFact SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class CatFactMakeContext
{
    public static function call(array $ctxmap, ?CatFactContext $basectx): CatFactContext
    {
        return new CatFactContext($ctxmap, $basectx);
    }
}
