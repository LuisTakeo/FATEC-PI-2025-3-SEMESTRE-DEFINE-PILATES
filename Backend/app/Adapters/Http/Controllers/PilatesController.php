<?php

namespace App\Adapters\Http\Controllers;

use App\Application\Ports\ApplicationPort;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller as BaseController;

/**
 * Controller Adapter - Interface HTTP para o caso de uso
 * Esta é a camada de entrada da arquitetura hexagonal (Driving Adapter)
 */
class PilatesController extends BaseController
{
    private ApplicationPort $applicationService;

    public function __construct(ApplicationPort $applicationService)
    {
        $this->applicationService = $applicationService;
    }

    // ========== USER ENDPOINTS ==========

    /**
     * @OA\Post(
     *     path="/api/users",
     *     summary="Create new user",
     *     @OA\RequestBody(
     *         @OA\JsonContent(
     *             required={"name","email","password"},
     *             @OA\Property(property="name", type="string"),
     *             @OA\Property(property="email", type="string"),
     *             @OA\Property(property="password", type="string")
     *         )
     *     ),
     *     @OA\Response(response="201", description="User created successfully")
     * )
     */
    public function createUser(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users',
                'password' => 'required|string|min:8',
            ]);

            $userData = $request->only(['name', 'email', 'password']);
            $userData['password'] = bcrypt($userData['password']);

            $user = $this->applicationService->createUser($userData);

            return response()->json([
                'success' => true,
                'message' => 'User created successfully',
                'data' => $user
            ], 201);

        } catch (\InvalidArgumentException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 400);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while creating user'
            ], 500);
        }
    }

    /**
     * @OA\Get(
     *     path="/api/users/{id}",
     *     summary="Get user by ID",
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response="200", description="User found")
     * )
     */
    public function getUserById(int $id): JsonResponse
    {
        try {
            $user = $this->applicationService->getUserById($id);

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not found'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $user
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while fetching user'
            ], 500);
        }
    }

    /**
     * @OA\Get(
     *     path="/api/users",
     *     summary="Get all users",
     *     @OA\Response(response="200", description="Users list")
     * )
     */
    public function getAllUsers(): JsonResponse
    {
        try {
            $users = $this->applicationService->getAllUsers();

            return response()->json([
                'success' => true,
                'data' => $users
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while fetching users'
            ], 500);
        }
    }

    /**
     * @OA\Put(
     *     path="/api/users/{id}",
     *     summary="Update user",
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response="200", description="User updated")
     * )
     */
    public function updateUser(Request $request, int $id): JsonResponse
    {
        try {
            $request->validate([
                'name' => 'sometimes|string|max:255',
                'email' => "sometimes|email|unique:users,email,{$id}",
                'password' => 'sometimes|string|min:8',
            ]);

            $userData = $request->only(['name', 'email', 'password']);

            if (isset($userData['password'])) {
                $userData['password'] = bcrypt($userData['password']);
            }

            $user = $this->applicationService->updateUser($id, $userData);

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not found'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'User updated successfully',
                'data' => $user
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while updating user'
            ], 500);
        }
    }

    /**
     * @OA\Delete(
     *     path="/api/users/{id}",
     *     summary="Delete user",
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response="200", description="User deleted")
     * )
     */
    public function deleteUser(int $id): JsonResponse
    {
        try {
            $deleted = $this->applicationService->deleteUser($id);

            if (!$deleted) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not found'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'User deleted successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while deleting user'
            ], 500);
        }
    }

    // ========== PILATES CLASS ENDPOINTS ==========

    /**
     * @OA\Post(
     *     path="/api/classes",
     *     summary="Create new Pilates class",
     *     @OA\Response(response="201", description="Class created successfully")
     * )
     */
    public function createPilatesClass(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'instructor_id' => 'required|integer|exists:users,id',
                'max_participants' => 'required|integer|min:1',
                'start_time' => 'required|date',
                'end_time' => 'required|date|after:start_time',
                'price' => 'required|numeric|min:0',
            ]);

            $classData = $request->only([
                'name', 'description', 'instructor_id', 'max_participants',
                'start_time', 'end_time', 'price'
            ]);

            $classData['status'] = 'scheduled';

            $class = $this->applicationService->createPilatesClass($classData);

            return response()->json([
                'success' => true,
                'message' => 'Pilates class created successfully',
                'data' => $class
            ], 201);

        } catch (\InvalidArgumentException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 400);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while creating class'
            ], 500);
        }
    }

    /**
     * @OA\Get(
     *     path="/api/classes/{id}",
     *     summary="Get Pilates class by ID",
     *     @OA\Response(response="200", description="Class found")
     * )
     */
    public function getPilatesClassById(int $id): JsonResponse
    {
        try {
            $class = $this->applicationService->getPilatesClassById($id);

            if (!$class) {
                return response()->json([
                    'success' => false,
                    'message' => 'Class not found'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $class
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while fetching class'
            ], 500);
        }
    }

    /**
     * @OA\Get(
     *     path="/api/classes",
     *     summary="Get all Pilates classes",
     *     @OA\Response(response="200", description="Classes list")
     * )
     */
    public function getAllPilatesClasses(): JsonResponse
    {
        try {
            $classes = $this->applicationService->getAllPilatesClasses();

            return response()->json([
                'success' => true,
                'data' => $classes
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while fetching classes'
            ], 500);
        }
    }

    /**
     * @OA\Get(
     *     path="/api/classes/available",
     *     summary="Get available Pilates classes",
     *     @OA\Response(response="200", description="Available classes list")
     * )
     */
    public function getAvailableClasses(): JsonResponse
    {
        try {
            $classes = $this->applicationService->getAvailableClasses();

            return response()->json([
                'success' => true,
                'data' => $classes
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while fetching available classes'
            ], 500);
        }
    }

    // ========== BOOKING ENDPOINTS ==========

    /**
     * @OA\Post(
     *     path="/api/bookings",
     *     summary="Book user to class",
     *     @OA\Response(response="201", description="Booking created successfully")
     * )
     */
    public function bookUserToClass(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'user_id' => 'required|integer|exists:users,id',
                'class_id' => 'required|integer|exists:pilates_classes,id',
            ]);

            $success = $this->applicationService->bookUserToClass(
                $request->input('user_id'),
                $request->input('class_id')
            );

            if ($success) {
                return response()->json([
                    'success' => true,
                    'message' => 'User booked to class successfully'
                ], 201);
            }

            return response()->json([
                'success' => false,
                'message' => 'Failed to book user to class'
            ], 400);

        } catch (\InvalidArgumentException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 400);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while booking class'
            ], 500);
        }
    }

    /**
     * @OA\Get(
     *     path="/api/users/{userId}/classes",
     *     summary="Get classes by user",
     *     @OA\Response(response="200", description="User classes list")
     * )
     */
    public function getClassesByUser(int $userId): JsonResponse
    {
        try {
            $classes = $this->applicationService->getClassesByUser($userId);

            return response()->json([
                'success' => true,
                'data' => $classes
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while fetching user classes'
            ], 500);
        }
    }

    /**
     * Simple hello endpoint for smoke testing and development.
     *
     * @OA\\Get(
     *     path="/api/hello",
     *     summary="Hello world endpoint",
     *     @OA\\Response(response="200", description="Hello world")
     * )
     */
    public function hello(): JsonResponse
    {
        return response()->json([
            'message' => 'Hello World from PilatesController'
        ], 200);
    }
}
