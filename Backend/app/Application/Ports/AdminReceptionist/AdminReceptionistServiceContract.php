<?php

namespace App\Application\Ports\AdminReceptionist;

use App\Application\DTOs\AdminReceptionistDTO;

interface AdminReceptionistServiceContract{
    public function registerAdminReceptionist(AdminReceptionistDTO $adminReceptionistDTO): array;
}