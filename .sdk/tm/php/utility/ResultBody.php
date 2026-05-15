<?php
declare(strict_types=1);

// CatFact SDK utility: result_body

class CatFactResultBody
{
    public static function call(CatFactContext $ctx): ?CatFactResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
