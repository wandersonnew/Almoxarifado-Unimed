<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\UserStoreRequest;

use App\Models\User;

class AuthController extends Controller
{
    public function authenticate(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);
 
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
 
            return redirect('/')->with('message', 'Logado com sucesso!');
        }
 
        return back()->withErrors([
            'message' => 'The provided credentials do not match our records.',
        ])->onlyInput('email');
    }

    public function logout(Request $request): RedirectResponse
    {
        Auth::logout();
    
        $request->session()->invalidate();
    
        $request->session()->regenerateToken();
    
        return redirect('/');
    }

    public function store(UserStoreRequest  $request)
    {
        $validated = $request->validated(); 

        $check = User::create([
            'name'=> $request->name,
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password, ['rounds' => 12]),
        ]);

        if ($check) return back()->with("message", "Usuário criado com sucesso!");
        // redirect()->intended('/home');
    
        return back()->withErrors([
            'message' => 'Erro ao cadastrar usuário.',
        ]);
    

    }
}
