<?php

namespace App\Console\Commands;

use Illuminate\Console\GeneratorCommand;

class MakeAdapterCommand extends GeneratorCommand
{
    protected $signature = 'make:adapter {name}';
    protected $description = 'Create a new Adapter (Adapters)';
    protected $type = 'Adapter';

    protected function getStub(): string
    {
        return base_path('stubs/adapter.stub');
    }

    protected function getDefaultNamespace($rootNamespace)
    {
        // Adjust later if you move to Infrastructure\\Adapters
        return $rootNamespace.'\\Adapters';
    }
}
