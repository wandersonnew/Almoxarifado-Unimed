<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;


// Route::get("/users", [UserController::class, "index"]);

Route::middleware("auth")->group(function () {
    Route::get("/users", [UserController::class, "index"])->name('users.index');
    Route::post("/user/newuser", [UserController::class, "store"])->name('users.add');
    Route::inertia('/', 'Home', ['name' => 'Wanderson']);
    Route::get('/users/delete/{id}', [UserController::class, 'delete']);
    // Route::post('/users/update', [UserController::class, 'update']);
    Route::post('/users/{user}', [UserController::class, 'update'])->name('users.update');
    Route::get('/users/getusers', [UserController::class, 'getUsers']);
});

Route::controller(AuthController::class)->group(function () {
    Route::get("/login", "Login")->name("login");
    Route::post("/auth", "authenticate");
    Route::get("/logout", "logout");
});

