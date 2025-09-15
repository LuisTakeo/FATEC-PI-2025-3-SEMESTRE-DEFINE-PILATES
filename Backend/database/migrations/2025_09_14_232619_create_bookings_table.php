<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('class_id')->constrained('pilates_classes')->onDelete('cascade');
            $table->enum('status', ['pending', 'confirmed', 'cancelled', 'completed'])->default('confirmed');
            $table->decimal('paid_amount', 8, 2)->nullable();
            $table->datetime('booking_date')->useCurrent();
            $table->text('notes')->nullable();
            $table->timestamps();

            // Prevent duplicate bookings
            $table->unique(['user_id', 'class_id']);

            // Indexes for better performance
            $table->index(['user_id', 'status']);
            $table->index(['class_id', 'status']);
            $table->index('booking_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
