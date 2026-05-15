<?php
declare(strict_types=1);

// CatFact SDK utility: prepare_body

class CatFactPrepareBody
{
    public static function call(CatFactContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
