<?php

namespace App\Application\Ports\AdminReceptionist;

use App\Application\DTOs\AdminReceptionistDTO;

interface AdminReceptionistRepositoryPort{
    public function create(AdminReceptionistDTO $adminReceptionist);

}