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
    url: "https://sibilation-edythe-unprivately.ngrok-free.dev",
    description: "Ngrok Server (HTTPS) - Use when accessing via Ngrok"
)]
#[OA\Server(
    url: "https://define-pilates-server-dev.onrender.com/",
    description: "Render Server - Use when accessing via Render"
)]
#[OA\Server(
    url: "http://localhost:8000",
    description: "Local Server (HTTP) - Use when accessing locally"
)]
#[OA\SecurityScheme(
    securityScheme: "bearerAuth",
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT",
    description: "Enter JWT token obtained from login endpoint"
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
#[OA\Tag(
    name: "Authentication",
    description: "JWT Authentication endpoints"
)]
class SwaggerInfo {}
