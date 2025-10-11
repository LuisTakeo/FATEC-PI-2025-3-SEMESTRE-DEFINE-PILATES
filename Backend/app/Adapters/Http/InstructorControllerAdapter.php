<?php

namespace App\Adapters\Http;
use Illuminate\Routing\Controller as BaseController;
use App\Application\Ports\InstructorServiceContract;

class InstructorControllerAdapter extends BaseController {

    private InstructorServiceContract $instructorService;

    public function __construct(InstructorServiceContract $instructorService) {
        $this->instructorService = $instructorService;
    }
    
    public function index() {
        return "index";
    }

    public function postInstructor() {
        return "post";
    }

}