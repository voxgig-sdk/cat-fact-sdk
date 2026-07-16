<?php
declare(strict_types=1);

// CatFact SDK base feature

class CatFactBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(CatFactContext $ctx, array $options): void {}
    public function PostConstruct(CatFactContext $ctx): void {}
    public function PostConstructEntity(CatFactContext $ctx): void {}
    public function SetData(CatFactContext $ctx): void {}
    public function GetData(CatFactContext $ctx): void {}
    public function GetMatch(CatFactContext $ctx): void {}
    public function SetMatch(CatFactContext $ctx): void {}
    public function PrePoint(CatFactContext $ctx): void {}
    public function PreSpec(CatFactContext $ctx): void {}
    public function PreRequest(CatFactContext $ctx): void {}
    public function PreResponse(CatFactContext $ctx): void {}
    public function PreResult(CatFactContext $ctx): void {}
    public function PreDone(CatFactContext $ctx): void {}
    public function PreUnexpected(CatFactContext $ctx): void {}
}
