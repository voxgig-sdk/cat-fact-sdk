<?php
declare(strict_types=1);

// CatFact SDK exists test

require_once __DIR__ . '/../catfact_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = CatFactSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
