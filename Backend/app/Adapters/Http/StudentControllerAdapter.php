<?php

namespace App\Adapters\Http;

use App\Application\Ports\StudentServiceContract;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;


class StudentControllerAdapter extends BaseController
{
    private StudentServiceContract $studentService;
    public function __construct(StudentServiceContract $studentService)
    {
        // Inject dependencies here
        $this->studentService = $studentService;
    }

    public function store(Request $request)
    {
        var_dump($request->all());
        return "It Works";
    }
}
