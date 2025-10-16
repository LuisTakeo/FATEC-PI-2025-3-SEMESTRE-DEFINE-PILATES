<?php

namespace App\Console\Commands;

use Illuminate\Console\GeneratorCommand;
use Illuminate\Support\Str;

class MakeUseCaseCommand extends GeneratorCommand
{
    protected $signature = 'make:usecase {name}';
    protected $description = 'Create a new Use Case class (Application\\UseCases)';
    protected $type = 'UseCase';

    protected function getStub(): string
    {
        return base_path('stubs/usecase.stub');
    }

    protected function getDefaultNamespace($rootNamespace)
    {
        return $rootNamespace.'\\Application\\UseCases';
    }

    protected function buildClass($name)
    {
        $class = parent::buildClass($name);
        $short = class_basename($name);
        return str_replace('{{ variable }}', Str::camel($short), $class);
    }
}
