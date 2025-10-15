<?php

namespace App\Console\Commands;

use Illuminate\Console\GeneratorCommand;
use Illuminate\Support\Str;

class MakeServiceCommand extends GeneratorCommand
{
    protected $signature = 'make:service {name} {--port : Generate default Port (ServiceNamePort)} {--contract= : Custom Port interface class name (implies generation)}';
    protected $description = 'Create a new Application Service (optionally generating a Port; --contract overrides default and implies generation)';
    protected $type = 'Service';

    protected function getStub(): string
    {
        return base_path('stubs/service.stub');
    }

    protected function getDefaultNamespace($rootNamespace)
    {
        return $rootNamespace.'\\Application\\Services';
    }

    public function handle(): int
    {
        // parent::handle() (GeneratorCommand) does not return an int (null in most cases)
        // so we normalize to SUCCESS when null to satisfy our declared return type.
        $result = parent::handle();

        if ($result === null) {
            $result = static::SUCCESS; // treat null (normal successful generation) as success
        }

        if ($result === static::SUCCESS && ($this->option('port') || $this->option('contract'))) {
            $this->createPortForService();
        }

        return (int) $result;
    }

    /**
     * Build the class with the proper port replacements (or strip them if not requested).
     */
    protected function buildClass($name)
    {
        $class = parent::buildClass($name);

        $portRequested = $this->option('port') || $this->option('contract');

        // Determine target port class name
        if ($this->option('contract')) {
            $raw = trim($this->option('contract'));
            $raw = preg_replace('/\.php$/', '', $raw);
            $raw = str_replace(['/', '\\'], '', $raw); // keep only class token
            $portClass = $raw;
        } else {
            $classBaseName = class_basename($name);
            $base = Str::replaceLast('Service', '', $classBaseName) ?: $classBaseName;
            $portClass = $base.'Port';
        }

        $portNamespace = $this->rootNamespace().'Application\Ports';

        if ($portRequested) {
            $class = str_replace(['{{ portNamespace }}', '{{ portClass }}'], [$portNamespace, $portClass], $class);
        } else {
            $class = preg_replace('/^use \{\{ portNamespace \}\}\\\{\{ portClass \}\};\r?\n/m', '', $class);
            $class = str_replace(' implements {{ portClass }}', '', $class);
            $class = str_replace(['{{ portNamespace }}', '{{ portClass }}'], '', $class);
            $class = preg_replace("/\n{3,}/", "\n\n", $class);
        }

        return $class;
    }

    protected function createPortForService(): void
    {
        if ($this->option('contract')) {
            $raw = trim($this->option('contract'));
            $raw = preg_replace('/\.php$/', '', $raw);
            $raw = str_replace(['/', '\\'], '', $raw);
            $portClass = $raw;
        } else {
            $name = $this->argument('name');
            $classBase = Str::replaceLast('Service', '', class_basename($name)) ?: class_basename($name);
            $portClass = $classBase.'Port';
        }

        $namespace = $this->rootNamespace().'Application\\Ports';

        $path = $this->getPath($namespace.'\\'.$portClass);
        if ($this->files->exists($path)) {
            $this->warn("Port already exists: {$portClass}");
            return;
        }

        $stub = $this->files->get(base_path('stubs/port-service.stub'));
        $stub = str_replace(['{{ namespace }}','{{ class }}'], [$namespace, $portClass], $stub);
        $this->makeDirectory($path);
        $this->files->put($path, $stub);
        $this->info("Port created: {$portClass}");
    }
}
