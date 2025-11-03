<?php
// Backend/app/Swagger/Schemas/SwaggerInfo.php (manter apenas esta classe)

namespace App\Swagger\Schemas;

use OpenApi\Attributes as OA;

#[OA\Info(
    title: "Define Pilates API",
    version: "1.0.0",
    description: "API documentation for Define Pilates management system"
)]
#[OA\Server(
    url: "http://localhost:8000",
    description: "Development Server"
)]
#[OA\Tag(
    name: "Students",
    description: "Student management operations"
)]
#[OA\Tag(
    name: "Instructors",
    description: "Instructor management operations"
)]
#[OA\Tag(
    name: "AdminReceptionist",
    description: "Admin and Receptionist management operations"
)]
class SwaggerInfo {}
