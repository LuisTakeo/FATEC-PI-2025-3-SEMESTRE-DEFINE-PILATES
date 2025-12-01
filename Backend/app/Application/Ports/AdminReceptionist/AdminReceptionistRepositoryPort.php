<?php

namespace App\Application\Ports\AdminReceptionist;

use App\Application\DTOs\AdminReceptionistDTO;

interface AdminReceptionistRepositoryPort{
    public function create(AdminReceptionistDTO $adminReceptionist);
    public function getEmployeeByLoginName(string $nameuser): array;
    public function getAllAdminReceptionists(): array;

}