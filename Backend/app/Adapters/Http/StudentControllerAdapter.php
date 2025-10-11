<?php

namespace App\Adapters\Http;

use App\Application\Ports\StudentServiceContract;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use App\Adapters\Http\StudentRegisterRequest;
use Illuminate\Support\Facades\Log;


class StudentControllerAdapter extends BaseController
{
    private StudentServiceContract $studentService;
    public function __construct(StudentServiceContract $studentService)
    {
        // Inject dependencies here
        $this->studentService = $studentService;
    }

    public function index(Request $request)
    {
        return "It works INDEX EEEEEEEEE";
    }

    public function postRequest(StudentRegisterRequest $request)
    {
        // Log::info('StudentController postWithValidation foi alcançado!', [
        //     'raw_data' => $request->all(),
        //     'input' => $request->input(),
        //     'json' => $request->json()->all()
        // ]);
        return response()->json($this->studentService->registerStudent($request->toDTO()));
    }
}
