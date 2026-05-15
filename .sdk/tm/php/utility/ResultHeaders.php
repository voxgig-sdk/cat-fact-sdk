<?php
declare(strict_types=1);

// CatFact SDK utility: result_headers

class CatFactResultHeaders
{
    public static function call(CatFactContext $ctx): ?CatFactResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
