<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;


// Route::get("/users", [UserController::class, "index"]);

Route::middleware("auth")->group(function () {
    Route::get("/users", [UserController::class, "index"]);
    Route::post("/user/newuser", [UserController::class, "store"]);
    Route::inertia('/', 'Home', ['name' => 'Wanderson']);
});

Route::controller(AuthController::class)->group(function () {
    Route::get("/login", "Login")->name("login");
    Route::post("/auth", "authenticate");
    Route::get("/logout", "logout");
});

