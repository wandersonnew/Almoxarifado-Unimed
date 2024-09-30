<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Relations\HasOne;

class Entry extends Model
{
    use HasFactory;
    protected $table = "entries";
    protected $fillable = [
        "id",
        "observation",
        "entry_date",
        "user_id",
        "product_id",
        "quantity_entry",
    ] ;

    public function product(): HasOne
    {
        return $this->hasOne(Product::class);
    }

    public function user(): HasOne
    {
        return $this->hasOne(User::class);
    }
}


