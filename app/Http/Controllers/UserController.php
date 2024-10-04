<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\UserStoreRequest;
use Inertia\Inertia;

use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        $users = User::select('id', 'name', 'email')->get();
        
        return Inertia::render('User', ['users'=> $users]);
    }

    public function store(UserStoreRequest  $request)
    {
        $validated = $request->validated(); 

        $check = User::create([
            'name'=> $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password, ['rounds' => 12]),
        ]);
        
        if ($check) {
            return response()->json([
                'status' => 'success',
                'message' => 'Usuário criado com sucesso!',
            ], 201);
        }
    
        return response()->json([
            'status' => 'error',
            'message' => 'Erro ao cadastrar usuário.',
        ], 400);

    }
}
