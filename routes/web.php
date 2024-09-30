<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

Route::inertia("/login", "Login")->name("login");

Route::inertia("/user/create", "Usercreate");

Route::post('/auth', [AuthController::class, 'authenticate']);

Route::inertia('/', 'Home', ['name' => 'Wanderson'])->middleware('auth');

Route::post('/user/newuser', [AuthController::class, 'store']);

Route::inertia("/users","User");


// Route::get('/newuser', function () {
//     return view('user');
// });

