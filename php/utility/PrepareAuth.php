<?php
declare(strict_types=1);

// CatFact SDK utility: prepare_auth

class CatFactPrepareAuth
{
    private const COOKIE_AUTH = 'connect.sid';
    private const HEADER_COOKIE = 'cookie';
    private const OPTION_APIKEY = 'apikey';
    private const NOT_FOUND = '__NOTFOUND__';

    public static function call(CatFactContext $ctx): array
    {
        $spec = $ctx->spec;
        if (!$spec) {
            return [null, $ctx->make_error('auth_no_spec', 'Expected context spec property to be defined.')];
        }

        $headers = &$spec->headers;
        $options = $ctx->client->options_map();

        // Public APIs that need no auth omit the options.auth block entirely.
        if (!isset($options['auth']) || $options['auth'] === null) {
            return [$spec, null];
        }

        $apikey = \Voxgig\Struct\Struct::getprop($options, self::OPTION_APIKEY, self::NOT_FOUND);

        $missing = (is_string($apikey) && ($apikey === self::NOT_FOUND || $apikey === ''))
            || $apikey === null;

        if (!$missing) {
            // A COOKIE IS APPENDED, NEVER ASSIGNED: the header may already
            // carry the caller's own cookies, and one `Cookie:` header
            // holds all of them, separated by '; '.
            $apikey_val = is_string($apikey) ? $apikey : '';
            $existing = $headers[self::HEADER_COOKIE] ?? '';
            $pair = self::COOKIE_AUTH . '=' . $apikey_val;
            $headers[self::HEADER_COOKIE] = $existing === ''
                ? $pair : "{$existing}; {$pair}";
        }

        return [$spec, null];
    }
}
