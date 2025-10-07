<?php

namespace App\Console\Commands;

use Illuminate\Console\GeneratorCommand;

class MakePortCommand extends GeneratorCommand
{
    protected $signature = 'make:port {name}';
    protected $description = 'Create a new Port interface (Application\\Ports)';
    protected $type = 'Port';

    protected function getStub(): string
    {
        return base_path('stubs/port.stub');
    }

    protected function getDefaultNamespace($rootNamespace)
    {
        return $rootNamespace.'\\Application\\Ports';
    }
}
