<?php

namespace App\Console\Commands;

use Illuminate\Console\GeneratorCommand;

class MakeDtoCommand extends GeneratorCommand
{
    protected $signature = 'make:dto {name}';
    protected $description = 'Create a new Data Transfer Object (Application\\DTOs)';
    protected $type = 'DTO';

    protected function getStub(): string
    {
        return base_path('stubs/dto.stub');
    }

    protected function getDefaultNamespace($rootNamespace)
    {
        return $rootNamespace.'\\Application\\DTOs';
    }
}
