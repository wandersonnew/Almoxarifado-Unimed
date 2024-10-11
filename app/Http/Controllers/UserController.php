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
            return to_route('users.index')->with([
                'status' => 'success',
                'message' => 'Usuário criado com sucesso!',
            ]);
        }
        
        return to_route('users.index')->with([
            'status' => 'error',
            'message' => 'Erro ao cadastrar usuário.',
        ]);
        

    }

    public function delete(int $id)
    {
        $user = User::find($id);

        if (!$user) return response()->json(['message' => 'Usuário não encontrado'], 404);

        $user->delete();

        return response()->json(['message' => 'Usuário deletado com sucesso'], 200);
    }

    public function update(Request $request, int $id)
    {
        // $validated = $request->validated();
        $updateData = [];
        
        if($request->name) $updateData['name'] = $request->name;
        if($request->email) $updateData['email'] = $request->email;
        if($request->password) $updateData['password'] = Hash::make($request->password, ['round'=> 12]);

        $user = User::where("id", $id)
            ->update($updateData);

        if (!$user) return redirect()->back()->with(['message' => 'Erro ao atualizar!'], 404);
        // return response()->json(['message' => 'Erro ao atualizar!'], 404);
    
        // return response()->json(['message' => 'Dados atualizado com sucesso!'], 200);
        return redirect()->back()->with(['message' => 'Dados atualizado com sucesso!'], 200);
    }
}