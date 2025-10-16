<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
   
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id('Id_payments');
            $table->unsignedBigInteger('Id_plans')->index();
            $table->enum('paymentmethod', ['Card','Ticket','Money','Pix'])->nullable();
            $table->date('paymentinitiation')->nullable();
            $table->date('deadline')->nullable();
            $table->enum('paymentstatus', ['Pending','Paid','Late'])->default('Pending');
            $table->timestamps();

            $table->foreign('Id_plans')->references('Id_plans')->on('plans')->onDelete('cascade');
        });
    }

  
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};